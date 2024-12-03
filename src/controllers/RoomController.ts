import { NextFunction, Request, Response } from "express";
import RoomService from "../services/RoomService";
import ResponseModel, { CodeResponseEnum } from "../models/ResponseModel";
import { RoomProps } from "../interfaces/RoomProps";

class RoomController {
    async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const roomService = new RoomService();
    
            const rooms = await roomService.findAll();
    
            const response = new ResponseModel(false, CodeResponseEnum.OK, 'ok', rooms);
            res.status(response.getCode()).json(response);
        } catch (error) {
            console.log('[ERROR] - findAll - RoomController - Falha ao consultar salas', error);
            next(error);
        }
    }

    async find(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            const roomService = new RoomService();
            const room = await roomService.find(id);

            if (!room) {
                throw new ResponseModel(true, CodeResponseEnum.NOT_FOUND, 'Sala não encontrada', id);
            }

            const response = new ResponseModel(false, CodeResponseEnum.OK, 'ok', room);
            res.status(response.getCode()).json(response);
        } catch (error) {
            console.log('[ERROR] - find - LivroController - Falha ao consultar salas', error);
            next(error);
        }
    }

}

export default RoomController;