import express from 'express';

import { ErrorHandler } from './middleware/ErrorHandler';
import roomRoutes from './routes/roomRoutes';
import userRoutes from './routes/userRoutes';
import schedulingRoutes from './routes/schedulingRoutes';
import authRoutes from './routes/authRoutes';
import AuthMiddleware from './middleware/AuthMiddleware';

const PORT = 3000;

const app = express();

app.use(express.json());

const authMiddleware = new AuthMiddleware();

// app.use('/api', authRoutes);
// app.use('/api', authMiddleware.checkAuthorization);

app.use('/api', roomRoutes);
app.use('/api', userRoutes);
app.use('/api', schedulingRoutes);

app.use(ErrorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
