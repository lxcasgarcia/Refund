import { Request, Response } from 'express';
import { UserRole } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import { hash } from 'bcrypt';

class SessionsController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            email: z.string().email({ message: "Email inválido" }),
            password: z.string()
        })

        const { email, password } = bodySchema.parse(request.body);



       response.json({ email, password})

    }
}

export { SessionsController };