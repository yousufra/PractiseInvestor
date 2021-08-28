require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/router');

const app = express();

const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})