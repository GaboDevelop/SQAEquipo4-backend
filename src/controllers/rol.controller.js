const db = require('../config/database');
const Rol = require('../Models/Rol');

exports.listAllRols = async (req, res) => {
  try{
    const rolDB = new Rol();
    const response = await rolDB.listAll();
    res.status(200).send({
      success: true,
      message: 'List all rols successfully!',
      data: response.rows,
    });
  } catch (error) {
    res.status(500).send({
      success:false,
      message: 'Error list all rols',
      error,
    });
  }
};
