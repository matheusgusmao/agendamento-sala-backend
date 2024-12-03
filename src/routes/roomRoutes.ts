import express from 'express';
import RoomController from '../controllers/RoomController';


const roomRoutes = express.Router();

const roomController = new RoomController();

roomRoutes.get('/room', roomController.findAll);
roomRoutes.get('/room/:id', roomController.find);
// roomRoutes.post('/room/', roomController.create);
// roomRoutes.put('/room/:id', roomController.update);
// roomRoutes.delete('/room/:id', roomController.delete);

export default roomRoutes;