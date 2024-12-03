import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";
import  ResponseModel, { CodeResponseEnum } from "../models/ResponseModel";
import { UserProps } from "../interfaces/UserProps";

class UserController {
    
    async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {

            const userService = new UserService();
            const usuarios    = await userService.findAll();
    
            const response = new ResponseModel(false, CodeResponseEnum.OK, 'ok', usuarios);
            res.status(response.getCode()).json(response);

        } catch (error) {

            console.log('[ERROR] - findAll - UserController - Falha ao consultar Usuarios', error);
            next(error);

        }

    }

    async find(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            
            const { cpf }          = req.params;
            const userService = new UserService();
            const usuario     = await userService.find(cpf);

            if (!usuario) {

                throw new ResponseModel(true, CodeResponseEnum.NOT_FOUND, 'Funcionário não encontrado', cpf);

            }

            const response = new ResponseModel(false, CodeResponseEnum.OK, 'ok', usuario);
            res.status(response.getCode()).json(response);

        } catch (error) {

            console.log('[ERROR] - find - UserController - Falha ao consultar Usuário', error);

            next(error);

        }
    }

}

export default UserController;