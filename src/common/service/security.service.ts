
import { Injectable } from '@nestjs/common';
import { generateHash, compareHash } from './../utils/security/hash.security';

@Injectable()
export class SecurityService {
    constructor(){}

    generateHash = generateHash;
    compareHash = compareHash
}