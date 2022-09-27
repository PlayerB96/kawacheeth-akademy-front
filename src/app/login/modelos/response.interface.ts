export interface ResponseI {
  data: DataI;
  message: string;
  status: boolean;
}

export interface DataI {
  state: boolean;
  token: string;
}
