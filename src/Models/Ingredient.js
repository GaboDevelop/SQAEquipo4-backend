const db = require('../config/database');


module.exports = class Ingredient {

    async listAll() {

        return await db.query(
            'SELECT * FROM ingredient ORDER BY id ASC',
          );
    }

    async getIngredientsMostSold() {
        return await db.query(
                ` SELECT
                ingredient.name,
                ingredient.price as price,
                count(*) as quantity,
                count(*)*ingredient.price as total
            FROM ingredient
            JOIN order_sandwich_ingredient osi on ingredient.id = osi.ingredient_id

            group by ingredient.name,ingredient.price`,
        );
    }

}

