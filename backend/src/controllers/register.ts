import { Request, Response } from 'express';
import { User } from '../models/User';

export const register = async (req: Request, res: Response): Promise<Response> => {
    const { nomeCompleto, cpf, email, password, funcao } = req.body;

    try {
        const newUser = new User({ nomeCompleto, cpf, email, password, funcao });
        await newUser.save();
        return res.status(201).json({ status: 'success', message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Error registering user' });
    }
};