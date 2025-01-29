import { makeAutoObservable, set } from "mobx";
import { IUser } from "../response/models/User";
import AuthService from "../response/services/AuthService";
import { AuthResponse } from "../response/models/AuthResponse";
import { API_URL } from "../response/http";
import axios from "axios";

export default class Store {
    user = {} as IUser;
    isAuth = false
    isLoading = false
    
    constructor() {
        makeAutoObservable(this)
    }

    setUser(user: IUser) {
        this.user = user
    }

    async login(login: string, password: string) {
        console.log(login, password)
        try {
            const response = await AuthService.login(login, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setUser(response.data.user)
            console.log('ВХОД ВЫПОЛНЕН')
            this.isAuth = true
        } catch(e) {
            console.log(e)
        }
    }
    async registration(login: string, password: string, balance: number) {
        try {
            const response = await AuthService.registration(login, password, balance)
            localStorage.setItem('token', response.data.accessToken)
            this.setUser(response.data.user)
            console.log('ПОЛЬЗОВАТЕЛЬ ЗАРЕГЕСТРИРОВАН')
        } catch(e) {
            console.log(e)
        }
    }
    async logout() {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            this.setUser({} as IUser)
            console.log('ВЫ ВЫШЛИ ИЗ АККАУНТА')
            this.isAuth = false
        } catch(e) {
            console.log(e)
        }
    }
    async checkAuth() {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true, timeout: 1000})
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setUser(response.data.user)
            this.isAuth = true
            console.log('CHECK AUTH')
        } catch(e) {
            console.log(e)
            await localStorage.removeItem('token')
        } finally {
            this.isLoading = true
        }
    }
}