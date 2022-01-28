const db = require('../config/database');
const Ingredient = require('../Models/Ingredient');

exports.listAllIngredients = async (req, res) => {
  try{
    const ingredientDB = new Ingredient();
    const response = await ingredientDB.listAll();
    res.status(200).send({
      success: true,
      message: 'List all ingredients successfully!',
      data: response.rows,
    });
  } catch (error) {
    res.status(500).send({
      success:false,
      message: 'Error list all ingredients',
      error,
    });
  }
};

exports.getIngredientsMostSold = async (req, res) => {
  try{
    const ingredientDB = new Ingredient();
    const response = await ingredientDB.getIngredientsMostSold();
    res.status(200).send({
      success: true,
      message: 'List all ingredients successfully!',
      data: response.rows,
    });
  } catch (error) {
    res.status(500).send({
      success:false,
      message: 'Error list all ingredients',
      error,
    });
  }
}