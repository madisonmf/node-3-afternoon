const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

// Middleware
const checkForSession = require('./middlewares/checkForSession');

// Controllers
const sc = require('./controllers/swag_controller');
const ac = require('./controllers/auth_controller');
const cc = require('./controllers/cart_controller');
const sec = require('./controllers/search_controller');

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(express.static(`${__dirname}/../build` ));

app.use(checkForSession);

// Swag_Controller
app.get('/api/swag', sc.read); 

// Auth_Controller
app.post('/api/login', ac.login);
app.post('/api/register', ac.register);
app.post('/api/signout', ac.signout);
app.get('/api/user', ac.getUser);

// Cart_Controller
app.post('/api/cart', cc.add);
app.post('/api/cart/checkout', cc.checkout);
app.delete('/api/cart', cc.delete);

// Search_Controller
app.get('/api/search', sec.search);

const port = 3000;
app.listen( port, () => {console.log(`Server listening on port ${port}`)});