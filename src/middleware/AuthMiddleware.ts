import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import ResponseModel, { CodeResponseEnum } from "../models/ResponseModel";

export default class AuthMiddleware {
    constructor() {}

    authorize(req: Request, res: Response, next: NextFunction) {
        try {
            const authorization = req.headers.authorization || '';
            const { JWT_SECRET, AUTH_USER, AUTH_PASSWORD } = process.env;

            if (!authorization) {
                throw new ResponseModel(true, CodeResponseEnum.UNAUTHORIZED, 'Informe usuário e senha.');
            }

            const [, base64] = authorization.split(' ');
            const buff = Buffer.from(base64, 'base64').toString();
            const [ username, password ] = buff.split(':');

            if (!username || !password) {
                throw new ResponseModel(true, CodeResponseEnum.UNAUTHORIZED, 'Informe usuário e senha.');
            }

            if (username !== AUTH_USER || password !== AUTH_PASSWORD) {
                throw new ResponseModel(true, CodeResponseEnum.UNAUTHORIZED, 'Usuário ou senha inválido.');
            }

            const payload = {
                username, password
            }

            const options: jwt.SignOptions = {
                expiresIn: '30s',
                subject: username + password
            }

            const token = jwt.sign(payload, String(JWT_SECRET), options);

            const response = new ResponseModel(false, CodeResponseEnum.OK, 'OK', { token });
            res.status(response.getCode()).json(response);
        } catch (error) {
            console.log('[ERROR] - authorize - AuthMiddleware - Falha ao gerar token - ', error);
            next(error);
        }
    }

    checkAuthorization(req: Request, res: Response, next: NextFunction) {
        try {
            const authorization = req.headers.authorization || '';
            const { JWT_SECRET } = process.env;

            if (!authorization) {
                throw new ResponseModel(true, CodeResponseEnum.UNAUTHORIZED, 'Informe o token de autenticação.');
            }

            const [, token] = authorization.split(' ');

            if (!token) {
                throw new ResponseModel(true, CodeResponseEnum.UNAUTHORIZED, 'Token inválido.');
            }
            
            jwt.verify(token, String(JWT_SECRET), function(error) {
                if (error) {
                    throw new ResponseModel(true, CodeResponseEnum.UNAUTHORIZED, error.message, error);
                }
            });

            next();

        } catch (error) {
            console.log('[ERROR] - checkAuthorization - AuthMiddleware - Falha ao validar token - ', error);
            next(error);
        }
    }
}