import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';

import ITodo from 'src/app/models/ITodo';
import { NotificationService } from 'src/app/services/notification.service';

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

  constructor(private notificationService: NotificationService) {}

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
    this.isEditing = false;
    this.edit.emit(this.oldTodo);
    this.alertNotify('Edited todo');
  }

  handleRemoveClick(): void {
    this.remove.emit(this.todo.id);
    this.alertNotify('Removed todo');
  }

  alertNotify(message: string, duration = 2000): void {
    this.notificationService.open(message, duration);
  }
}
