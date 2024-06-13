import { UserModel } from "../../data/mongo";
import { CustomError, RegisterUserDTO, UserEntity } from "../../domain";



export class AuthService {

    constructor() {}

    public async registerUser( registerUserDTO: RegisterUserDTO ) {

        const existEmail = await UserModel.findOne({ email: registerUserDTO.email });
        if ( existEmail ) throw CustomError.badRequest('Email already exist');

        const existUser = await UserModel.findOne({ username: registerUserDTO.username });
        if ( existUser ) throw CustomError.badRequest('User already exist');

        try {

            const user = new UserModel( registerUserDTO );

            // todo encrypt password (bcrypt)

            await user.save();

            // todo emailConfirmation

            const { ...userEntity } = UserEntity.fromObject( user );

            // todo token = JWT <-- auth user

            return {
                user: userEntity
            };

        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }

    }

}