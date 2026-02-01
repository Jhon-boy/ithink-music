import { Type } from "@angular/core";

/**
 * Modelo de la tabla de módulos de la aplicación
 */
export interface AppModuleTab {
    id: string;
    title: string;
    icon?: string;
    component: Type<any>;
    children?: AppModuleTab[];
}