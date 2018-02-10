"use strict"

class Task {
  constructor(text) {
    this.id = 1;
    this._text = text || '';
    this.erledigt = false;
    this._position = 0;
  }

  set position(value) {
    if (typeof value == 'number') {
      this._position = value;
      this.id = value;
    } else {
      console.warn('Es wurde ein nicht numerischer Typ der Position zugewiesen');
      //TODO: Abklären ob wir einen Fehler werfen können.
    }

  }

  get position() {
    return this._position;
  }


  get text() {
    return this._text;
  }

  /**
   * Aktualisere den Text
   * @param v
   */
  set text(v) {
    this._text = v;
  }

  /**
   * Markiert einen Task als erledigt
   */
  check() {
    this.erledigt = true;
    return true;
  }

  /**
   * Markiert einen Task als unerledigt
   */
  uncheck() {
    this.erledigt = false;
    return true;
  }
}

class TodoList {
  constructor() {
    this.tasks = [];
  }

  updateTaskText(index, text){
    this.tasks[index].text = text;
  }
  /**
   * Löschen eines Tasks
   * @param index
   */
  removeTask(index){
    this.tasks.splice(index,1);
  }

  /**
   * Füge einen Task hinzu
   * @param text Text des Tasks
   */
  addTask(text) {
    let neuerTask = new Task(text);

    if (this.tasks.length > 0) {
      let letzePosition = this.tasks[this.tasks.length - 1].position;
      neuerTask.position = ++letzePosition;
    }

    this.tasks.push(neuerTask);
    return neuerTask;
  }
}


// Machen wir nur für die Tests
if (typeof module !== 'undefined' && module) {
  module.exports.Task = Task;
  module.exports.TodoList = TodoList;
}