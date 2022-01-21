const db = require('../config/database');

exports.listAllSandwich = async (req, res) => {
  const response = await db.query(
    'SELECT * FROM sandwich ORDER BY id ASC',
  );
  res.status(200).send(response.rows);
};
