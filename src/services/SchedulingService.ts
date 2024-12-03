import { Room, User, Scheduling } from "@prisma/client";
import prisma from "../lib/prisma";
import RoomController from "../controllers/RoomController";


export default class SchedulingService {
    constructor() {}

    async findAll() {
        try {
            const scheduling = await prisma.scheduling.findMany({
                include: { user: true, room: true }
            });
            
            return scheduling;
        } catch (error) {
            console.log('[ERROR] - findAll - SchedulingService - Falha ao consultar os Agendamentos', error);
            throw error;
        }
    }

    async findRoomAndDate(roomId: string, startDate: Date, endDate: Date) {
        try {
            const scheduling = await prisma.scheduling.findMany({
                where: {
                    room: {
                        some: {
                            id: {
                                equals: roomId
                            }
                        }
                    },
                    startDate: {
                        gte: startDate,
                    },
                    endDate: {
                        lte: endDate,
                    }
                },
                include: { user: true, room: true }
            });

            return scheduling;
        } catch (error) {
            console.log('[ERROR] - findRoomAndDate - SchedulingService - Falha ao consultar os Status informado dos Agendamentos', error);
            throw error;
        }
    }
    
    async find(id: string) {
        try {
            const scheduling = await prisma.scheduling.findUnique({
                where: { id },
                include: { user: true, room: true }
            });

            return scheduling;
        } catch (error) {
            console.log('[ERROR] - find - SchedulingService - Falha ao consultar o Agendamento', error);
            throw error;
        }
    }

    async create(title: string, startDate: Date, endDate: Date, recurrence: string,  roomIds: Array<{id: string}>, userIds: Array<{id: string}> ): Promise<Scheduling> {
        try {
            
            const newScheduling = await prisma.scheduling.create({
                data: {
                    title, startDate, endDate, recurrence,
                    room: { connect: roomIds },
                    user: { connect: userIds }
                }
            });

            return newScheduling;

        } catch (error) {
            console.log('[ERROR] - create - SchedulingService - Falha ao criar Agendamento', error);
            throw error; 
        }
    }
    
}