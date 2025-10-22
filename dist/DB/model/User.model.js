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
exports.UserModel = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const enums_1 = require("../../common/enums");
const common_1 = require("../../common");
let User = class User {
    firstName;
    lastName;
    username;
    email;
    confirmEmail;
    password;
    provider;
    role;
    gender;
    preferredLanguage;
    changeCredentialsTime;
    otp;
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, minlength: 2, maxlength: 25, trim: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, minlength: 2, maxlength: 25, trim: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Virtual)({
        get: function () {
            return this.firstName + " " + this.lastName;
        },
        set: function (value) {
            const [firstName, lastName] = value.split(" ") || [];
            this.set({ firstName, lastName });
        }
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", Date)
], User.prototype, "confirmEmail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: function () {
            return this.provider == enums_1.ProviderEnum.GOOGLE ? false : true;
        } }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: enums_1.ProviderEnum, default: enums_1.ProviderEnum.SYSTEM }),
    __metadata("design:type", String)
], User.prototype, "provider", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: enums_1.RoleEnum, default: enums_1.RoleEnum.user }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: enums_1.GenderEnum, default: enums_1.GenderEnum.male }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: enums_1.LanguageEnum, default: enums_1.LanguageEnum.EN }),
    __metadata("design:type", String)
], User.prototype, "preferredLanguage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", Date)
], User.prototype, "changeCredentialsTime", void 0);
__decorate([
    (0, mongoose_1.Virtual)(),
    __metadata("design:type", Array)
], User.prototype, "otp", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ strictQuery: true, timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } })
], User);
const userSchema = mongoose_1.SchemaFactory.createForClass(User);
userSchema.virtual("otp", {
    localField: '_id',
    foreignField: 'createdBy',
    ref: "Otp"
});
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await (0, common_1.generateHash)(this.password);
    }
    next();
});
exports.UserModel = mongoose_1.MongooseModule.forFeature([{ name: User.name, schema: userSchema }]);
//# sourceMappingURL=User.model.js.map