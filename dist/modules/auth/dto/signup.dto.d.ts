export declare class ResendConfirmEmailDto {
    email: string;
}
export declare class ConfirmEmailDto extends ResendConfirmEmailDto {
    code: string;
}
export declare class LoginBodyDto extends ResendConfirmEmailDto {
    password: string;
}
export declare class SignupDto extends LoginBodyDto {
    username: string;
    confirmPassword: string;
}
export declare class SignupQueryDto {
    flag: string;
}
