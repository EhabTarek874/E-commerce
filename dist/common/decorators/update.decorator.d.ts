import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
export declare class CheckIfAnyFieldsAreApplied implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage?(validationArguments?: ValidationArguments): string;
}
export declare function ContainField(validationOptions?: ValidationOptions): (constructor: Function) => void;
