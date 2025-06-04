import { Request, Response } from 'express';
import { z } from 'zod';
import uploadConfig from '@/configs/upload';

class UploadController {
    async create(request: Request, response: Response) {
        try {
            const fileSchema = z.object({
                filename: z.string().min(1, "Arquivo é obrigatório"),
                mimetype: z.string().
                    refine((type) => uploadConfig.ACCEPTED_IMAGE_TYPES.
                        includes(type), `Formato de arquivo inválido. Formatos aceitos: ${uploadConfig.ACCEPTED_IMAGE_TYPES} `),
                size: z.number().positive().refine((size) => size <= uploadConfig.MAX_FILE_SIZE, `Tamanho máximo do arquivo é de ${uploadConfig.MAX_SIZE}`),
            }).passthrough()

            const { file } = fileSchema.parse(request.file);

            response.json({ message: "Arquivo enviado com sucesso!" });
        } catch (error) {
            throw error
        }
    }
}

export { UploadController };