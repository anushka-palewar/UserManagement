import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import { initDB } from './config/dbInit.js';

dotenv.config();

// Initialize Database
initDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the MERN backend!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
