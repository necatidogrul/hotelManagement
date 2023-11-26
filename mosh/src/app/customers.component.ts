import { Component } from "@angular/core";

@Component({
    selector:'customers',
    template:`<h1>{{getTitle()}}</h1>`
})
export class CustomersComponent{

    title="List of customers";

    getTitle(){
        return this.title
    }
}