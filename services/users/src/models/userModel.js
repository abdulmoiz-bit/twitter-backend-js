import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "a user must have a username"],
        unique: true
    },
    name: {
        type: String,
        required: [true, "a user must have a name"]
    },
   // bio, location, profile phote, birthday, joined date, etc
   /* 
   followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
   ],
   
   following: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
   ],
   */
   followersCount: {
    type: Number,
    default: 0,
   },
   followingCount: {
    type: Number,
    default:0
   }
});

const User = mongoose.model('User', userSchema);

export default User;