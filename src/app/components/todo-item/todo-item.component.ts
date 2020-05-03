import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';

import ITodo from 'src/app/models/itodo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo: ITodo;
  @Output() toggle = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<ITodo>();
  @Output() remove = new EventEmitter<string>();

  @ViewChild('inputEl') private inputEl: ElementRef;

  oldTodo: ITodo; // backup Todo in case of server errors
  isEditing = false;

  handleCompletedChange(): void {
    this.toggle.emit(this.todo.completed);
  }

  handleEdit(): void {
    this.isEditing = true;
    this.oldTodo = { ...this.todo }; // save in case of server errors

    setTimeout(() => this.inputEl.nativeElement.focus());
  }

  submitEdit(): void {
    this.edit.emit(this.oldTodo);
    this.isEditing = false;
  }

  handleRemoveClick(): void {
    this.remove.emit(this.todo.id);
  }
}
