import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TokenService } from './../../service/token.service';
import { Reflector } from '@nestjs/core';
export declare class AuthenticationGuard implements CanActivate {
    private readonly tokenService;
    private readonly reflector;
    constructor(tokenService: TokenService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
