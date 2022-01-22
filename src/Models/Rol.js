const db = require('../config/database');


module.exports = class Rol {

    async listAll() {

        return await db.query(
            'SELECT * FROM rol ORDER BY id ASC',
          );
    }

}