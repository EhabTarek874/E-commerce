"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailEvent = void 0;
const node_events_1 = require("node:events");
const send_email_1 = require("./send.email");
const verify_template_email_1 = require("./verify.template.email");
const enums_1 = require("../../enums");
exports.emailEvent = new node_events_1.EventEmitter();
exports.emailEvent.on(enums_1.OtpEnum.ConfirmEmail, async (data) => {
    try {
        data.subject = enums_1.OtpEnum.ConfirmEmail;
        data.html = (0, verify_template_email_1.verifyEmail)({ otp: data.otp, title: data.subject });
        await (0, send_email_1.sendEmail)(data);
    }
    catch (error) {
        console.log(`Fail To Send Email`, error);
    }
});
exports.emailEvent.on(enums_1.OtpEnum.ResetPassword, async (data) => {
    try {
        data.subject = enums_1.OtpEnum.ResetPassword,
            data.html = (0, verify_template_email_1.verifyEmail)({ otp: data.otp, title: data.subject });
        await (0, send_email_1.sendEmail)(data);
    }
    catch (error) {
        console.log(`Fail To Send Email`, error);
    }
});
//# sourceMappingURL=email.event.js.map