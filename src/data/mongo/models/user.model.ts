import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: [ true, 'Username is required'],
        lowercase: true,
    },
    firstName: {
        type: String,
        required: [ true, 'Name is required'],
    },
    lastName: {
        type: String,
        required: [ true, 'Last Name is required']
    },
    email: {
        type: String,
        required: [ true, 'Email is required' ],
        unique: true
    },
    emailValidated: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: [ true, 'Password is required'],
    },
    role: {
        type: [String],
        default: ['USER_ROLE'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    img: {
        type: String
    }
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret, options) {
        delete ret ._id;
    },
});

export const UserModel = mongoose.model('User', userSchema);