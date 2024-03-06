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
  estado: string;
  id: number;
  progreso: number;
  user: string;
  detail_course: DetailCourse;

}
export interface DetailCourse {
  icono: string;
  name: string;
  descripcion: string;
  fecha_actualizacion: string;
  duracion: string;
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
  data: User[];
  message: string;
  status: boolean;
}

export interface User {
  id: number;
  subscription_plan: SubscriptionPlan;
  user_history: any[]; // Puedes ajustar este tipo según la estructura real de los datos
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
  subscription_time: number;
  subscription_days: number;
  referred_state: boolean;
  user_courses: Cursos[];
}

export interface Cursos {
  estado: string;
  id: number;
  progreso: number;
  user: string;
  detail_course: DetailCourse;

}
export interface DetailCourse {
  icono: string;
  name: string;
  descripcion: string;
  fecha_actualizacion: string;
  duracion: string;
  plataformas: Plataformas[];

}

export interface SubscriptionPlan {
  id: number;
  name: string;
}
