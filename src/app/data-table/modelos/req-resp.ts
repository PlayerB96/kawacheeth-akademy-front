import { Alert } from "./alerts";

export interface ReqResponse {
  data:    Alert[];
  message: string;
  status:  boolean;
}

interface AlertInt {
  descripcion: string;
  estado:      number;
  evento:      string;
  id:          number;
  placa:       string;
}
