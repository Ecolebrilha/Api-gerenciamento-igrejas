import { User, IUser } from '../models/User';

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        console.error('Erro ao buscar usuário por email:', error);
        return null;
    }
};