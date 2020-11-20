const express = require('express');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());

// Use CORS policy
app.use(require('./utils/cors/'));

// Use session
// app.use(require('./utils/session/'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// All request from api/auth will use auth api
app.use('/api/auth/', require('./api/auth/'));

// All user requests
app.use('/api/user/', require('./api/user/'));

// All customer related requests
app.use('/api/customer/', require('./api/customer/'));

// All advisor request go throw this url
app.use('/api/advisor/', require('./api/advisor/'));

const PORT = process.env.PORT || 8080;

// Print server running message
app.get('/', (req, res) => {
  res.json({ message: `Server is running on ${PORT} !` });
});

// Listen on PORT
app.listen(PORT);
