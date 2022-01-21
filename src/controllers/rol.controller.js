const db = require('../config/database');

exports.listAllRols = async (req, res) => {
  const response = await db.query(
    'SELECT * FROM rol ORDER BY id ASC',
  );
  res.status(200).send(response.rows);
};
