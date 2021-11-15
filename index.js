const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const PORT = process.env.PORT || 5500;

const app = express();

//Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.set('trust proxy', 1);

//Set static folder
app.use(express.static('public'));

//Enable cors
app.use(cors('*'));

//Routes
app.use('/api', require('./routes'));

app.listen(PORT, () => console.log(`Server is runnung on port ${PORT}`));
