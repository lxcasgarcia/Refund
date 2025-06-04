import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import { Category } from '@prisma/client';

class UploadController {
    async create(request: Request, response: Response) {
        response.json({ message: "ok"})
    }
}

export { UploadController };