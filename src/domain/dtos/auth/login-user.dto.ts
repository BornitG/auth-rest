import { regularExps } from "../../../config";


export class LoginUserDTO {

    private constructor(
        public email: string,
        public username: string,
        public password: string,
    ) {}

    static create( object: { [key: string]: any } ): [ string?, LoginUserDTO? ] {
        const { email, username, password } = object;

        if ( !email && !username ) return ['Missing email or username'];
        if ( email && !regularExps.email.test(email) ) return ['Email is not valid'];
        if ( !password ) return ['Missing password'];

        return [ undefined, new LoginUserDTO( email, username, password )];
    }

}