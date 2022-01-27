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

    async findByEmail(email) {
        return await db.query(
            'SELECT * FROM user_sys WHERE email = $1',
            [email],
          )
    }

    async listAll(rol = false) {
        console.log("rol",  rol)
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
    

}