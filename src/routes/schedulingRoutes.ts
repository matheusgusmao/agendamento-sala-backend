import express from 'express';
import SchedulingController from '../controllers/SchedulingController';


const schedulingRoutes = express.Router();

const schedulingController = new SchedulingController();

schedulingRoutes.get('/scheduling', schedulingController.findAll);
schedulingRoutes.post('/scheduling/status/', schedulingController.findRoomAndDate);
schedulingRoutes.get('/scheduling/:id', schedulingController.find);
schedulingRoutes.post('/scheduling/', schedulingController.create);
// schedulingRoutes.put('/scheduling/:id', schedulingController.update);
// schedulingRoutes.delete('/scheduling/:id', schedulingController.delete);

export default schedulingRoutes;