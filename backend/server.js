import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user.route.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});