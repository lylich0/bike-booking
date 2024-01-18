const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes/routes')

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/bikes', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});