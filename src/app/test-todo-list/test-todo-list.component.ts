import { Component, OnInit } from '@angular/core';

import { TodosService } from 'src/app/services/todos.service';
import ITodo from 'src/app/models/ITodo';

@Component({
  selector: 'app-test-todo-list',
  templateUrl: './test-todo-list.component.html',
  styleUrls: ['./test-todo-list.component.scss'],
})
export class TestTodoListComponent implements OnInit {
  todoList: Array<ITodo>;

  constructor(private todoService: TodosService) {
    this.todoService.getTodos().subscribe((data) => {
      this.todoList = data;
    });
  }

  ngOnInit(): void {}
}
