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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandModel = exports.Brand = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
let Brand = class Brand {
    name;
    slug;
    slogan;
    image;
    createdBy;
    updatedBy;
    freezedAt;
    restoredAt;
};
exports.Brand = Brand;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true, minlength: 2, maxlength: 25 }),
    __metadata("design:type", String)
], Brand.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, minlength: 2, maxlength: 50 }),
    __metadata("design:type", String)
], Brand.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, minlength: 2, maxlength: 25 }),
    __metadata("design:type", String)
], Brand.prototype, "slogan", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Brand.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User", required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Brand.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User" }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Brand.prototype, "updatedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Brand.prototype, "freezedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Brand.prototype, "restoredAt", void 0);
exports.Brand = Brand = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, strictQuery: true })
], Brand);
const brandSchema = mongoose_1.SchemaFactory.createForClass(Brand);
brandSchema.pre("save", async function (next) {
    if (this.isModified("name")) {
        this.slug = (0, slugify_1.default)(this.name);
    }
    next();
});
brandSchema.pre(["updateOne", "findOneAndUpdate"], async function (next) {
    const update = this.getUpdate();
    if (update.name) {
        this.setUpdate({ ...update, slug: (0, slugify_1.default)(update.name) });
    }
    const query = this.getQuery();
    if (query.paranoId === false) {
        this.setQuery({ ...query });
    }
    else {
        this.setQuery({ ...query, freezedAt: { $exists: false } });
    }
    next();
});
brandSchema.pre(["findOne", "find"], async function (next) {
    const query = this.getQuery();
    if (query.paranoId === false) {
        this.setQuery({ ...query });
    }
    else {
        this.setQuery({ ...query, freezedAt: { $exists: false } });
    }
    next();
});
exports.BrandModel = mongoose_1.MongooseModule.forFeature([{ name: Brand.name, schema: brandSchema }]);
//# sourceMappingURL=Brand.model.js.map