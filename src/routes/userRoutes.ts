import express from 'express';
import UserController from '../controllers/UserController';


const userRoutes = express.Router();

const userController = new UserController();

userRoutes.get('/users', userController.findAll);
userRoutes.get('/users/:cpf', userController.find);
// userRoutes.post('/users/', userController.create);
// userRoutes.put('/users/:id', userController.update);
// userRoutes.delete('/users/:cpf', userController.delete);

export default userRoutes;