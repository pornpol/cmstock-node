const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

const authRoute = require('./routes/auth');
const stockRoute = require('./routes/stock');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/stock', stockRoute);

const port = 8000;

app.listen(port, () => {
  console.log(`API Server running on port ${port}`);
});
