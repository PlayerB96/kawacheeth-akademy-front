export interface ResponseI {
  data: DataI;
  message: string;
  status: boolean;
}

export interface DataI {
  id: number;
  estado: boolean;
  cod_cuenta: string;
  cod_accesoS: string;
  contrasena: string;
  usuario: string;
  dni: string;
  correo: string;
  rol: string;
  nombres: string;
  apellidos: string;

}

// user.model.ts

export interface User {
  id: number;
  subscription_plan: SubscriptionPlan;
  user_history: any[]; // Puedes reemplazar 'any' con el tipo de datos correcto si es posible.
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

export interface SubscriptionPlan {
  id: number;
  name: string;
}

