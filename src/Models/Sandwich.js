const db = require('../config/database');


module.exports = class Sandwich {

    async listAll() {

        return await db.query(
            'SELECT * FROM sandwich ORDER BY id ASC',
          );
    }

    async getSandwichsMostSold() {
        return await db.query(
                ` SELECT
                sandwich.name,
                sandwich.price as price,
                count(*) as quantity,
                count(*)*sandwich.price as total
            FROM sandwich
            JOIN order_sandwich_ingredient osi on sandwich.id = osi.sandwich_id

            group by sandwich.name,sandwich.price`,
        );
    }

}