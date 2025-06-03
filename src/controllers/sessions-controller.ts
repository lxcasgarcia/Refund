import { Request, Response } from 'express';
import { UserRole } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import { hash } from 'bcrypt';

class SessionsController {
    async create(request: Request, response: Response) {
       response.json({ message: "ok"})
    }
}

export { SessionsController };