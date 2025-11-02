"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudFileUpload = void 0;
const multer_1 = require("multer");
const common_1 = require("@nestjs/common");
const os_1 = require("os");
const crypto_1 = require("crypto");
const enums_1 = require("../../enums");
const cloudFileUpload = ({ storageApproach = enums_1.StorageEnum.memory, validation = [], fileSize = 2, }) => {
    return {
        storage: storageApproach === enums_1.StorageEnum.memory
            ? (0, multer_1.memoryStorage)()
            : (0, multer_1.diskStorage)({
                destination: (0, os_1.tmpdir)(),
                filename: function (req, file, callback) {
                    callback(null, `${(0, crypto_1.randomUUID)()}_${file.originalname}`);
                }
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
exports.cloudFileUpload = cloudFileUpload;
//# sourceMappingURL=cloud.multer.js.map