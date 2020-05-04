import { Component, OnInit } from '@angular/core';
import ITodo from 'src/app/models/ITodo';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements OnInit {
  query: '';
  testTodos: ITodo[];

  constructor() {}

  ngOnInit(): void {
    this.testTodos = [
      {
        id: '6',
        userId: 'userId 6',
        title: 'qwertys',
        completed: false,
      },
      {
        id: '8',
        userId: 'userId 8',
        title: 'title 8',
        completed: true,
      },
      {
        id: '21',
        userId: '0',
        title: 'test',
        completed: false,
      },
      {
        id: '24',
        userId: '0',
        title: 'asdarqds 1asdasd',
        completed: true,
      },
      {
        id: '29',
        userId: '0',
        title: 'reda',
        completed: false,
      },
      {
        id: '31',
        userId: '0',
        title: 'asdasd',
        completed: true,
      },
      {
        id: '33',
        userId: '0',
        title: 'some',
        completed: false,
      },
      {
        id: '34',
        userId: '0',
        title: 'hambyrger',
        completed: false,
      },
    ];
  }
}
