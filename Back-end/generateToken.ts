import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
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
