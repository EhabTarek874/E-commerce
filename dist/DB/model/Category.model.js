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
exports.CategoryModel = exports.Category = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
let Category = class Category {
    name;
    slug;
    slogan;
    image;
    assetFolderId;
    discretion;
    createdBy;
    updatedBy;
    freezedAt;
    restoredAt;
    brands;
};
exports.Category = Category;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true, minlength: 2, maxlength: 25 }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, minlength: 2, maxlength: 50 }),
    __metadata("design:type", String)
], Category.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, minlength: 2, maxlength: 25 }),
    __metadata("design:type", String)
], Category.prototype, "slogan", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Category.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Category.prototype, "assetFolderId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, minlength: 2, maxlength: 5000 }),
    __metadata("design:type", Object)
], Category.prototype, "discretion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User", required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Category.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User" }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Category.prototype, "updatedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Category.prototype, "freezedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Category.prototype, "restoredAt", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose_2.Types.ObjectId, ref: "Brand" }]),
    __metadata("design:type", Array)
], Category.prototype, "brands", void 0);
exports.Category = Category = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, strictQuery: true, strict: true })
], Category);
const categorySchema = mongoose_1.SchemaFactory.createForClass(Category);
categorySchema.pre("save", async function (next) {
    if (this.isModified("name")) {
        this.slug = (0, slugify_1.default)(this.name);
    }
    next();
});
categorySchema.pre(["updateOne", "findOneAndUpdate"], async function (next) {
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
categorySchema.pre(["findOne", "find"], async function (next) {
    const query = this.getQuery();
    if (query.paranoId === false) {
        this.setQuery({ ...query });
    }
    else {
        this.setQuery({ ...query, freezedAt: { $exists: false } });
    }
    next();
});
exports.CategoryModel = mongoose_1.MongooseModule.forFeature([{ name: Category.name, schema: categorySchema }]);
//# sourceMappingURL=Category.model.js.map