import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Customer } from './customer.model';
import { Stay } from './stay.model';
import { Duplicate } from './common/duplicate';
import { AppError } from './common/app-error';
import { ServerError } from './common/server-error';

@Injectable()
export class CustomerService {
  private apiUrl = 'http://213.248.166.144:7070/stay/lastReservations';
  private apiUrlCreate = 'http://213.248.166.144:7070/customer/createCustomer';
  private apiUrlGetCustomer =
    'http://213.248.166.144:7070/customer/getCustomerByTcNoEmail';
  private apiUrlSearch = 'http://213.248.166.144:7070/customer/search';
  private apiUrlCreateReservation =
    'http://213.248.166.144:7070/customer/createReservation';
  private apiUrlRoomTypes = 'http://213.248.166.144:7070/customer/roomsByType';
  private apiUrlRoomsByType =
    'http://213.248.166.144:7070/customer/roomsByType';
  private apiUrlCustomerReserv = 'http://213.248.166.144:7070';
  private apiUrlCustomerReservations =
    'http://213.248.166.144:7070/customer/reservations';

  constructor(private http: HttpClient) {}

  async searchCustomer(
    customerId: string,
    firstName: string,
    lastName: string
  ): Promise<any[]> {
    let params = new HttpParams();
    if (customerId) params = params.append('customerId', customerId);
    if (firstName) params = params.append('firstName', firstName);
    if (lastName) params = params.append('lastName', lastName);

    return this.http
      .get<any[]>(this.apiUrlSearch, { params })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            return throwError(() => new Duplicate());
          } else {
            return throwError(() => new AppError());
          }
        })
      )
      .toPromise()
      .then((response) => response || []);
  }

  getRoomTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrlRoomTypes).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          return throwError(() => new ServerError());
        } else {
          return throwError(() => new AppError());
        }
      })
    );
  }

  getRoomsByType(roomType: string): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('roomType', roomType);

    return this.http.get<any[]>(this.apiUrlRoomsByType, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          return throwError(() => new ServerError());
        } else {
          return throwError(() => new AppError());
        }
      })
    );
  }

  getCustomerReservations(customerId: string): Observable<Stay[]> {
    const params = new HttpParams().set('customerId', customerId);

    return this.http
      .get<Stay[]>(this.apiUrlCustomerReservations, { params })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 500) {
            return throwError(() => new ServerError());
          } else {
            return throwError(() => new AppError());
          }
        })
      );
  }

  createReservation(reservationData: any): Observable<Stay> {
    return this.http
      .post<Stay>(this.apiUrlCreateReservation, reservationData)
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



  createCustomer(customerData: any): Observable<string> {
    return this.http.post<string>(this.apiUrlCreate, customerData).pipe(
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
    if (tcNo) params = params.append('tcNo', tcNo);
    if (email) params = params.append('email', email);

    console.log(params.toString());

    return this.http
      .get<Customer>(this.apiUrlGetCustomer, { params })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            return throwError(() => new Duplicate());
          } else {
            return throwError(() => new AppError());
          }
        })
      )
      .toPromise();
  }

  async getAllStays(): Promise<Array<Stay>> {
    return new Promise((resolve, reject) => {
      let reservationlist: Array<Stay> = [];
      this.http.get(this.apiUrl).subscribe((response) => {
        if (!response) {
          reject();
        } else {
          const oneWeekInSeconds = 7 * 24 * 60 * 60 * 1000;
          const oneWeekAgo = new Date();
          oneWeekAgo.setTime(oneWeekAgo.getTime() - oneWeekInSeconds);

          Object.values(response).forEach((value) => {
            const reservationDate = new Date(value['dateArrival']);
            if (reservationDate.getTime() > oneWeekAgo.getTime()) {
              let reservation = new Stay(
                value['id'],
                value['customerId'],
                value['roomType'],
                value['room'],
                value['dateArrival'],
                value['dateDeparture'],
                value['notes'],
                value['source'],
                value['paymentAmount']
              );
              reservationlist.push(reservation);
            }
          });
          resolve(reservationlist);
        }
      });
    });
  }

  getTodaysCheckoutStays(): Observable<Stay[]> {
    const url = 'http://213.248.166.144:7070/stay/todaysCheckout';
    return this.http.get<Stay[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          return throwError(() => new ServerError(error));
        } else {
          return throwError(() => new AppError(error));
        }
      })
    );
  }

  getTodaysCheckinStays(): Observable<Stay[]> {
    const url = 'http://213.248.166.144:7070/stay/todaysCheckin';
    return this.http.get<Stay[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new AppError());
      })
    );
  }
}
