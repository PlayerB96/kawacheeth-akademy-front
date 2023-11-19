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

export interface PaymentData {
    cod_cuenta: string;
    usuario: string;
    actual_payment: ActualPayment;
    report_payments: ReportePayment[];
}

export interface ActualPayment {
    status_payment: number;
    state_payment: string;
    hitos: HitosPayment[];
}
export interface HitosPayment {
    codigo: string;
    titulo: string;
    fecha: string;
    status: boolean;
}

export interface ReportePayment {
    status_payment: number;
    state_payment: string;
    method_payment: string;
    date: string;
    pdf: string;

}
