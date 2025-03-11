import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    nomeCompleto: string;
    cpf: string;
    email: string;
    password: string;
    funcao: string;
}

const UserSchema: Schema = new Schema({
    nomeCompleto: { type: String, required: true },
    cpf: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    funcao: { type: String, required: true }
});

export const User = mongoose.model<IUser>('User', UserSchema);