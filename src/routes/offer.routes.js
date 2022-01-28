
const router = require('express-promise-router')();
const offerController = require('../controllers/offer.controller');

// ==> 'User':
// ==> (POST): localhost:3000/api/offers
router.post('/offers', offerController.createOffer);
// ==> (GET): localhost:3000/api/offers
router.get('/offers', offerController.listAllOffers);
// ==> (DELETE): localhost:3000/api/offers/:id
router.delete('/offers/:id', offerController.deleteOffer);

module.exports = router;
