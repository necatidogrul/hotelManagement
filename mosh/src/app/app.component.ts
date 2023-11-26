import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 


  courses: any;

  onAdd(){
    this.courses.push({ id: 4, name: 'course4'});
  }

  onChange(course: any){
    course.name='UPDATED';

  }

  loadCourses(){
    this.courses = [
      {id:1,name:'course1'},
      {id:2,name:'course2'},
      {id:3,name:'course3'},
    
    ]
  }

}
