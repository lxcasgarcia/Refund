import { Request, Response } from 'express';
import { UserRole } from '@prisma/client';
import { z } from 'zod';

class UsersController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            name: z.string().trim().min(2, { message: "Nome é obrigatório ter pelo menos 2 caracteres" }),
            email: z.string().email({ message: "Email inválido" }).toLowerCase(),
            password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
            role: z.enum([UserRole.employee, UserRole.manager]).default(UserRole.employee)
        })

        const { name, email, password, role } = bodySchema.parse(request.body);

        response.json({ name, email, password, role });
    }
}

export { UsersController };