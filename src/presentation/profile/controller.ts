import { Request, Response } from "express";
import { ProfileService } from "../services";
import { CustomError } from "../../domain";
import { updateUserProfileDTO } from "../../domain/dtos/profile/update-user.dto";
import { CONSTANTS } from "../../utils/constants";



export class ProfileController {

    constructor(
        public readonly profileService: ProfileService,
    ) {}

    private handleError = ( error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
            return res.status( error.statusCode ).json({ error: error.message });
        }

        console.log(`${ error }`);
        return res.status(500).json({ error: 'Internal server error' });
    };

    getProfile = ( req: Request, res: Response ) => {
        const { username } = req.params;
        if ( !username ) return res.status(400).json({ error: 'Missing username' });

        this.profileService.getProfile( username )
            .then( user => res.json( user ) )
            .catch( error => this.handleError( error, res ) );
    };

    updateUserProfile = ( req: Request, res: Response ) => {
        
        const { username } = req.params;
        const { username: currentUser, role: currentUserRole } = req.body.user;
        if ( !username ) return res.status(400).json({ error: 'Missing username' });

        const isSameUser = currentUser === username;
        const isAdmin = currentUserRole.includes(CONSTANTS.ADMIN_ROLE);

        if ( !isAdmin && !isSameUser ) return res.status(403).json({ error: 'Access denied' });

        const [ error, updateProfileDto ] = updateUserProfileDTO.create({
                ...req.body,
                username: username,
            });
        if ( error ) return res.status(400).json({ error });
        
        this.profileService.updateUserProfile( updateProfileDto! )
            .then( user => res.json( user ) )
            .catch( error => this.handleError( error, res ) );
    }

};