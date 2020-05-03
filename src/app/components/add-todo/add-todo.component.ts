import { Component, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder, NgForm } from '@angular/forms';

import { TodosStoreService } from 'src/app/services/todos-store.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent {
  @ViewChild('formDir') private formDir: NgForm;
  @ViewChild('inputEl') private inputEl: ElementRef;

  addForm = this.fb.group({
    title: ['', [Validators.maxLength(100), Validators.required]],
  });

  constructor(private todosStore: TodosStoreService, private fb: FormBuilder) {}

  onSubmit(): void {
    const title = this.addForm.get('title').value;
    this.todosStore.add(title);

    this.resetForm();
  }

  resetForm(): void {
    this.inputEl.nativeElement.blur();
    this.formDir.resetForm();

    this.addForm.reset();
    this.addForm.updateValueAndValidity();

    this.debugFormState();
  }

  // for debugging purposes only
  debugFormState(): void {
    console.log('FORM STATE...');
    console.log('errors', this.addForm.errors);
    console.log('valid', this.addForm.valid);
    console.log('pristine', this.addForm.pristine);
    console.log('touched', this.addForm.touched);
    console.log('dirty', this.addForm.dirty);
  }
}
