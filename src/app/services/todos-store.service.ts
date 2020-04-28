import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';

import Todo from 'src/app/models/todo.model';
import ITodo from 'src/app/models/itodo';
import { TodosService } from 'src/app/services/todos.service';

@Injectable({
  providedIn: 'root',
})
export class TodosStoreService {
  private readonly _todos = new BehaviorSubject<ITodo[]>([]);

  readonly todos$ = this._todos.asObservable();

  get todos(): ITodo[] {
    return this._todos.getValue();
  }
  set todos(todos: ITodo[]) {
    this._todos.next(todos);
  }

  constructor(private todosService: TodosService) {
    this.fetchAll();
  }

  async fetchAll() {
    this.todos = await this.todosService.getAll().toPromise();
  }

  async add(title: string) {
    const optimisticTodo = new Todo(title);
    this.todos = [...this.todos, optimisticTodo];

    try {
      const todo = await this.todosService.create(optimisticTodo).toPromise();

      const index = this.todos.indexOf(
        this.todos.find((t) => t.id === optimisticTodo.id)
      );

      this.todos[index] = todo;
    } catch (e) {
      // if server returns an error -> revert the changes
      console.error(e);
      this.remove(optimisticTodo.id, false);
    }
  }

  async remove(id: string, serverRemove = true) {
    const todo = this.todos.find((t) => t.id === id);
    this.todos = this.todos.filter((t) => t.id !== id);

    if (serverRemove) {
      try {
        await this.todosService.remove(id).toPromise();
      } catch (e) {
        // if server returns an error -> revert the changes
        console.error(e);
        this.todos = [...this.todos, todo];
      }
    }
  }

  async toggle(id: string, completed: boolean) {
    const todo = this.todos.find((t) => t.id === id);

    if (todo) {
      try {
        await this.todosService.toggle(id, completed).toPromise();
      } catch (e) {
        // if server returns an error -> revert the changes
        console.error(e);
        todo.completed = !todo.completed;
      }
    }
  }
}
