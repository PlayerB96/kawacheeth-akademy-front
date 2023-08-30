export interface ResponseIdetailProfile {
    data: DetailProfile;
    message: string;
    status: boolean;
}

export interface PlanDescripcion {
    porcentaje_realizado: number;
    nombre_plan: string;
}

export interface DetailProfile {
    cod_cuenta: string;
    codigo_acceso: string;
    cursos_adquiridos: number;
    cursos_pendientes: number;
    cursos_terminados: number;
    estado_suscripcion: boolean;
    descripcion_plan: PlanDescripcion;
    historial: Historial[];

}

export interface Historial {
    icon: string;
    contenido: Contenido;
}

export interface Contenido {
    titulo: string;
    fecha: string;
}