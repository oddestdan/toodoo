import { Component } from '@angular/core';

import { TodosStoreService } from 'src/app/services/todos-store.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent {
  todoTitle = '';

  constructor(private todosStore: TodosStoreService) {}

  handleAddClick(): void {
    this.todosStore.add(this.todoTitle);
    this.todoTitle = '';
  }
}
