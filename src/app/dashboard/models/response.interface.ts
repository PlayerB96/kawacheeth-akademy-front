export interface ResponseIdetailDashboard {
    data: DetailDashboard;
    message: string;
    status: boolean;
}

export interface BalanceResponse {
    mensaje: string;
    balanceHbars: number;
    balanceDollars: number;
    balanceCtokens: string; // Puedes dejar este campo como string si es un identificador o valor que debe ser una cadena
}

export interface AsociateResponse {
    mensaje: string;
    recibido: any;
    status: number;
}

export interface ValidationResponse {
    message: string;
}

export interface DetailStatusResponse {
    id: number;
    operatorKey: string;
    operatorId: string; // Puedes dejar este campo como string si es un identificador o valor que debe ser una cadena
    status: boolean;
    user: string; // Puedes dejar este campo como string si es un identificador o valor que debe ser una cadena
}


export interface PlanDescripcion {
    cursos: number;
    estado_cursos: EstadoCursos;
}

export interface EstadoCursos {
    activos: number;
    completados: number;
    poriniciar: number;

}

export interface Cursos {
    icono: string;
    name: string;
    estado: string;
    descripcion: string;
    fecha_actualizacion: string;
    duracion: string;
    progreso: number;
    plataformas: Plataformas[];

}

export interface Plataformas {
    icon: string;
    nombre: string;


}

export interface DetailDashboard {
    cod_cuenta: string;
    tokens: number;
    interes: number;
    estado: boolean;
    detalle: PlanDescripcion;
    lista_cursos: Cursos[];

}
// ------------------------ALL USER DASHBOARD-----------------------------

export interface ResponseIallUsersDashboard {
    data: DataI;
    message: string;
    status: boolean;
}

export interface DataI {
    last_9_users: Last9User[];
    total_users: number;

}

export interface Last9User {
    estado: boolean;
    cod_cuenta: string;
    cod_acceso: string;
    contrasena: string;
    usuario: string;
    dni: string;
    correo: string;
    rol: string;
    nombres: string;
    apellidos: string;

}
