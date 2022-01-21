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

    async findByEmail(email) {
        return await db.query(
            'SELECT * FROM user_sys WHERE email = $1',
            [email],
          )
    }

    async listAll() {
        return await db.query(
            'SELECT * FROM user_sys',
          )
    }

    async findById(id) {
        return await db.query(
            'SELECT * FROM user_sys WHERE id = $1',
            [id],
          )
    }

    async deleteById(id) {
        return await db.query(
            'DELETE FROM user_sys WHERE id = $1',
            [id],
          )
    }
    

}