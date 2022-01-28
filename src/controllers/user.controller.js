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
      const registerTime = new Date();
      const day = registerTime.getDate();
      const month = registerTime.getMonth() + 1;
      const year = registerTime.getFullYear();
      const hour = registerTime.getHours();
      const minutes = registerTime.getMinutes();
      const seconds = registerTime.getSeconds();
      const date = `${day}-${month}-${year} ${hour}:${minutes}:${seconds}`;
      await userDB.accessSystem(date, response.rows[0].id);
      res.status(200).send({
        success: true,
        message: 'User login successfully!',
        data: {
            ...response.rows[0]
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


exports.getAccessSystem = async (req, res) => {
  try{
    const userDB = new User();
    const { init_date, end_date,rol } = req.query
    const response = await userDB.getAccessSystem({ init_date, end_date, rol });
    res.status(200).send({
      success: true,
      message: 'Access system',
      data:response.rows,
    });
  } catch (error) {
    res.status(500).send({
      success:false,
      message: 'Error get access system',
      error,
    });
  }
}

exports.getAccessSystemGroupByUser = async (req, res) => {
  try{
    const userDB = new User();
    const response = await userDB.getAccessSystemGroupByUser();
    res.status(200).send({
      success: true,
      message: 'Access system',
      data:response.rows,
    });
  } catch (error) {
    res.status(500).send({
      success:false,
      message: 'Error get access system',
      error,
    });
  }
}

exports.listAllUsers = async (req, res) => {
  try{
    const userDB = new User();
    const rol = req.query.rol;
    console.log("rol",  rol)
    const response = await userDB.listAll(rol);
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

exports.getAmountTotalByUser = async (req, res) => {
  try{
    const userDB = new User();
    const response = await userDB.getAmountTotalByUser();
    res.status(200).send({
      success: true,
      message: 'Access system',
      data:response,
    });
  } catch (error) {
    res.status(500).send({
      success:false,
      message: 'Error get access system',
      error,
    });
  }
}