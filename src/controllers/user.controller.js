const db = require('../config/database');
const User = require('../Models/user');

exports.createUser = async (req, res) => {
  try {
    const {
      name, email, password, rol_id,
    } = req.body;
    const state = true;
    const data = {
      name, 
      email, 
      password, 
      rol_id, 
      state
    }
    const userDB = new User();
    const validate = await userDB.findByEmail(data.email);
    if(validate.rows.length > 0){
      res.status(400).json({
        success: false,
        message: 'El correo ya esta registrado'
      })
    }else{
      const response = await userDB.create(data);
      res.status(201).send({
        success: true,
        message: 'User register successfully!',
        data: {
          name, email, rol_id, state,
        },
      });
    }
  } catch (error) {
    res.status(500).send({
      success:false,
      message: 'Error creating user',
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try{
    const { email, password } = req.body;
    const userDB = new User();
    const response = await userDB.login({ email, password });
    if(response.rows.length > 0){
      res.status(200).send({
        success: true,
        message: 'User login successfully!',
        data: {
            name: response.rows[0].name,
            email: response.rows[0].email,
            rol_id: response.rows[0].rol_id,
            state: response.rows[0].state
        },
      });
    }else{
      res.status(404).send({
        success: false,
        message: 'User not found!',
      });
    }
  } catch (error) {
    res.status(500).send({
      success:false,
      message: 'Error login user',
      error,
    });
  }
};

exports.listAllUsers = async (req, res) => {
  try{
    const userDB = new User();
    const response = await userDB.listAll();
    res.status(200).send({
      success: true,
      message: 'List all users successfully!',
      data: response.rows,
    });
  } catch (error) {
    res.status(500).send({
      success:false,
      message: 'Error list all users',
      error,
    });
  }

};

exports.findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userDB = new User();
    const response = await userDB.findById(id);
    if(response.rows.length > 0){
      res.status(200).send({
        success: true,
        message: 'User find successfully!',
        data: response.rows[0],
      });
    }else{
      res.status(404).send({
        success: false,
        message: 'User not found!',
      });
    }
  } catch (error) {
    res.status(500).send({
      success:false,
      message: 'Error find user',
      error,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userDB = new User();
    const response = await userDB.findById(id);
    if(response.rows.length > 0){
      const response = await userDB.deleteById(id);
      res.status(200).send({
        success: true,
        message: 'User delete successfully!',
      });
    }else{
      res.status(404).send({
        success: false,
        message: 'User not found!',
      });
    }
  } catch (error) {
    res.status(500).send({
      success:false,
      message: 'Error delete user',
      error,
    });
  }
};