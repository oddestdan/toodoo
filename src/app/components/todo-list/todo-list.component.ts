import { Component } from '@angular/core';

import ITodo from 'src/app/models/itodo';
import { TodosStoreService } from 'src/app/services/todos-store.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  // optimization to rerender only todos that change
  todosTrackFn = (i: string, todo: ITodo): string => todo.id;

  constructor(public todosStore: TodosStoreService) {}

  handleToggle(id: string, completed: boolean): void {
    this.todosStore.toggle(id, completed);
  }

  handleEdit(id: string, oldTodo: ITodo): void {
    this.todosStore.edit(id, oldTodo);
  }

  handleRemove(id: string): void {
    this.todosStore.remove(id);
  }
}
