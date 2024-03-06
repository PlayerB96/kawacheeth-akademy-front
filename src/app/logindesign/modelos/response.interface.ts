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
  operatorStatus: boolean;
  dashboardId: number;
  referred_state: boolean;


}