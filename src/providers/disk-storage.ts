import fs from "node:fs"
import path from "node:path"

import uploadConfigs from "../configs/upload"

class DiskStorage {
    async saveFile(file: string) {
        const tmpPath = path.resolve(uploadConfigs.TMP_FOLDER, file)
        const destPath = path.resolve(uploadConfigs.UPLOADS_FOLDER, file)

        try {
            // Se o arquivvo nao existir, o erro será lançado
            await fs.promises.access(tmpPath)

        } catch (error) {
            console.log(error)
            throw new Error(`Arquivo não encontrado: ${tmpPath}`)
        }
        // Garantindo que o diretório de destino exista
        await fs.promises.mkdir(uploadConfigs.UPLOADS_FOLDER, { recursive: true})
        // Movendo o arquivo do diretório temporário para o diretório de uploads
        await fs.promises.rename(tmpPath, destPath)

        return file
    }

    async deleteFile(file: string, type: "tmp" | "uploads") {
        const pathFile = type === "tmp" ? uploadConfigs.TMP_FOLDER : uploadConfigs.UPLOADS_FOLDER
        const filePath = path.resolve(pathFile, file)

        try {
            // Verifica se o arquivo existe 
            await fs.promises.stat(filePath)
        } catch {
            return
        }

        // Se o arquivo existir, remove ele
        await fs.promises.unlink(filePath)
    }
}

export { DiskStorage}