const db = require('../config/database');


module.exports = class Ingredient {

    async listAll() {

        return await db.query(
            'SELECT * FROM ingredient ORDER BY id ASC',
          );
    }

}