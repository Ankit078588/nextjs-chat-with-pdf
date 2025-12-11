import mongoose, { model, Schema } from "mongoose";


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    image: {
        type: String,
        default: 'data:image/png;base64,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'
    },
    password: {         // optional
        type: String,
        trim: true
    },
    provider: {
        type: String,
        required: true,
        enum: ['credentials', 'google', 'github']
    }
}, {timestamps: true});


export const UserModel = mongoose.models.User || model('User', UserSchema);


