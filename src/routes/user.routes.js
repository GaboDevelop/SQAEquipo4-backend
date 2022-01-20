
const router = require('express-promise-router')();
const userController = require('../controllers/user.controller');

// ==> 'User':
// ==> (POST): localhost:3000/api/users
router.post('/users', userController.createUser);
// ==> (GET): localhost:3000/api/users
router.get('/users', userController.listAllUsers);
// ==> (GET): localhost:3000/api/users/:id
router.get('/users/:id', userController.findUserById);
// ==> (PUT): localhost: 3000/api/users/:id
router.put('/users/:id', userController.updateUserById);
// ==> (DELETE): localhost:3000/api/users/:id
router.delete('/users/:id', userController.deleteUserById);

module.exports = router;
