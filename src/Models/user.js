const db = require('../config/database');

module.exports = class User {
    
    async create(data) {
        const { name, email, password, rol_id, state } = data;
        return await db.query(
            'INSERT INTO user_sys (name, email, password, state, rol_id) VALUES ($1, $2, $3, $4, $5)',
            [name, email, password, state, rol_id],
          )
    }

    async login(data) {
        const { email, password } = data;
        return await db.query(
            'SELECT * FROM user_sys WHERE email = $1 AND password = $2',
            [email, password],
          )
    }

    async accessSystem(registerTime, id) {
        return await db.query(
            'INSERT INTO access_system (date, user_id) VALUES ($1, $2)',
            [registerTime, id],
          )
    }

    async getAccessSystem(filter = {}) {
        const { init_date, end_date, rol} = filter;
        let query = `SELECT 
                        access_system.id,
                        access_system.date,
                        user_sys.name,
                        user_sys.email,
                        rol.name as rol_name,
                        rol.id as rol_id
                    FROM access_system
                    JOIN user_sys ON 
                        access_system.user_id = user_sys.id
                    JOIN rol ON
                        user_sys.rol_id = rol.id
                    `
        if(init_date && end_date) {
            query += `WHERE access_system.date BETWEEN '${init_date}' AND '${end_date}'`
        }
        if(rol){
            if(init_date && end_date) {
                query += ` AND rol.name = '${rol}'`
            } else {
                query += `WHERE rol.name = '${rol}'`
            }
        }
        return await db.query(
            query
          )

    }

    async findByEmail(email) {
        return await db.query(
            'SELECT * FROM user_sys WHERE email = $1',
            [email],
          )
    }

    async listAll(rol = false) {
        if(rol) {
            return await db.query(
                `SELECT 
                    user_sys.id,
                    user_sys.name,
                    user_sys.email,
                    user_sys.rol_id,
                    rol.name as rol_name
                FROM user_sys
                JOIN rol ON 
                    user_sys.rol_id = rol.id
                WHERE 
                    user_sys.state = true
                    AND rol.name = $1`
            ,[rol])
        }
        return await db.query(
            `SELECT 
                user_sys.id,
                user_sys.name,
                user_sys.email,
                user_sys.rol_id,
                rol.name as rol_name
            FROM user_sys
            JOIN rol ON 
                user_sys.rol_id = rol.id
            WHERE user_sys.state = 1`,
          )
    }

    async findById(id) {
        return await db.query(
            `SELECT 
                user_sys.id,
                user_sys.name,
                user_sys.email,
                user_sys.rol_id,
                rol.name as rol_name
            FROM user_sys
            JOIN rol ON 
                user_sys.rol_id = rol.id
            WHERE user_sys.id = $1`,
            [id],
          )
    }

    async deleteById(id) {
        const state = 0
        return await db.query(
            'UPDATE user_sys SET state = $1 WHERE id = $2',
            [state, id],
        );
    }

    async getAccessSystemGroupByUser(filter = {}) {
        return await db.query(
            `SELECT  us.name, us.email, count(*)from access_system
            join user_sys us on us.id = access_system.user_id
            group by us.name, us.email;`
        );
    }

    async getAmountTotalByUser() {
        const rows = (await db.query(`
        SELECT
                order_sandwich.total_price,
                us.email,
                us.name,
                us.id
        from order_sandwich
        join user_sys us on us.id = order_sandwich.user_id
        `)).rows;
        let rows_return = [];
        for(let i = 0; i < rows.length; i++) {
            let row = rows[i];
            const index = rows_return.findIndex(r => r.id === row.id);
            if(index === -1) {
                rows_return.push(row);
            } else {
                rows_return[index].total_price += row.total_price;
            }
        }

        return rows_return;
    }
    

}