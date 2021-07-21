require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 6000;

app.use(cors());//allows server to interact with the client side
app.use(express.json());//parses(analyzing) incoming requests with JSON
app.use(express.urlencoded({ extended: true }));

// app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})