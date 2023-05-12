class Compra {
  id: string;
  usu_id: string;
  date: Date;
  total: number;
  status: number;

  constructor(id: string, usu_id: string, date: Date, total: number, status: number) {
    this.id = id;
    this.usu_id = usu_id;
    this.date = date;
    this.total = total;
    this.status = status;
  }
}

export default Compra;
