import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

class Post {
    userId : number;
    id : number;
    title: string;
    body: string;

    constructor(userId: number, id:number, title:string, body:string){
        this.userId= userId;
        this.id=id;
        this.title=title;
        this.body=body;
    }

}

class Todo {
    userId: number;
    id:number;
    title: string;
    completed: boolean;

    constructor(userId: number, id:number, title: string, completed: boolean){
        this.userId =userId;
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
}

// customer.model.ts

export class Customer {
    id: number;
    tcNo: string;
    passportNo: string;
    nationality: string;
    firstName: string;
    lastName: string;
    middleName: string;
    streetAddress: string;
    city: string;
    country: string;
    email: string;
    phone: string;
    notes: string;
    stayList: any[];
  
    constructor(data: any) {
      this.id = data.id;
      this.tcNo = data.tcNo || '';
      this.passportNo = data.passportNo || '';
      this.nationality = data.nationality || '';
      this.firstName = data.firstName || '';
      this.lastName = data.lastName || '';
      this.middleName = data.middleName || '';
      this.streetAddress = data.streetAddress || '';
      this.city = data.city || '';
      this.country = data.country || '';
      this.email = data.email || '';
      this.phone = data.phone || '';
      this.notes = data.notes || '';
      this.stayList = data.stayList || [];
    }
  }

  // reservation.model.ts

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
  
  


@Injectable()
export class CustomerService{
    private apiUrl= 'http://213.248.166.144:7070/customer/lastReservations';
    constructor(private http: HttpClient){

    }

    async getAllPosts(): Promise<Array<Post>>{
        return new Promise((resolve, reject)=>{
            let clist: Array<Post> = []
            this.http.get('https://jsonplaceholder.typicode.com/posts')
            .subscribe(response=>{
                if(!response){
                    reject();
                }else{
                    Object.values(response).forEach((value)=> {
                        let post = new Post(value['userId'],
                                            value['id'],
                                            value['title'],
                                            value['body'])
                        clist.push(post);
                    })
                    resolve(clist)
                }
            })
        })
    }

    async getAllTodos(): Promise<Array<Todo>>{
        return new Promise((resolve,reject)=>{
            let todolist: Array<Todo> = [];
            this.http.get('https://jsonplaceholder.typicode.com/todos')
            .subscribe(response => {
                if(!response){
                    reject();
                }else{
                    Object.values(response).forEach((value)=> {
                        let todo = new Todo(value['userId'],
                                            value['id'],
                                            value['title'],
                                            value['completed'])
                            todolist.push(todo)
                    })
                    resolve(todolist)
                }
            })
        })
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