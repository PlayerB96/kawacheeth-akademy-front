// Define el modelo para el objeto "file"
export interface File {
    type: string;
    nameFile: string;
}

// Define el modelo para el objeto dentro de la lista "data"
export interface DataItem {
    usuario: string;
    status_validation: boolean;
    nivel: string;
    code_activity: string;
    fecha: string;
    fecha_utc: string;
    file: File[];
}

// Define el modelo para la respuesta completa
export interface ResponseValidation {
    data: DataItem[];
    status: boolean;
    message: string;
}

// report.interface.ts
export interface ReportValidation {
    id: number;
    image: string;
    date_created: string;
    level: string;
    name: string;
    state: boolean;
    user: User;
}

export interface ReportPaymentValidation {
    id: number;
    image: string;
    date_created: string;
    status: boolean;
    state: string;
    plan: string;
    monto_usd: string;
    user: User;
}


export interface User {
    id: number;
    subscription_plan: {
        id: number;
        name: string;
    };
    user_history: any[]; // Puedes ajustar esto según la estructura real
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

