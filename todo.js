"use strict"

class Task {
  constructor(text) {
    this.id = 1;
    this._text = text || '';
    this.erledigt = false;
    this._position = 0;
  }

  set position(value){
    if(typeof value == 'number'){
      this._position = value;
    }else{
      console.warn('Es wurde ein nicht numerischer Typ der Position zugewiesen');
      //TODO: Abklären ob wir einen Fehler werfen können.
    }

  }
  get position(){
    return this._position;
  }


  get text(){
    return this._text;
  }

  /**
   * Aktualisere den Text
   * @param v
   */
  set text(v){
    console.log('Danke für die Eingabe, Datenbank wird aktualisirt',v);

    this._text = v;
  }
  /**
   * Markiert einen Task als erledigt
   */
  check(){
    this.erledigt = true;
    return true;
  }

  /**
   * Markiert einen Task als unerledigt
   */
  uncheck(){
    this.erledigt = false;
    return true;
  }
}

class TodoList {
  constructor() {
    this.tasks = [];
  }

  addTask(text){
    this.tasks.push(new Task(text));
  }
}


// Machen wir nur für die Tests
if (typeof module !== 'undefined' && module) {
  module.exports.Task = Task;
  module.exports.TodoList = TodoList;
}