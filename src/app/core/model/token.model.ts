export interface TokenModel {
    token: string;
    refreshToken: string;
    expiresIn: number;
    userId: string;
    email: string;
    role: string;
}