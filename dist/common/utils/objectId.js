"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseObjectId = void 0;
const mongoose_1 = require("mongoose");
const parseObjectId = (value) => {
    return mongoose_1.Types.ObjectId.createFromHexString(value);
};
exports.parseObjectId = parseObjectId;
//# sourceMappingURL=objectId.js.map