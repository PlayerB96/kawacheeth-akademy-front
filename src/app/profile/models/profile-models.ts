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

export interface User {
  id: number;
  subscription_plan: {
    id: number;
    name: string;
  };
  user_history: UserHistory[];
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
  subscription_days: number;
  subscription_time: number;
}

export interface ResponseIdetailProfile {
  data: User;
  status: boolean;
  message: string;
}

export interface UserHistory {
  id: number;
  timestamp: string;
  title: string;
  description: string;
  user: number;
  code: string;
}
