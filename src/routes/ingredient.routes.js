
const router = require('express-promise-router')();
const ingredientController = require('../controllers/ingredient.controller');

// ==> 'Rol':
// ==> (GET): localhost:3000/api/ingredients
router.get('/ingredients', ingredientController.listAllIngredients);

module.exports = router;
