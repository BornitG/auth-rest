import { NextFunction, Request, Response } from "express";



export class AuthMiddlewares {
    constructor() {}

    // Todo: Add validateJWT
    validateJWT() {}

    // Todo: Add validateRole
    validateRole() {}

    static validatePassword( req: Request, res: Response, next: NextFunction ) {

        const { password } = req.body;
        if ( !password ) return res.status(400).json({ error: 'Missing password' });
        if ( password.length < 8 ) return res.status(400).json({ error: 'Password must be at least 8 characters' });
        
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialCharacters = /[!@#$%^&*]/.test(password);
        
        if (!hasUppercase) return res.status(400).json({ error: 'Password must contain at least one uppercase letter' });
        if (!hasLowercase) return res.status(400).json({ error: 'Password must contain at least one lowercase letter' });
        if (!hasNumber) return res.status(400).json({ error: 'Password must contain at least one number' });
        if (!hasSpecialCharacters) return res.status(400).json({ error: 'Password must contain at least one special character' });

        next();

    }
}