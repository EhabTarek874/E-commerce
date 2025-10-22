import { RoleEnum, TokenEnum } from '../enums';
export declare function Auth(roles: RoleEnum[], type?: TokenEnum): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
