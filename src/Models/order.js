const db = require('../config/database');

module.exports = class Order {
    
    async create(body) {
        const { data, date, user_id, comment,estimate_time, offer} = body;
        const order = (await db.query(
            `INSERT INTO order_sandwich (estimate_time, date, user_id, comment) VALUES ($1, $2, $3, $4) RETURNING *`,
            [estimate_time, date, user_id, comment]
        )).rows[0];
        if(order.id){
            const order_sandwich_id = order.id;
            let total = 0;
            for(let i = 0; i < data.length; i++){
                const sandwich = data[i]
                const price_sandwich = sandwich.price;
                const sandwich_id = sandwich.id;
                const ingredients = sandwich.ingredients;
                const number = sandwich.number;
                total += price_sandwich;
                for(let j = 0; j < ingredients.length; j++){
                    const ingredient = ingredients[j];
                    const price_ingredient = ingredient.price;
                    const ingredient_id = ingredient.id;
                    total += price_ingredient; 
                    await db.query(
                        `
                            INSERT INTO order_sandwich_ingredient (
                                order_id, 
                                sandwich_id, 
                                ingredient_id,
                                price_ingredient,
                                price_sandwich,
                                price_total,
                                number_sandwich_order
                            ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                        [
                            order_sandwich_id, 
                            sandwich_id, 
                            ingredient_id, 
                            price_ingredient, 
                            price_sandwich,
                            price_ingredient+price_sandwich,
                            number
                        ]
                    )
                }
            }
            let total_price = total

            if(offer){
                const offer_id = offer.id;
                const discount = offer.discount;
                total_price = total_price - (total_price*(discount/100));
                await db.query(
                    `UPDATE order_sandwich 
                        SET 
                        price = $1,
                        total_price = $2,
                        offer_id = $3
                        WHERE id = $4`,
                    [
                        total,
                        total_price,
                        offer_id, 
                        order_sandwich_id
                    ]
                )
            }else{
                const order_update = await db.query(
                    `UPDATE order_sandwich 
                        SET 
                        price = $1,
                        total_price = $2
                        WHERE id = $3`,
                    [total, total_price, order_sandwich_id]
                )
            }
            
            return order
        }
        return false
    }

    async getAll(filter = {}) {
        const {id, init_date, end_date, rol} = filter;
        let query  = `
            SELECT 
                order_sandwich.id,
                order_sandwich.comment,
                order_sandwich.offer_id,
                order_sandwich.price,
                order_sandwich.total_price,
                order_sandwich.date,
                order_sandwich.user_id,
                order_sandwich.estimate_time,
                order_sandwich_ingredient.id AS order_sandwich_ingredient_id,
                order_sandwich_ingredient.number_sandwich_order,
                order_sandwich_ingredient.price_ingredient,
                order_sandwich_ingredient.price_sandwich,
                sandwich.id AS sandwich_id,
                sandwich.name AS sandwich_name,
                sandwich.price AS sandwich_price,
                ingredient.id AS sandwich_ingredient_id,
                ingredient.name AS ingredient_name,
                ingredient.price AS ingredient_price
            FROM order_sandwich
            JOIN user_sys ON 
            user_sys.id = order_sandwich.user_id
            JOIN order_sandwich_ingredient ON
            order_sandwich.id = order_sandwich_ingredient.order_id
            JOIN sandwich ON
            order_sandwich_ingredient.sandwich_id = sandwich.id
            JOIN ingredient ON
            order_sandwich_ingredient.ingredient_id = ingredient.id
            JOIN rol ON
            user_sys.rol_id = rol.id
            WHERE 
                order_sandwich.total_price > 0
            `
       

        if(id){
            query += ` AND order_sandwich.user_id = ${id}`
        }

        console.log({
            init_date,
            end_date
        })
        if(init_date && end_date){
            query += ` AND order_sandwich.date BETWEEN '${init_date}' AND '${end_date}'`
        }

        if(rol){
            query += ` AND rol.name = '${rol}'`
        }


        let orders = (await db.query(
                query
            )).rows;
        
        let offers = (await db.query(
            'SELECT * FROM offer WHERE state = true ORDER BY id ASC'
        )).rows;
        
        
        const orders_return = []
        for(let i = 0; i < orders.length; i++){
            const order = orders[i];
            const index = orders_return.findIndex(o => o.id === order.id);
            const offer = offers.find(o => o.id === order.offer_id);
            if(index === -1){
                orders_return.push({
                    id: order.id,
                    date: order.date,
                    user_id: order.user_id,
                    estimate_time: order.estimate_time,
                    total_price: order.total_price,
                    price: order.price,
                    offer,
                    comment: order.comment,
                    sandwichs: [
                        {
                            id: order.sandwich_id,
                            name: order.sandwich_name,
                            price: order.sandwich_price,
                            number_sandwich_order: order.number_sandwich_order,
                            ingredients: [
                                {
                                    id: order.sandwich_ingredient_id,
                                    name: order.ingredient_name,
                                    price: order.ingredient_price
                                }
                            ]
                        }
                    ]
                })
            } else {
                const index_number_sandwich_order = orders_return[index].sandwichs.findIndex(s => s.number_sandwich_order === order.number_sandwich_order);
                
                if(index_number_sandwich_order === -1){
                    orders_return[index].sandwichs.push({
                        id: order.sandwich_id,
                        name: order.sandwich_name,
                        price: order.sandwich_price,
                        number_sandwich_order: order.number_sandwich_order,
                        ingredients: [
                            {
                                id: order.sandwich_ingredient_id,
                                name: order.ingredient_name,
                                price: order.ingredient_price
                            }
                        ]
                    })
                }else{
                    orders_return[index].sandwichs[index_number_sandwich_order].ingredients.push({
                        id: order.sandwich_ingredient_id,
                        name: order.ingredient_name,
                        price: order.ingredient_price
                    })
                }
            }
        }
        return orders_return
    }

    async delete(id) {
        const order_sandwich_ingredient = await db.query(
            `DELETE FROM order_sandwich_ingredient WHERE order_id = $1`,
            [id]
        )

        const order = await db.query(
            `DELETE FROM order_sandwich WHERE id = $1`,
            [id]
        )
        
        
        return order
    }
    
    async getOrdersGroupByDate() {
        return (await db.query(
            `SELECT  CAST(date AS DATE) ,count(*)from order_sandwich
            group by CAST(date AS DATE);`,
        )).rows;
    }

}