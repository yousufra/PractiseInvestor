import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
const secret: any = process.env.JWT_SECRET;

export const generateToken = (userName: string) => jwt.sign(
  {
    userName,
  },
  secret,
  {
    expiresIn: '1h',
  },
);
