import { Request, Response } from 'express';

export const getUsers = (req: Request, res: Response) => {

  res.send('Get users');
};

export const createUser = (req: Request, res: Response) => {
 
  res.send('Create user');
};