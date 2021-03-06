import ITodo from './ITodo';

export default class Todo implements ITodo {
  constructor(
    public title: string,
    public deadlineAt: Date,
    public createdAt: Date = new Date(),
    public id: string = '0',
    public userId: string = '0',
    public completed: boolean = false
  ) {}
}
