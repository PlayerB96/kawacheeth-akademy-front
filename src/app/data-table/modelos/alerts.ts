export class Alert {

  constructor(
    public descripcion: string,
    public estado:      number,
    public evento:      string,
    public id:          number,
    public placa:       string
    ) {}

  get fullplaca() {
    return `${ this.placa + "hola"}`
  }
}
