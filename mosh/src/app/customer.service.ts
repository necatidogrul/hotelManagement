import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Customer } from "./customer.model";
import { Reservation } from "./reservation.model";

@Injectable()
export class CustomerService{
    private apiUrl= 'http://213.248.166.144:7070/customer/lastReservations';
    private apiUrlCreate = 'http://213.248.166.144:7070/customer/createCustomer';

  constructor(private http: HttpClient) {}

  createCustomer(customerData: any): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrlCreate, customerData);
  }

    async getAllReservations(): Promise<Array<Reservation>> {
        return new Promise((resolve, reject) => {
          let reservationlist: Array<Reservation> = [];
          this.http.get(this.apiUrl)
          .subscribe(response => {
            if (!response) {
              reject();
            } else {
              const oneWeekInSeconds = 7 * 24 * 60 * 60 * 1000
              const oneWeekAgo = new Date();
              oneWeekAgo.setTime(oneWeekAgo.getTime() - oneWeekInSeconds);
    
              Object.values(response)
                .forEach((value) => {
                  const reservationDate = new Date(value['dateArrival']);
                  if (reservationDate.getTime() > oneWeekAgo.getTime()) {
                    let reservation = new Reservation(
                      value['id'],
                      value['customerId'],
                      value['roomType'],
                      value['room'],
                      value['dateArrival'],
                      value['dateDeparture'],
                      value['notes'],
                      value['source'],
                      value['paymentAmount'],
                      value['dateUpdated'],
                      value['status'],
                      value['customer']
                    );
                    reservationlist.push(reservation);
                    
                  }
                });
              resolve(reservationlist);
            }
          });
      });
    }  
}

