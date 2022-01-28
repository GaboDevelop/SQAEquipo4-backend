const db = require('../config/database');


module.exports = class Offer {

    async create(data) {
        console.log(data)
        const state = true
        return await db.query(
            `INSERT INTO offer (
                name,
                discount,
                state
            ) VALUES ($1,$2,$3) RETURNING *`,
            [data.name, data.discount, state]
        );
    }

    async listAll() {
        return await db.query(
            'SELECT * FROM offer WHERE state = true ORDER BY id ASC',
        );
    }

    async delete(id, data) {
        const state = false
        return await db.query(
            `UPDATE offer SET
            state = $1
            WHERE id = $2
            RETURNING *`,
            [state, id]
        );
    }

}

