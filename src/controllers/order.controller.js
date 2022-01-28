const db = require('../config/database');
const Order = require('../Models/order');

exports.createOrder = async (req, res) => {
  try {
    const {
      data,
      date,
      user_id,
      comment,
      estimate_time,
      offer
    } = req.body;
    const state = true;
    const orderDB = new Order();
    const response = await orderDB.create({data,date,user_id, comment,estimate_time,offer});
    res.status(201).send({
        success: true,
        message: 'Order registered successfully!',
    });
    
  } catch (error) {
    res.status(500).send({
      success:false,
      message: 'Error creating order',
      error,
    });
  }
};

exports.listAllOrders = async (req, res) => {
  try{
    const orderDB = new Order();
    const { id, init_date, end_date, rol } = req.query
    const response = await orderDB.getAll({ id, init_date, end_date, rol });
    res.status(200).send({
      success: true,
      message: 'List of orders',
      data:response,
    });
  } catch (error) {
    res.status(500).send({
      success:false,
      message: 'Error list all orders',
      error,
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const orderDB = new Order();
    const response = await orderDB.delete(id);
    res.status(200).send({
      success: true,
      message: 'Order deleted successfully!',
    });
  } catch (error) {
    res.status(500).send({
      success:false,
      message: 'Error deleting order',
      error,
    });
  }
}

exports.ordersGroupByDate = async (req, res) => {
  try{
    const orderDB = new Order();
    const response = await orderDB.getOrdersGroupByDate();
    res.status(200).send({
      success: true,
      message: 'List of orders',
      data:response,
    });
  } catch (error) {
    res.status(500).send({
      success:false,
      message: 'Error list all orders',
      error,
    });
  }
}



