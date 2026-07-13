import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    FullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    DOB: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ["admin", "customer", "rider", "restaurant"],
        required: true,
        default: "customer",
    },
},
    {
        timestamps: true,
    },
);

const User = mongoose.model("user", UserSchema);

export default User;