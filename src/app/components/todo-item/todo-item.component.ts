import { Component, EventEmitter, Input, Output } from '@angular/core';

import ITodo from 'src/app/models/itodo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo: ITodo;
  @Output() toggle = new EventEmitter<boolean>();
  @Output() remove = new EventEmitter<string>();

  handleCompletedChange() {
    this.toggle.emit(this.todo.completed);
  }

  handleRemoveClick() {
    this.remove.emit(this.todo.id);
  }
}
