import { IResponse } from "../interfaces";
export declare const successResponse: <T = any>({ data, message, status }?: IResponse<T>) => IResponse<T>;
