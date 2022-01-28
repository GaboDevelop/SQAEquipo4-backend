
const router = require('express-promise-router')();
const sandwichController = require('../controllers/sandwich.controller');

// ==> 'Rol':
// ==> (GET): localhost:3000/api/sandwichs
router.get('/sandwichs', sandwichController.listAllSandwich);
// ==> (GET): localhost:3000/api/sandwichs/mostSold
router.get('/sandwichs/mostSold', sandwichController.getSandwichsMostSold);

module.exports = router;
