const db = require('../config/database');


module.exports = class Sandwich {

    async listAll() {

        return await db.query(
            'SELECT * FROM sandwich ORDER BY id ASC',
          );
    }

}