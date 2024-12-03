import express from 'express';
import AuthMiddleware from '../middleware/AuthMiddleware';

const authRoutes = express.Router();

const authMiddleware = new AuthMiddleware();

authRoutes.post('/login', authMiddleware.authorize);

export default authRoutes;