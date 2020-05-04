import { Component } from '@angular/core';

import ITodo from 'src/app/models/ITodo';
import { TodosStoreService } from 'src/app/services/todos-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  // optimization to rerender only todos that change
  // todosTrackFn = (i: string, todo: ITodo): string => todo.id;

  get filteredTodos(): Observable<ITodo[]> {
    return this.todosStore.getFilteredTodos();
  }
  get query(): string {
    return this.todosStore.searchQuery;
  }

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
