import mongoose from 'mongoose';


export class Validators {

    static isMongoId( id: string ) {
        return mongoose.Types.ObjectId.isValid( id );
    };

};