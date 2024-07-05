import mongoose from "mongoose";
import bcrypt  from 'bcrypt';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true , 'Please provide ,name']
    },
    email: {
        type: String,
        required: [true , 'Please provide email']
    },
    password: {
        type: String,
        require : [true]
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isAdmin: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
    },
    followed: [{ 
        type : String
      }],
    isBanned: {
        type: Boolean,
        default : false,
    }
    
}, {timestamps: true});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

export default mongoose.model('User', UserSchema);
