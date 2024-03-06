export interface ResponseProgressProfile {
  data: ListActivities[];
  message: string;
  status: boolean;
}

export interface PlanDescripcion {
  porcentaje_realizado: number;
  nombre_plan: string;
}

export interface DetailProfile {
  id: number;
  subscription_plan: {
    id: number;
    name: string;
  };
  user: string;
  password: string;
  percentage_completed: number;
  email: string;
  lastname: string;
  name: string;
  dni: string;
  rol: string;
  state: boolean;
  courses_acquired: number;
  courses_pending: number;
  courses_completed: number;
  subscription_state: boolean;

}

export interface ListActivities {
  id: number;
  title: string;
  ctokens: string;
  status: boolean;
  detail_status: string;
  level: number;
  progress: number;
  description: string;
  user: number;
  hitos: Hitos[];
}

export interface Hitos {
  id: number;
  name: string;
  code: string;
  status: boolean;
  completed: boolean;
}

export interface Historial {
  icon: string;
  contenido: Contenido;
}

export interface Contenido {
  titulo: string;
  fecha: string;
}
