import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';

import Todo from 'src/app/models/todo.model';
import ITodo from 'src/app/models/itodo';
import { TodosService } from 'src/app/services/todos.service';

@Injectable({
  providedIn: 'root',
})
export class TodosStoreService {
  private readonly _todos = new BehaviorSubject<ITodo[]>([]);

  // readonly todos$ = this._todos.asObservable();
  readonly todos$ = this._todos;
  // readonly todos$: Observable<ITodo[]> = this._todos;

  get todos(): ITodo[] {
    return this._todos.getValue();
  }
  set todos(todos: ITodo[]) {
    this._todos.next(todos);
  }

  constructor(private todosService: TodosService) {
    this.fetchAll();
  }

  fetchAll() {
    this.todosService.getAll().subscribe((data) => {
      this.todos = data;
    });
  }

  // Optimistic CRUD actions on UI side:
  // - If user tries to add, delete, ... a Todo, they should
  // immediately see the result, while server processes the query.
  // - And if server's response has an error, we reroll UI state back

  add(title: string) {
    // optimistically update UI-side state
    const optimisticTodo = new Todo(title);
    this.todos = [...this.todos, optimisticTodo];

    // send request to the server
    this.todosService.create(optimisticTodo).subscribe(
      // sync UI and BE state
      (todo: ITodo) => {
        const index = this.todos.indexOf(
          this.todos.find((t) => t.id === optimisticTodo.id)
        );

        this.todos[index] = todo;
      },
      // revert the changes if BE returns an error
      (error) => {
        console.error(error);
        this.remove(optimisticTodo.id, false);
      }
    );
  }

  remove(id: string, serverRemove = true) {
    const todo = this.todos.find((t) => t.id === id);
    this.todos = this.todos.filter((t) => t.id !== id);

    if (serverRemove) {
      this.todosService.remove(id).subscribe(
        () => {},
        (error) => {
          console.error(error);
          this.todos = [...this.todos, todo];
        }
      );
    }
  }

  toggle(id: string, completed: boolean) {
    const todo = this.todos.find((t) => t.id === id);

    if (todo) {
      this.todosService.toggle(id, completed).subscribe(
        () => {},
        (error) => {
          console.error(error);
          todo.completed = !todo.completed;
        }
      );
    }
  }
}
