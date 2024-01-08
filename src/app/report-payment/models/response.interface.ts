// Define el modelo para el objeto "file"
export interface File {
    type: string;
    nameFile: string;
}

// Define el modelo para el objeto dentro de la lista "data"
export interface DataItem {
    id: number;
    name: string;
    code: string;
    status: boolean;

}

// Define el modelo para la respuesta completa
export interface ResponseReport {
    data: DataItem[];
    status: boolean;
    message: string;
}
