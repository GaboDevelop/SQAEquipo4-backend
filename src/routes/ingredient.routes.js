
const router = require('express-promise-router')();
const ingredientController = require('../controllers/ingredient.controller');

// ==> 'Rol':
// ==> (GET): localhost:3000/api/ingredients
router.get('/ingredients', ingredientController.listAllIngredients);
// ==> (GET): localhost:3000/api/ingredients/mostSold
router.get('/ingredients/mostSold', ingredientController.getIngredientsMostSold);

module.exports = router;
