
const router = require('express-promise-router')();
const rolController = require('../controllers/rol.controller');

// ==> 'Rol':
// ==> (GET): localhost:3000/api/rols
router.get('/rols', rolController.listAllRols);

module.exports = router;
