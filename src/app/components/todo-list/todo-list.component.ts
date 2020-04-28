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
  todosTrackFn = (i: string, todo: ITodo) => todo.id;

  constructor(public todosStore: TodosStoreService) {}

  testLog() {
    console.log(this.todosStore.todos);
  }

  handleToggle(id: string, completed: boolean) {
    this.todosStore.toggle(id, completed);
  }

  handleRemove(id: string) {
    this.todosStore.remove(id);
  }
}
