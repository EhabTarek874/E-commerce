import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
import { Types } from "mongoose";
export declare class MongoDBIds implements ValidatorConstraintInterface {
    validate(ids: Types.ObjectId[], args: ValidationArguments): boolean;
    defaultMessage?(validationArguments?: ValidationArguments): string;
}
export declare class MatchBetweenFields<T = any> implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage?(validationArguments?: ValidationArguments): string;
}
export declare function IsMatch<T = any>(constraints: string[], validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
