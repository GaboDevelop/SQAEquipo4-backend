const db = require('../config/database');

exports.listAllIngredients = async (req, res) => {
  const response = await db.query(
    'SELECT * FROM ingredient ORDER BY id ASC',
  );
  res.status(200).send(response.rows);
};
