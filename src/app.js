const express = require('express');
const cors = require('cors');

const app = express();

const index = require('./routes/index');
const userRoute = require('./routes/user.routes');
const rolRoute = require('./routes/rol.routes');
const sandwichRoute = require('./routes/sandwich.routes');
const ingredientRoute = require('./routes/ingredient.routes');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());
app.options('*', cors());


app.use(index);
app.use('/api/', userRoute);
app.use('/api', rolRoute);
app.use('/api', sandwichRoute);
app.use('/api', ingredientRoute);

module.exports = app;
