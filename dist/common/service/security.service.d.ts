export declare class SecurityService {
    constructor();
    generateHash: (plaintext: string, salt_round?: number) => Promise<string>;
    compareHash: (plaintext: string, hashValue: string) => Promise<boolean>;
}
