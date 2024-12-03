import { Room } from "@prisma/client";
import prisma from "../lib/prisma";

export default class RoomService {
    constructor() {}

    async findAll() {
        try {
            const rooms = await prisma.room.findMany({});
            
            return rooms;
        } catch (error) {
            console.log('[ERROR] - findAll - RoomService - Falha ao consultar Salas', error);
            throw error;
        }
    }

    async find(id: string) {
        try {
            const room = await prisma.room.findUnique({
                where: { id }
            });

            return room;
        } catch (error) {
            console.log('[ERROR] - find - RoomService - Falha ao consultar salas', error);
            throw error;
        }
    }

}