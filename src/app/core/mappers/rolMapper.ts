import { AppModuleTab } from "@core/models/app_module_tab";
import { CartsComponent } from "@features/carts/carts.component";
import { HomeComponent } from "@features/home/home.component";
import { MusicComponent } from "@features/music/music.component";
import { ProductsComponent } from "@features/products/products.component";
import { UserComponent } from "@features/user/user.component";
/**
 * Función para mapear el rol a los módulos de la aplicación
 * @param rolName 
 * @returns 
 */

export function mapRolToModuleTab(rolName: string): AppModuleTab[] {
    switch (rolName) {
        case 'ADMIN':
            return [

                { id: 'user', title: 'Mi Perfil', component: UserComponent },
                { id: 'products', title: 'Productos', component: ProductsComponent },
                { id: 'carts', title: 'Carrito', component: CartsComponent },

            ];
        case 'SELLER':
            return [
                { id: 'user', title: 'Mi Perfil', component: UserComponent },
                { id: 'products', title: 'Productos', component: ProductsComponent },
                { id: 'carts', title: 'Carrito', component: CartsComponent },
            ];
        case 'MUSIC':
            return [
                { id: 'user', title: 'Mi Perfil', component: UserComponent },
                { id: 'music', title: 'Música', component: MusicComponent },
            ];
        default:
            return [
                { id: 'user', title: 'Mi Perfil', component: UserComponent }
            ];
    }
}