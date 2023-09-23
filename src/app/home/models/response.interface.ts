// app.model.ts

export interface Actualizacion {
    titulo: string;
    meta: {
      estudiantes_actuales?: number;
      estudiantes_totales?: number;
      tokens_actuales?: number;
      tokens_totales?: number;
      dias_actuales?: number;
      dias_totales?: number;
    };
    descripcion: string;
  }
  
  export interface Curso {
    icono: string;
    name: string;
    estado: string;
    fecha_actualizacion: string;
    duracion: number;
    descripcion: string;
    progreso: number;
    precio: number;
  }
  
  export interface ResponseIdetailHome {
    _id: {
      $oid: string;
    };
    lista_actualizaciones: Actualizacion[];
    lista_cursos: Curso[];
  }
  