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