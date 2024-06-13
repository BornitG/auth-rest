import { Request, Response } from "express";
import { AuthService } from "../services";
import { CustomError, RegisterUserDTO } from "../../domain";



export class AuthController {

    constructor(
        public readonly authService: AuthService,
    ) {}

    // todo handleError
    private handleError = ( error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
            return res.status( error.statusCode ).json({ error: error.message });
        }

        console.log(`${ error }`);
        return res.status(500).json({ error: 'Internal server error' });
    }

    login = ( req: Request, res: Response ) => {
        const { email, password } = req.body;
        if( !email || !password ) return res.status(400).json('Invalid credentials');
        return res.json({
            // id: 'jaslkfjkllkasu809asnl',
            // user,
            email,
            password,
            // token: 'ejshsa,as.zjaoasjflk'
        });
    };

    register = ( req: Request, res: Response ) => {
        const [ error, registerDto ] = RegisterUserDTO.create(req.body);
        if ( error ) return res.status(400).json({ error });

        this.authService.registerUser( registerDto! )
            .then( user => res.status(201).json( user ) )
            .catch( error => this.handleError( error, res ) );
    };

};