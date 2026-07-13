import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    FullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    },
);

const Contact = mongoose.model("contact",UserSchema);

export default Contact;