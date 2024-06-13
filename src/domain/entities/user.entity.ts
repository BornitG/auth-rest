import { CustomError } from "../errors/custom.error";


export class UserEntity {

    constructor(
        public id: string,
        public username: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public role: string[],
        public img?: string,
    ) {}

    static fromObject( object: { [key: string]: any } ) {
        const { id, _id, username, firstName, lastName, email, emailValidated, password, role, img } = object;

        if ( !_id && !id ) {
            throw CustomError.badRequest('Missing id');
        }

        if ( !username ) throw CustomError.badRequest('Missing username');
        if ( !firstName ) throw CustomError.badRequest('Missing firstName');
        if ( !lastName ) throw CustomError.badRequest('Missing lastName');
        if ( !email ) throw CustomError.badRequest('Missing email');
        if ( emailValidated === undefined ) throw CustomError.badRequest('Missing emailValidated');
        if ( !password ) throw CustomError.badRequest('Missing password');
        if ( !role ) throw CustomError.badRequest('Missing role');

        return new UserEntity( _id || id, username, firstName, lastName, email, emailValidated, password, role, img );
    }

}