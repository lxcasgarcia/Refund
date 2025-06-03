import { Request, Response } from 'express';
import { AppError } from '@/utils/AppError';
import { NextFunction } from 'express';

function verifyUserAuthorization(role: string[]) {
    return (request: Request, response: Response, next: NextFunction) => {
        // Verifica se o usuário está autenticado e tem permissão
        if(!request.user || !role.includes(request.user.role)){
            throw new AppError('Usuário não autorizado', 401);
        }

        return next();
    };
}

export { verifyUserAuthorization };