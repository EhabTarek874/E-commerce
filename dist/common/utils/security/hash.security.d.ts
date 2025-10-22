export declare const generateHash: (plaintext: string, salt_round?: number) => Promise<string>;
export declare const compareHash: (plaintext: string, hashValue: string) => Promise<boolean>;
