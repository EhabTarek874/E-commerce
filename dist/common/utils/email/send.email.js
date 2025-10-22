"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const common_1 = require("@nestjs/common");
const nodemailer_1 = require("nodemailer");
const sendEmail = async (data) => {
    if (!data.html && !data.attachments && !data.text) {
        throw new common_1.BadRequestException("Missing Email Content");
    }
    const transporter = (0, nodemailer_1.createTransport)({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const info = await transporter.sendMail({
        ...data,
        from: `${process.env.APPLICATION_NAME} <${process.env.EMAIL}>`,
    });
    console.log("Message sent:", info.messageId);
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=send.email.js.map