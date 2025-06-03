import { Request, Response } from 'express';
import { UserRole } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import { hash } from 'bcrypt';

class UsersController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            name: z.string().trim().min(2, { message: "Nome é obrigatório ter pelo menos 2 caracteres" }),
            email: z.string().email({ message: "Email inválido" }).toLowerCase(),
            password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
            role: z.enum([UserRole.employee, UserRole.manager]).default(UserRole.employee)
        })

        const { name, email, password, role } = bodySchema.parse(request.body);

        const userWitchSameEmail = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if( userWitchSameEmail) {
            throw new AppError('Email já cadastrado');
        }

        const hashedPassword = await hash(password, 8);

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        })

        response.status(201).json({});
    }
}

export { UsersController };