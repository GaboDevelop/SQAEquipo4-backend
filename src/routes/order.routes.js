
const router = require('express-promise-router')();
const orderController = require('../controllers/order.controller');

// ==> 'User':
// ==> (POST): localhost:3000/api/orders
router.post('/orders', orderController.createOrder);
// ==> (GET): localhost:3000/api/orders
router.get('/orders', orderController.listAllOrders);
// ==> (DELETE): localhost:3000/api/orders/:id
router.delete('/orders/:id', orderController.deleteOrder);
// ==> (GET): localhost:3000/api/orders/date
router.get('/orders/date', orderController.ordersGroupByDate);

module.exports = router;
