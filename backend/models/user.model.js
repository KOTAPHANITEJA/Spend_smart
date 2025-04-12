import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    income: {
        type: Number,
        default: 0
    },
    emi: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;