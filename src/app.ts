import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './models';
import authRoutes from './routes/authRoutes'
import chatImportRoutes from './routes/chatImportRoutes'

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatImportRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB;
    app.listen(PORT, ()=> {
        console.log(`Server running on port ${PORT}`);
        
    })
}

startServer();