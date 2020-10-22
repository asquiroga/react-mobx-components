import { makeAutoObservable } from "mobx";

class ObservableTodoStore {
  counter = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get completedTodosCount() {
    return 2;
  }

  increment() {
    this.counter++;
  }
}

export default new ObservableTodoStore();
