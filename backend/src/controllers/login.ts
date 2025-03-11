import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getUserByEmail } from '../services/userService';

export const login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ status: 'error', message: 'Usuário não encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ status: 'error', message: 'Senha incorreta' });
        }

        return res.status(200).json({ status: 'success', message: 'Usuário logado com sucesso' });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Erro no servidor' });
    }
};