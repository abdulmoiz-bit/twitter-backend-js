import mongoose from "mongoose"

const authUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "a user must have a email address"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "a user must have a password"],
        minlength: 8
    },
  
});

const authUser = mongoose.model('User', authUserSchema);

export default authUser;