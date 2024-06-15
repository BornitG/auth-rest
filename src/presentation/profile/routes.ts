import { Router } from "express";
import { ProfileController } from "./controller";
import { ProfileService } from '../services/profile.service';
import { AuthMiddlewares } from "../middlewares/auth.middlewares";



export class ProfileRoutes {

    static get routes(): Router {

        const router = Router();

        const profileService = new ProfileService();

        const controller = new ProfileController( profileService );

        router.use( AuthMiddlewares.validateJWT );
        router.use( AuthMiddlewares.validateRole );

        router.get('/:username', controller.getProfile );
        
        router.put('/:username', controller.updateUserProfile );

        return router;
    }

}