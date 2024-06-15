import { UserModel } from "../../data/mongo";
import { CustomError, UserEntity } from "../../domain";
import { updateUserProfileDTO } from "../../domain/dtos/profile/update-user.dto";



export class ProfileService {

    async getProfile( username: string ) {

        const user = await UserModel.findOne({ username: username }); // Find user by username
        if ( !user ) throw CustomError.badRequest('User not found');

        const { password, emailValidated, ...userInfo } = UserEntity.fromObject( user );

        return userInfo;
    }

    async updateUserProfile( updateUserProfileDto: updateUserProfileDTO ) {

        const { username, firstName, lastName, img } = updateUserProfileDto;
        
        const user = await UserModel.findOne({ username: username }); // Find user by username
        if ( !user ) throw CustomError.badRequest('User not found');

        try {
            
            user.username = username ? username : user.username;
            user.firstName = firstName ? firstName : user.firstName;
            user.lastName = lastName ? lastName : user.lastName;
            user.img = img ? img : user.img;

            await user.save();
            
            const { password, ...userInfo } = UserEntity.fromObject( user );

            return userInfo;

        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }

    }
}