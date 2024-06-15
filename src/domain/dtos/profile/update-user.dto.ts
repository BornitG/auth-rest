


export class updateUserProfileDTO { 

    private constructor(
        public username: string,
        public firstName: string,
        public lastName: string,
        // public email: string,
        public img?: string, 
    ) {}

    static create( props: { [key: string]: any } ): [string?, updateUserProfileDTO?] {
        const { username, firstName, lastName, img } = props;
        
        if ( !username ) return ['Missing username'];


        return [undefined, new updateUserProfileDTO( username, firstName, lastName, img )];
    }

}