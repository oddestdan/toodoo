import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';

import Todo from 'src/app/models/todo.model';
import ITodo from 'src/app/models/ITodo';
import { TodosService } from 'src/app/services/todos.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class TodosStoreService {
  // Create private stream source (can act both as Observable and Observer)
  private readonly _todos = new BehaviorSubject<ITodo[]>([]);

  // Provide public sequence that references private subject,
  // but prevent it from leaking the "observer side" of the subject.
  // https://stackoverflow.com/questions/36986548/when-to-use-asobservable-in-rxjs
  readonly todos$ = this._todos.asObservable();

  public filter = '';
  public searchQuery = '';

  get todos(): ITodo[] {
    return this._todos.getValue();
  }
  set todos(todos: ITodo[]) {
    this._todos.next(todos);
  }

  constructor(
    private todosService: TodosService,
    private notifier: NotificationService
  ) {
    this.fetchAll();
  }

  fetchAll(): void {
    this.todosService.getAll().subscribe((data) => {
      this.todos = data;
    });
  }

  getFilteredTodos(): Observable<ITodo[]> {
    let filteredTodos$: Observable<ITodo[]>;
    const currentDate = new Date();

    switch (this.filter) {
      case 'COMPLETED':
        filteredTodos$ = this.todos$.pipe(
          map((todos) => todos.filter((todo) => todo.completed))
        );
        break;

      case 'IN_PROGRESS':
        filteredTodos$ = this.todos$.pipe(
          map((todos) => todos.filter((todo) => !todo.completed))
        );
        break;

      case 'OVERDUE':
        filteredTodos$ = this.todos$.pipe(
          map((todos) =>
            todos.filter((todo) => new Date(todo.deadlineAt) <= currentDate)
          )
        );
        break;

      case 'UPCOMING':
        filteredTodos$ = this.todos$.pipe(
          map((todos) =>
            todos.filter((todo) => new Date(todo.deadlineAt) > currentDate)
          )
        );
        break;

      default:
        filteredTodos$ = this.todos$;
        break;
    }
    return filteredTodos$;
  }

  // Optimistic CRUD actions on UI side:
  // - If user tries to add, delete, ... a Todo, they should
  // immediately see the result, while server processes the query.
  // - And if server's response has an error, we reroll UI state back

  add({ title, deadline }: { title: string; deadline: Date }): void {
    // optimistically update UI-side state
    const optimisticTodo = new Todo(title, deadline);
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
        this.notifier.alert(`Error: ${error.message}`);
        setTimeout(() => this.remove(optimisticTodo.id, false));
      }
    );
  }

  remove(id: string, serverRemove = true): void {
    const todo = this.todos.find((t) => t.id === id);
    const todoIndex = this.todos.findIndex((t) => t.id === id);
    this.todos = this.todos.filter((t) => t.id !== id);

    // Prompt user if undo is necessary
    const mode = { undo: false };
    const msDuration = 3000;
    const revertCb = () => {
      mode.undo = true;
      this.todos.splice(todoIndex, 0, todo); // insert removed todo back
    };
    this.notifier.undoAlert(mode, revertCb, 'Removed Todo.', msDuration);

    // If not undoing, send server request after alert duration
    setTimeout(() => {
      if (serverRemove && !mode.undo) {
        this.todosService.remove(id).subscribe(
          () => {},
          (error) => {
            this.notifier.alert(`Error: ${error.message}`);
            setTimeout(revertCb);
          }
        );
      }
    }, msDuration);
  }

  edit(id: string, oldTodo: ITodo): void {
    const todoIndex = this.todos.findIndex((t) => t.id === id);
    const editedTodo = this.todos[todoIndex];

    // Prompt user if undo is necessary
    const mode = { undo: false };
    const msDuration = 3000;
    const revertCb = () => {
      mode.undo = true;
      this.todos[todoIndex] = oldTodo;
    };
    this.notifier.undoAlert(mode, revertCb, 'Edited Todo.', msDuration);

    // If not undoing, send server request after alert duration
    setTimeout(() => {
      if (!mode.undo) {
        this.todosService.edit(id, editedTodo).subscribe(
          () => {},
          (error) => {
            this.notifier.alert(`Error: ${error.message}`);
            setTimeout(revertCb);
          }
        );
      }
    }, msDuration);
  }

  toggle(id: string, completed: boolean): void {
    const todo = this.todos.find((t) => t.id === id);

    if (todo) {
      this.todosService.toggle(id, completed).subscribe(
        () => {},
        (error) => {
          this.notifier.alert(`Error: ${error.message}`);
          setTimeout(() => (todo.completed = !todo.completed));
        }
      );
    }
  }
}
