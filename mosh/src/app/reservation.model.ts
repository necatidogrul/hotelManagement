import { Customer } from "./customer.model";

export class Reservation {
    id: number;
    customerId: number;
    roomType: string;
    room: string;
    dateArrival: string;
    dateDeparture: string;
    notes: string;
    source: string;
    paymentAmount: number;
    dateUpdated: string;
    status: string;
    customer: Customer; 
  
    constructor(id:number,customerId:number,roomType:string,room:string,dateArrival:string,dateDeparture:string,notes:string,source:string,paymentAmount:number,dateUpdated:string,status:string,customer:Customer) {
      this.id = id;
      this.customerId = customerId;
      this.roomType = roomType;
      this.room = room || '';
      this.dateArrival = dateArrival || '';
      this.dateDeparture =dateDeparture || '';
      this.notes = notes || '';
      this.source = source || '';
      this.paymentAmount = paymentAmount || 0;
      this.dateUpdated = dateUpdated || '';
      this.status = status || '';
      this.customer = new Customer(customer); 
    }
  }
  