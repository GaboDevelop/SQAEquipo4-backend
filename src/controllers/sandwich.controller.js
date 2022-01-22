const db = require('../config/database');
const Sandwich = require('../Models/Sandwich');

exports.listAllSandwich = async (req, res) => {
  try{
    const sandwichDB = new Sandwich();
    const response = await sandwichDB.listAll();
    res.status(200).send({
      success: true,
      message: 'List all sandwich successfully!',
      data: response.rows,
    });
  } catch (error) {
    res.status(500).send({
      success:false,
      message: 'Error list all sandwich',
      error,
    });
  }
};
