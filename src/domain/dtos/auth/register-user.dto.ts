import { regularExps } from '../../../config';


export class RegisterUserDTO {

    private constructor(
        public username: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
    ) {}

    static create( object: { [key: string]: any } ): [ string?, RegisterUserDTO? ] {
        const { username, firstName, lastName, email, password } = object;

        if ( !username ) return ['Missing username'];
        if ( !firstName ) return ['Missing firstName'];
        if ( !lastName ) return ['Missing lastName'];
        if ( !email ) return ['Missing email'];
        if ( !regularExps.email.test(email) ) return ['Email is not valid'];
        if ( !password ) return ['Missing password'];
        if ( password?.lenght < 8 ) return ['Password too short'];

        return [ undefined, new RegisterUserDTO( username, firstName, lastName, email, password )];
    }

}