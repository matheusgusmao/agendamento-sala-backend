import { User } from "@prisma/client";
import   prisma     from "../lib/prisma";

export default class UserService {

    constructor() {}

    async findAll() {

        try {

            const usuarios = await prisma.user.findMany();
            
            return usuarios;

        } catch (error) {

            console.log('[ERROR] - findAll - UserService - Falha ao consultar Usuarios', error);
            throw error;

        }

    }

    async find(cpf: string): Promise<User | null> {

        try {
            
            const usuario = await prisma.user.findUnique({ where: { cpf } });

            return usuario;

        } catch (error) {

            console.log('[ERROR] - find - UserService - Falha ao procurar Usuário', error);

            throw error; 

        }

    }

}