//@ts-ignore
import { AxiosResponse } from "axios";
import $api from "../http";
import { IUser } from "../models/User";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        //@ts-ignore
        return $api.get("users")
    }
}