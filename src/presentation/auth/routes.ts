import { Router } from "express";



export class AuthRoutes {

    static get routes(): Router {

        const router = Router();

        router.get('/login', (req, res) => {
            res.json('Login');
        })

        return router
    }

}