import Contact from "../models/contact.model.js";

export const ContactUsForm = async (req, res, next) => {
    try {
        const { FullName, email, phone, subject, message } = req.body;
        if (!FullName || !email || !phone || !subject || !message) { 
            const error = new Error("All fields Required");
            error.statusCode = 400;
            return next(error);
        }

        const NewContactMessage = await Contact.create({
            FullName,
            email,
            phone,
            subject,
            message,
        });

        res
            .status(201)
            .json({
                message: "Thanks for Contacting us! You will hear back from us soon",
            });
    } catch (error) {
        console.log(error.message);
        next(error);

    }
};