import { UserAuthModel } from "@core/models/auth.model";
import { RolModel } from "@core/models/rol_model";

export interface SesionState {
    isLoggedIn: boolean;
    user: UserAuthModel;
    roles: RolModel[];
    loginTime: number;
    activeRol?: RolModel;
}