"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localFileUpload = void 0;
const multer_1 = require("multer");
const crypto_1 = require("crypto");
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = require("node:fs");
const common_1 = require("@nestjs/common");
const localFileUpload = ({ folder = 'public', validation = [], fileSize = 2, }) => {
    let bathPath = `uploads/${folder}`;
    return {
        storage: (0, multer_1.diskStorage)({
            destination(req, file, callback) {
                const fullPath = node_path_1.default.resolve(`./${bathPath}`);
                if (!(0, node_fs_1.existsSync)(fullPath)) {
                    (0, node_fs_1.mkdirSync)(fullPath, { recursive: true });
                }
                callback(null, fullPath);
            },
            filename(req, file, callback) {
                const fileName = (0, crypto_1.randomUUID)() + '_' + Date.now() + '_' + file.originalname;
                file.finalPath = bathPath + `/${fileName}`;
                callback(null, fileName);
            },
        }),
        fileFilter(req, file, callback) {
            if (validation.includes(file.mimetype)) {
                return callback(null, true);
            }
            return callback(new common_1.BadRequestException('Invalid file format'));
        },
        limits: {
            fileSize: fileSize * 1024 * 1024,
        },
    };
};
exports.localFileUpload = localFileUpload;
//# sourceMappingURL=local.multer.options.js.map