import { UserAuthModel } from "@core/models/auth.model";

export interface SesionState {
    isLoggedIn: boolean;
    user: UserAuthModel;
    loginTime: number;
}