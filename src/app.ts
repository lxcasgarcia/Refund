import express from 'express';
import cors from 'cors';
import "express-async-errors"

import { routes } from './routes';
import { errorHandling } from "./middlewares/error-handling";
import uploadConfigs from './configs/upload';


const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(uploadConfigs.UPLOADS_FOLDER));

app.use(routes);
app.use(errorHandling);

export { app }