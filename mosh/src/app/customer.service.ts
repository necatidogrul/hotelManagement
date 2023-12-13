import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { Customer } from "./customer.model";
import { Reservation } from "./reservation.model";
import { Duplicate } from "./common/duplicate";
import { AppError } from "./common/app-error";

@Injectable()
export class CustomerService{
    private apiUrl= 'http://213.248.166.144:7070/customer/lastReservations';
    private apiUrlCreate = 'http://213.248.166.144:7070/customer/createCustomer';
    private apiUrlGetCustomer = 'http://213.248.166.144:7070/customer/getCustomerByTcNoEmail';

  constructor(private http: HttpClient) {}

  createCustomer(customerData: any): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrlCreate, customerData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            return throwError(() => new Duplicate());
          } else {
            return throwError(() => new AppError());
          }
        })
      );
  }

  getCustomerByTcNoEmail(tcNo: string, email: string): Promise<any> {
    let params = new HttpParams();
    if (tcNo) params = params.append("tcNo", tcNo);
    if (email) params = params.append("email", email);

    console.log(params.toString());

    return this.http
      .get<Customer>(this.apiUrlGetCustomer, { params })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            return throwError(new Duplicate());
          } else {
            return throwError(new AppError());
          }
        })
      )
      .toPromise();
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

