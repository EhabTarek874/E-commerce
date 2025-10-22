import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
export declare class MatchBetweenFields<T = any> implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage?(validationArguments?: ValidationArguments): string;
}
export declare function IsMatch<T = any>(constraints: string[], validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
