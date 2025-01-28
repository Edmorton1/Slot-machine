import { IUser } from "./User";

export interface AuthResponse {
    accessToken: string,
    refreshToke: string,
    user: IUser;
}