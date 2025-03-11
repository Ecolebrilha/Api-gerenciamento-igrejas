import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const users: { [key: string]: { password: string } } = {};

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (users[username]) {
    return res.status(400).send('User already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users[username] = { password: hashedPassword };
  res.status(201).send('User registered');
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users[username];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }
  const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ token });
};