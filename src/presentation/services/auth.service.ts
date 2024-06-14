import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { UserModel } from "../../data/mongo";
import { CustomError, LoginUserDTO, RegisterUserDTO, UserEntity } from "../../domain";



export class AuthService {

    constructor() {}

    public async registerUser( registerUserDTO: RegisterUserDTO ) {

        const existEmail = await UserModel.findOne({ email: registerUserDTO.email });
        if ( existEmail ) throw CustomError.badRequest('Email already exist');

        const existUser = await UserModel.findOne({ username: registerUserDTO.username });
        if ( existUser ) throw CustomError.badRequest('User already exist');

        try {

            const user = new UserModel( registerUserDTO );

            // Encrypt password
            user.password = bcryptAdapter.hash( registerUserDTO.password );

            await user.save();

            // todo emailConfirmation

            const { password, ...userEntity } = UserEntity.fromObject( user );

            // todo token = JWT <-- auth user

            return {
                user: userEntity
            };

        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }

    };

    public async loginUser( loginUserDTO: LoginUserDTO ) {
        // Find document by email or username
        const user = await UserModel.findOne({ 
            $or: [
                { email: loginUserDTO.email },
                { username: loginUserDTO.username } 
            ]
        }); 
        if ( !user ) throw CustomError.badRequest('User not found');

        // Compare password
        const isPasswordValid = bcryptAdapter.compare( loginUserDTO.password, user.password );
        if ( !isPasswordValid ) throw CustomError.badRequest('Invalid credentials');

        try {
            // todo generate JWT token

            const { password, ...userEntity } = UserEntity.fromObject( user );

            return {
                user: userEntity
            }

        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }

    }

};