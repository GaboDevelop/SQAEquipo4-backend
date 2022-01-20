const db = require('../config/database');


exports.createUser = async (req, res) => {
  const { name,email,password,rol_id } = req.body;
  const state = true;
  const response = await db.query(
    'INSERT INTO user_sys (name, email, password, state, rol_id) VALUES ($1, $2, $3, $4, $5)',
    [name, email, password, state, rol_id],
  );

  res.status(201).send({
    message: 'User register successfully!',
    body: {
      user: { name,email,password,rol_id,state },
    },
  });
};

exports.listAllUsers = async (req, res) => {
  const response = await db.query(
    'SELECT * FROM user_sys ORDER BY id ASC',
  );
  res.status(200).send(response.rows);
};


exports.findUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await db.query(
    'SELECT * FROM user_sys WHERE id = $1',
    [id],
  );
  res.status(200).send(response.rows);
};


exports.updateUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, password, email } = req.body;

  const response = await db.query(
    'UPDATE user_sys SET name = $1, password = $2, email = $3 WHERE id = $4',
    [name, password, email, id],
  );

  res.status(200).send({ message: 'User Updated Successfully!' });
};


exports.deleteUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  const state = false;
  await db.query(
    'UPDATE user_sys SET state = $1 WHERE id = $2',
    [ state, id
    ]);

  res.status(200).send({ message: 'User deleted successfully!', id });
};
