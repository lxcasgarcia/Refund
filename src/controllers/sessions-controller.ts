import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import { compare } from 'bcrypt';
import { authConfig } from '@/configs/auth';
import { sign } from 'jsonwebtoken';


class SessionsController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            email: z.string().email({ message: "Email inválido" }),
            password: z.string()
        })

        const { email, password } = bodySchema.parse(request.body);

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if(!user) {
            throw new AppError('Email ou senha inválido', 401);
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new AppError('Email ou senha inválido', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({ role: user.role }, secret, {
            subject: user.id,
            expiresIn
        })

        const { password: _, ...userWithoutPassword } = user;

       response.json({ token, user: userWithoutPassword})

    }
}

export { SessionsController };
