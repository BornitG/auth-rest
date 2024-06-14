import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services";
import { AuthMiddlewares } from "../middlewares/auth.middlewares";



export class AuthRoutes {

    static get routes(): Router {

        const router = Router();

        const authService = new AuthService();

        const controller = new AuthController( authService );

        router.post('/login', controller.login );

        router.post('/register', [ AuthMiddlewares.validatePassword ], controller.register );

        return router;
    }

}