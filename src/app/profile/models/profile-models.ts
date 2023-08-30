export interface ResponseI {
  data: DataI;
  message: string;
  status: boolean;
}

export interface DataI {
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
  historial: Historial[];

}

export interface ResponseIdetailProfile {
  data: Usuario;
  status: boolean;
  message: string;
}

export interface Historial {
  icon: string;
  contenido: Contenido;
}

export interface Contenido {
  titulo: string;
  fecha: string;
}