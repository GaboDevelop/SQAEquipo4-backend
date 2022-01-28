const db = require('../config/database');
const Offer = require('../Models/Offer');

exports.listAllOffers = async (req, res) => {
  try{
    const offerDB = new Offer();
    const response = await offerDB.listAll();
    res.status(200).send({
      success: true,
      message: 'List all offers successfully!',
      data: response.rows,
    });
  } catch (error) {
    res.status(500).send({
      success:false,
      message: 'Error list all offers',
      error,
    });
  }
};

exports.createOffer = async (req, res) => {
    try{
        const offerDB = new Offer();
        let { name, discount } = req.body;
        discount = parseInt(discount);
        console.log({
            name,
            discount,
        })
        const response = await offerDB.create({ name, discount });
        res.status(200).send({
            success: true,
            message: 'Offer created successfully!',
            data: response.rows,
        });
    } catch (error) {
        res.status(500).send({
        success:false,
        message: 'Error create offer',
        error,
        });
    }
}


exports.deleteOffer = async (req, res) => {
    try{
        const offerDB = new Offer();
        const { id } = req.params;
        const response = await offerDB.delete(id);
        res.status(200).send({
            success: true,
            message: 'Offer deleted successfully!',
            data: response.rows,
        });
    } catch (error) {
        res.status(500).send({
        success:false,
        message: 'Error delete offer',
        error,
        });
    }
}
