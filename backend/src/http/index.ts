import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { register } from '../controllers/register';
import { login } from '../controllers/login';
import { asyncHandler } from '../utils/asyncHandler';

const app = express();

app.use(cors());

app.use(express.json());

app.post('/register', asyncHandler(register));
app.post('/login', asyncHandler(login));

const startServer = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/church-management', {
        });
        console.log('Connected to MongoDB');

        app.listen(3001, () => {
            console.log('Server is running on port 3001');
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

startServer();