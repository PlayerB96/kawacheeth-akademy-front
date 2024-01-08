export interface ResponseChangedDolar {
    data: ChangedDolarData;
    message: string;
    status: boolean;
}


export interface ChangedDolarData {
    compra: number;
    venta: number;
    origen: string;
    moneda: string;
    fecha: string;
}

export interface ResponsePayment {
    data: PaymentData;
    message: string;
    status: boolean;
}

export interface ResponseImage {
    data: string;
    message: string;
    status: boolean;
}

export interface PaymentData {
    id: number;
    status_payment: boolean;
    state_payment: string;
    hitos: HitosPayment[];
}

export interface ActualPayment {
    status_payment: number;
    state_payment: string;
    hitos: HitosPayment[];
}
export interface HitosPayment {
    id: number;
    code: string;
    name: string;
    date: string;
    status: boolean;
}

export interface Hitos {
    status_payment: number;
    state_payment: string;
    method_payment: string;
    date: string;
    pdf: string;

}
export interface ReportPayment {
    id: number;
    image: string;
    date_created: string;
    status: boolean;
    state: string;
    plan: string;
    monto_usd: string;
    user: number;
}
