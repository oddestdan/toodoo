export default interface ITodo {
  id: string;
  userId: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  deadlineAt: Date;
}
