import ITodo from './ITodo';

export default class Todo implements ITodo {
  id: string;
  userId: string;
  title: string;
  completed: boolean;

  constructor(
    title: string = '',
    id: string = '0',
    userId: string = '0',
    completed: boolean = false
  ) {
    this.title = title;
    this.id = id;
    this.userId = userId;
    this.completed = completed;
  }
}
