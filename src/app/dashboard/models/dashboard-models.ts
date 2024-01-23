export interface ResponseI {
    data: DataI;
    message: string;
    status: boolean;
}

export interface DataI {
    id: number;
    username: string;
    dni: string;
    email: string;
    rol: string;
    name: string;
    lastname: string;
    access_token: string;
    operatorId: string;
    operatorKey: string;
    dashboardId: number;
}

export interface PlanDescripcion {
    porcentaje_realizado: string;
    nombre_plan: string;
}

export interface Usuario {
    cod_cuenta: string;
    codigo_acceso: string;
    cursos_adquiridos: number;
    cursos_pendientes: number;
    cursos_terminados: number;
    estado_suscripcion: boolean;
    descripcion_plan: PlanDescripcion;
}

export interface ResponseIdetailProfile {
    data: Usuario;
    status: boolean;
    message: string;
}
