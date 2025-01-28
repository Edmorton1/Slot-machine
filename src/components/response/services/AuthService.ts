import $api from "../http";
//@ts-ignore
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/AuthResponse";

export default class AuthService {
    static async login(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', {login, password})
    }
     
    static async registration(login: string, password: string, balance: number): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registration', {login, password, balance})
    }
    static async logout(): Promise<void> {
        //@ts-ignore
        return $api.post('/logout')
    }
}