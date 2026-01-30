
/**
 * Modelo de la tabla de módulos de la aplicación
 */
export interface AppModuleTab{
    id: string,
    title: string,
    route: string,
    icon?: string,
    children?: AppModuleTab[]
}