import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data/mongo";
import { UserEntity } from "../../domain";
import { CONSTANTS } from "../../utils/constants";



export class AuthMiddlewares {
    constructor() {}

    // Validate JWT
    static async validateJWT( req: Request, res: Response, next: NextFunction ) {

        const authorization = req.header('Authorization');
        if ( !authorization ) return res.status(401).json({ error: 'No Bearer token provided' });
        if ( !authorization.startsWith('Bearer ') ) return res.status(401).json({ error: 'Invalid Bearer token' });

        const token = authorization.split(' ').at(1) || '';

        try {
            const payload = await JwtAdapter.validateToken<{ id: string }>( token );
            if ( !payload ) return res.status(401).json({ error: 'Invalid token' });

            const user = await UserModel.findById( payload.id );
            if ( !user ) return res.status(401).json({ error: 'Invalid token - user not found' });

            req.body.user = UserEntity.fromObject( user );

            next();
        } catch (error) {
            console.log( error );
            return res.status(500).json({ error: 'Internal server error' });
        }

    }

    // Validate role
    static validateRole( req: Request, res: Response, next: NextFunction ) {
        const { role } = req.body.user as UserEntity; //['ADMIN_ROLE', 'USER_ROLE']
        console.log(req.body.user);
        if ( !role.includes( CONSTANTS.ADMIN_ROLE ) && !role.includes( CONSTANTS.USER_ROLE ) ) return res.status(403).json({ error: 'Access denied' });

        next();
    }

    // Validate password
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