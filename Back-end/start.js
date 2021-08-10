require('dotenv').config();
const server = require('./index');
const PORT = process.env.PORT || 6000;

server(PORT);
