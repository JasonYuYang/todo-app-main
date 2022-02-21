class Todo {
  task: string;
  id: string;
  complete: boolean;
  constructor(task: string) {
    this.task = task;
    this.id = new Date().getTime().toString();
    this.complete = false;
  }
}

export default Todo;
