import { ResponseModelFakeStore } from "@core/models/in/responseFakeStore.model";
import { RolModel } from "@core/models/rol_model";
// DATOS MOCKEADOS

export function  getRolesByIdMock(userId: number): ResponseModelFakeStore<RolModel[]> {

    let roles: RolModel[] = [];
    if (userId === 1) {
        // Usuario Admin
        roles = [
            {
                id: 1,
                name: 'ADMIN',
                description: 'Administrador del sistema'
            }
        ];
    }
    else if (userId === 2) {
        // Usuario Vendedor
        roles = [
            {
                id: 2,
                name: 'SELLER',
                description: 'Vendedor'
            }
        ];
    }
    else {
        // Usuario con múltiples roles
        roles = [
            {
                id: 2,
                name: 'SELLER',
                description: 'Vendedor'
            },
            {
                id: 3,
                name: 'MUSIC',
                description: 'Gestión musical'
            }
        ];
    }

    return new ResponseModelFakeStore<RolModel[]>(
        true,
        '200',
        'Roles obtenidos correctamente',
        roles
    );
}