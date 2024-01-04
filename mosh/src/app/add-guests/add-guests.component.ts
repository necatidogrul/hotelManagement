import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-guests',
  templateUrl: './add-guests.component.html',
  styleUrls: ['./add-guests.component.css'],
})
export class AddGuestsComponent {
  form = new FormGroup({
    topics: new FormArray([]),
  });

  addTopic(topic: HTMLInputElement) {
    (this.form.get('topics') as FormArray).push(new FormControl(topic.value));
    topic.value = '';
  }

  get topics(): FormArray {
    return this.form.get('topics') as FormArray;
  }

  removeTopic(topicIndex: number) {
    this.topics.removeAt(topicIndex);
  }
}
