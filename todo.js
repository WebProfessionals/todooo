"use strict"

class Task {
  constructor() {
    this.id = 1;
    this.text = '';
    this.erledigt = false;
    this.position = 0;

  }

}

class TodoList {
  constructor() {
    this.tasks = [];
  }

}


if (typeof module !== 'undefined' && module) {
  module.exports.Task = Task;
  module.exports.TodoList = TodoList;
}