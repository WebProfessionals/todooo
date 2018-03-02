"use strict";

class Task {
  /**
   * Ein einzelner Task, per default unerledigt.
   *
   * @param text {String} Optionaler Text des Tasks
   */
  constructor(text) {
    this.id = 1;
    this._text = text || '';
    this.erledigt = false;
    this._position = 1;

  }

  /**
   * Setze die Priorität (float)
   * @param value {number} Default ist 1
   */
  set position(value) {
    if (typeof value === 'number') {
      this._position = value;
      TodoList.onUpdatePosition(this);
    } else {
      console.warn('Es wurde ein nicht numerischer Typ der Position zugewiesen');
      //TODO: Abklären ob wir einen Fehler werfen können.
    }

  }

  /**
   * Gibt die Priorität / Position aus
   * @returns {number}
   */
  get position() {
    return this._position;
  }

  /**
   * Text des Tasks
   * @returns {String}
   */
  get text() {
    return this._text;
  }

  /**
   * Aktualisere den Text
   * @param v {String}
   */
  set text(v) {

    this._text = v;
    TodoList.onUpdateTask(this);
  }

  /**
   * Markiert einen Task als erledigt
   * */
  check() {

    this.erledigt = true;
    TodoList.onUpdateTask(this);
    return true;
  }

  /**
     * Markiert einen Task als unerledigt
   */
  uncheck() {

    this.erledigt = false;
    TodoList.onUpdateTask(this);
    return true;
  }
}

class TodoList {
  constructor() {
    this.tasks = [];
    this._maxID = 1;
    this.onInit(this);
  }

  /**
   * Verschiebt einen Task vor einen anderen Task
   * @param quellIndex
   * @param zielIndex
   */
  moveBefore(quellIndex, zielIndex) {
    let p1 = 0;

    if (zielIndex > 0) {
      p1 = this.tasks[zielIndex - 1].position;
    }

    let p2 = this.tasks[zielIndex].position;

    let neuePosition = (p1 + p2) / 2;
    this.tasks[quellIndex].position = neuePosition;

    this.tasks.sort(((a, b) => a.position - b.position));

  }

  /**
   * Einen Task aus der Liste als erledigt markieren
   * @param index
   */
  uncheckTask(index) {
    this.tasks[index].uncheck();
  }


  /**
   * Einen Task aus der Liste als erledigt markieren
   * @param index
   */
  checkTask(index) {
    this.tasks[index].check();
  }

  /**
   * Aktualisere einen Task
   * @param index
   * @param text
   */
  updateTaskText(index, text) {
    this.tasks[index].text = text;
  }

  /**
   * Löschen eines Tasks
   * @param index
   */
  removeTask(index) {
    if (index > -1) {
      this.onDeleteTask(this.tasks[index]);
      this.tasks.splice(index, 1);
    }

  }

  /**
   * Entfernt einen Task mit seiner ID
   * @param taskID
   */
  removeTaskByID(taskID) {
    let finder = (task) => {
      return task.id === taskID;
    };

    let index = this.tasks.findIndex(finder);
    this.removeTask(index);
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
      neuerTask.id = ++this._maxID;
    }

    let exterErstellterTask = this.onNewTask(neuerTask);

    if ( exterErstellterTask != false) {
      this.tasks.push(exterErstellterTask);
      return exterErstellterTask;
    }
    return false;

  }


  /**
   * Event / Callback der beim Anlegen eines neuen Tasks ausgeführt wird.
   *
   * @param task
   * @returns {boolean} True wenn alles geklappt hat, False bei Fehlern
   */
  onNewTask(task) {

    return task;
  }

  // beim init aufgerufener callback
  onInit(){
    return true
  }

  /**
   * Callback beim löschen eines Tasks
   * @param task
   * @returns {boolean}
   */
  onDeleteTask(task){
    return true;
  }

  /**
   *
   * @param task
   * @returns {boolean}
   */
  static onUpdateTask(task) {
    return true;
  }

  /**
   * Callback der aufgerufen wird wenn die Position eines Tasks geändert wurde
   * @param task
   * @returns {boolean}
   */
  static onUpdatePosition(task) {
    return true;
  }
}


// Machen wir nur für die Tests
if (typeof module !== 'undefined' && module) {
  module.exports.Task = Task;
  module.exports.TodoList = TodoList;
}