import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    walletAmount: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('User', userSchema);

export default User;