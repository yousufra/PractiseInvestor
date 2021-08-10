/* eslint-disable no-console */
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const DB_URL = process.env.DB_URL || '';

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => console.log('Connected to DB!'),
  (err: Error) => console.log(`Could not connect to DB: ${err}`),
);
// to remove deprecated log for findoneandupdate
mongoose.set('useFindAndModify', false);

export default mongoose;
