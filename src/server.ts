import { NotFoundResponse } from "./helpers/http";
import { PORT } from "./helpers/config";
import { Routes } from "./routes";
import { errorMiddleware } from "./middleware/error.middleware";
import { errors } from "celebrate";
import express from "express";
import mongoose from "mongoose";
import path from 'path';

export class AppServer {
    protected app: express.Application = express();

    constructor() {
    }

    createServer() {
        this.app.use(express.json());

        mongoose.connect("mongodb+srv://smarty:smarty6452@mern.7kggvit.mongodb.net/mern-auth?retryWrites=true&w=majority")
            .then(() => console.log("Database connected succesfully"))
            .catch(() => console.log("Unable to connect database"));

        this.app.use('/public/', express.static(path.join(__dirname + './../public/')));

        const routes = new Routes();
        this.app.use("/api/v1/", routes.path());

        this.app.use(errorMiddleware);
        this.app.use(errors());

        this.app.listen(PORT, () => {
            console.log("Server Running on port ", PORT);
        });
        this.app.use((req, res) => {
            return NotFoundResponse(res, req.originalUrl + ' not found');
        });
    }
}