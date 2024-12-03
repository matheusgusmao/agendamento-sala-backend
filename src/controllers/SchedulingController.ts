import { NextFunction, Request, Response } from "express";
import SchedulingService from "../services/SchedulingService";
import ResponseModel, { CodeResponseEnum } from "../models/ResponseModel";
import UserService from "../services/UserService";
import RoomService from "../services/RoomService";
import { SchedulingProps } from "../interfaces/SchedulingProps";

class SchedulingController {
    async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const schedulingService = new SchedulingService();
    
            const schedulings = await schedulingService.findAll();
    
            const response = new ResponseModel(false, CodeResponseEnum.OK, 'ok', schedulings);
            res.status(response.getCode()).json(response);
        } catch (error) {
            console.log('[ERROR] - findAll - SchedulingController - Falha ao consultar os Agendamentos', error);
            next(error);
        }
    }

    async findRoomAndDate(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { roomId, startDate, endDate } = req.body;

            const schedulingService = new SchedulingService();
            const scheduling = await schedulingService.findRoomAndDate(roomId, new Date(startDate), new Date(endDate));

            if (!scheduling) {
                throw new ResponseModel(true, CodeResponseEnum.NOT_FOUND, 'Status do Agendamento não encontrado', scheduling);
            }

            const response = new ResponseModel(false, CodeResponseEnum.OK, 'ok', scheduling);
            res.status(response.getCode()).json(response);
        } catch (error) {
            console.log('[ERROR] - findRoomAndDate - SchedulingController - Falha ao consultar o Status do Agendamento', error);
            next(error);
        }
    }

    async find(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            const schedulingService = new SchedulingService();
            const scheduling = await schedulingService.find(id);

            if (!scheduling) {
                throw new ResponseModel(true, CodeResponseEnum.NOT_FOUND, 'Agendamento não encontrada', id);
            }

            const response = new ResponseModel(false, CodeResponseEnum.OK, 'ok', scheduling);
            res.status(response.getCode()).json(response);
        } catch (error) {
            console.log('[ERROR] - find - SchedulingController - Falha ao consultar o Agendamento de Sala', error);
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
            const { title, startDate, endDate, recurrence,  roomId, userId } = req.body;

            let roomIds = [];

            const schedulingService = new SchedulingService();

            for (var i = 0; i < roomId.length; i++) {
                roomIds.push({ id: roomId[i] });

                const schedulingFindRoomAndDate = await schedulingService.findRoomAndDate(roomId[i], startDate, endDate);

                if (schedulingFindRoomAndDate.length != 0) {
                    throw new ResponseModel(true, CodeResponseEnum.BAD_REQUEST, 'Já existe um Agendamento desta Sala dentro do período informado.', schedulingFindRoomAndDate);
                }   
            }

            let userIds = [];
            
            for (var i = 0; i < userId.length; i++) {
                userIds.push({ id: userId[i] });
            }

            console.log(roomIds);     

            const newScheduling = await schedulingService.create(title, startDate, endDate, recurrence,  roomIds, userIds);

            if (!newScheduling) {
                throw new ResponseModel(true, CodeResponseEnum.INTERNAL_ERROR, 'Não foi possível criar o Agendamento de Sala. Tente novamente.');
            }                      

            const response = new ResponseModel(false, CodeResponseEnum.CREATED, `Agendamento de Sala criado`, newScheduling);
            res.status(response.getCode()).json(response);
        } catch (error) {
            console.log('[ERROR] - create - SchedulingController - Falha ao criar Agendamento de Sala', error);
            next(error);
        }
    }

}

export default SchedulingController;