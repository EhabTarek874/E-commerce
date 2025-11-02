"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckIfAnyFieldsAreApplied = void 0;
exports.ContainField = ContainField;
const class_validator_1 = require("class-validator");
let CheckIfAnyFieldsAreApplied = class CheckIfAnyFieldsAreApplied {
    validate(value, args) {
        return Object.keys(args.object).length > 0 && Object.values(args.object).filter((arg) => {
            return arg != undefined;
        }).length > 0;
    }
    defaultMessage(validationArguments) {
        return `All update fields are empty`;
    }
};
exports.CheckIfAnyFieldsAreApplied = CheckIfAnyFieldsAreApplied;
exports.CheckIfAnyFieldsAreApplied = CheckIfAnyFieldsAreApplied = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "check_fields_Exists", async: false })
], CheckIfAnyFieldsAreApplied);
function ContainField(validationOptions) {
    return function (constructor) {
        (0, class_validator_1.registerDecorator)({
            target: constructor,
            propertyName: undefined,
            options: validationOptions,
            constraints: [],
            validator: CheckIfAnyFieldsAreApplied,
        });
    };
}
//# sourceMappingURL=update.decorator.js.map