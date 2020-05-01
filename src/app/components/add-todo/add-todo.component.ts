import { Component } from '@angular/core';

import { TodosStoreService } from 'src/app/services/todos-store.service';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent {
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
    this.addForm.reset();
    this.addForm.updateValueAndValidity();
  }
}
