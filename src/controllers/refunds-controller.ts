import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import { Category } from '@prisma/client';

const CategoriesEnum = z.enum(["food", "others", "services", "transport", "accommodation"]);

class RefundsController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            name: z.string().trim().min(1, { message: "Informe o nome da solicitação" }),
            category: CategoriesEnum,
            amount: z.number().positive({ message: "Informe um valor positivo" }),
            filename: z.string().min(20)
        });

        const { name, category, amount, filename } = bodySchema.parse(request.body);

        if (!request.user) {
            throw new AppError("Usuário não autenticado", 401);
        }

        const refund = await prisma.refunds.create({
            data: {
                name,
                category,
                amount,
                filename,
                userId: request.user.id
            }
        })

        response.status(201).json(refund)
    }
}

export { RefundsController };