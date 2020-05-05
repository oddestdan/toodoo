import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Validators, FormBuilder, NgForm } from '@angular/forms';

import { TodosStoreService } from 'src/app/services/todos-store.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  @ViewChild('formDir') private formDir: NgForm;
  @ViewChild('inputEl') private inputEl: ElementRef;

  minDate: Date;

  addForm = this.fb.group({
    title: ['', [Validators.maxLength(100), Validators.required]],
    deadline: [this.minDate, [Validators.required]],
  });

  constructor(private todosStore: TodosStoreService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.minDate = new Date();
  }

  onSubmit(): void {
    this.todosStore.add(this.addForm.value); // { title, deadline }

    this.resetForm();
  }

  resetForm(): void {
    this.inputEl.nativeElement.blur();
    this.formDir.resetForm();

    this.addForm.reset();
    this.addForm.updateValueAndValidity();

    // this.debugFormState();
  }

  // // For debugging purposes only
  // debugFormState(): void {
  //   console.log('FORM STATE...');
  //   console.log('errors', this.addForm.errors);
  //   console.log('valid', this.addForm.valid);
  //   console.log('pristine', this.addForm.pristine);
  //   console.log('touched', this.addForm.touched);
  //   console.log('dirty', this.addForm.dirty);
  // }
}
