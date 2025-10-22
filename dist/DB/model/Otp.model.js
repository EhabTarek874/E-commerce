"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpModel = exports.Otp = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_1 = require("../../common");
let Otp = class Otp {
    code;
    expiredAt;
    createdBy;
    type;
};
exports.Otp = Otp;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Otp.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", Date)
], Otp.prototype, "expiredAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User", required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Otp.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: common_1.OtpEnum, required: true }),
    __metadata("design:type", String)
], Otp.prototype, "type", void 0);
exports.Otp = Otp = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Otp);
const otpSchema = mongoose_1.SchemaFactory.createForClass(Otp);
otpSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0 });
otpSchema.pre("save", async function (next) {
    this.wasNew = this.isNew;
    if (this.isModified("code")) {
        this.plainOtp = this.code;
        this.code = await (0, common_1.generateHash)(this.code);
        await this.populate([{ path: "createdBy", select: "email" }]);
    }
    next();
});
otpSchema.post("save", async function (doc, next) {
    const that = this;
    console.log({ email: that.createdBy.email, wasNew: that.wasNew, otp: that.plainOtp });
    if (that.wasNew && that.plainOtp) {
        common_1.emailEvent.emit(doc.type, { to: that.createdBy.email, otp: that.plainOtp });
    }
    next();
});
exports.OtpModel = mongoose_1.MongooseModule.forFeature([{ name: Otp.name, schema: otpSchema }]);
//# sourceMappingURL=Otp.model.js.map