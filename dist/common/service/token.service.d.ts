import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { RoleEnum, SignatureLevelEnum, TokenEnum } from '../enums';
import { TokenDocument, UserDocument } from 'src/DB';
import { UserRepository } from './../../DB/repository/user.repository';
import { TokenRepository } from './../../DB/repository/token.repository';
import { Types } from 'mongoose';
import { LoginCredentialsResponse } from '../entities';
export declare class TokenService {
    private readonly jwtService;
    private readonly userRepository;
    private readonly tokenRepository;
    constructor(jwtService: JwtService, userRepository: UserRepository, tokenRepository: TokenRepository);
    generateToken: ({ payload, options, }: {
        payload: Object;
        options?: JwtSignOptions;
    }) => Promise<string>;
    verifyToken: ({ token, options, }: {
        token: string;
        options: JwtVerifyOptions;
    }) => Promise<JwtPayload>;
    detectSignatureLevel: (role?: RoleEnum) => Promise<SignatureLevelEnum>;
    getSignatures: (signatureLevel?: SignatureLevelEnum) => Promise<{
        access_signature: string;
        refresh_signature: string;
    }>;
    createLoginCredentials: (user: UserDocument) => Promise<LoginCredentialsResponse>;
    decodedToken: ({ authorization, tokenType, }: {
        authorization: string;
        tokenType?: TokenEnum;
    }) => Promise<{
        user: import("mongoose").Document<unknown, {}, import("src/DB").User, {}, {}> & import("src/DB").User & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        };
        decoded: JwtPayload;
    }>;
    createRevokeToken: (decoded: JwtPayload) => Promise<TokenDocument>;
}
