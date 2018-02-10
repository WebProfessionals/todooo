var assert = require('chai').assert;
var expect = require('chai').expect;

var Task = require('./todo.js').Task;
var TodoList = require('./todo.js').TodoList;

describe('Todo', function () {
  describe('Task', function () {

    it('wir sollten ein Task Objekt erzeugen können', function () {
      let t = new Task;
      assert.instanceOf(t, Task);
    });

    it('wir sollten ein TodoList Objekt erzeugen können', function () {
      let t = new TodoList;
      assert.instanceOf(t, TodoList);
    });

    it('Todolist sollte ein Attribut tasks (array) mit Tasks haben', function () {
      let tl = new TodoList;
      assert.typeOf(tl.tasks, 'array');
    });

    it('Tasks sollten id,text,erledigt,position haben', function () {
      let t = new Task;
      expect(t.id).to.not.equal(undefined);
      expect(t.text).to.not.equal(undefined);
      expect(t.erledigt).to.not.equal(undefined);
      expect(t.position).to.not.equal(undefined);
    });

  });
});