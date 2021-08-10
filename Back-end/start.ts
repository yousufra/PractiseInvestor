import dotenv from 'dotenv';
import { server } from './index';
dotenv.config();

const PORT = process.env.PORT || 6000;

server(PORT);


