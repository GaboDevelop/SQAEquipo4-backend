
const router = require('express-promise-router')();
const userController = require('../controllers/user.controller');

// ==> 'User':
// ==> (POST): localhost:3000/api/users
router.post('/users', userController.createUser);
// ==> (POST): localhost:3000/api/users/login
router.post('/users/login', userController.loginUser);
// ==> (GET): localhost:3000/api/users
router.get('/users', userController.listAllUsers);
// ==> (GET): localhost:3000/api/history
router.get('/users/history', userController.getAccessSystem);
// ==> (GET): localhost:3000/api/users/group-orders
router.get('/users/group-orders', userController.getAccessSystemGroupByUser);
// ==> (GET): localhost:3000/api/users/amount
router.get('/users/amount', userController.getAmountTotalByUser);
// ==> (GET): localhost:3000/api/users/:id
router.get('/users/:id', userController.findUserById);
// ==> (DELETE): localhost:3000/api/users/:id
router.delete('/users/:id', userController.deleteUserById);




module.exports = router;
