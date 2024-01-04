export class Stay {
  customerId: number;
  roomType: string;
  room: string;
  dateArrival: string; 
  dateDeparture: string; 
  notes: string;
  source: string;
  paymentAmount: number;
  status: string;

  constructor(
    customerId: number,
    roomType: string,
    room: string,
    dateArrival: string,
    dateDeparture: string,
    notes: string,
    source: string,
    paymentAmount: number,
    status: string
  ) {
    this.customerId = customerId;
    this.roomType = roomType;
    this.room = room;
    this.dateArrival = dateArrival;
    this.dateDeparture = dateDeparture;
    this.notes = notes || '';
    this.source = source || '';
    this.paymentAmount = paymentAmount || 0;
    this.status = status || '';
  }
}
