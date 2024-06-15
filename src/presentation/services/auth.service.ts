import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";
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

            // Generate JWT
            const token = await JwtAdapter.generateToken({ id: user.id });
            if ( !token ) throw CustomError.internalServer('Error generating token JWT');

            return {
                user: userEntity,
                token: token
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

            const { password, ...userInfo } = UserEntity.fromObject( user );
            
            // Generate JWT
            const token = await JwtAdapter.generateToken({ id: user.id });
            if ( !token ) throw CustomError.internalServer('Error generating token JWT');

            return {
                user: userInfo,
                token: token
            }

        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }

    }

};