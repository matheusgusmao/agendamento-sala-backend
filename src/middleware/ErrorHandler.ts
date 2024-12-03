import { NextFunction, Request, Response } from "express";
import { CodeResponseEnum } from "../models/ResponseModel";

export function ErrorHandler(error: any, req: Request, res: Response, next:NextFunction) {
    // console.log('Error Handler', error);

    if (error?.getCode) {
        res.status(error.getCode()).json(error);
    }

    res.status(CodeResponseEnum.INTERNAL_ERROR).json(error);
}