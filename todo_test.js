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

    it('Sollte einen Task direkt mit Text erzeugen können', function () {
      let t = new Task("Textbeispiel");
      expect(t.text).equal("Textbeispiel");
    });

    it('Sollte einen Task als erledigt markieren können', function () {
      let t = new Task("Textbeispiel");
      t.check();
      expect(t.erledigt).equal(true);
    });

    it('Sollte einen Task als NICHT erledigt markieren können', function () {
      let t = new Task("Textbeispiel");
      t.uncheck();
      expect(t.erledigt).equal(false);
      t.check();
      t.uncheck();
      expect(t.erledigt).equal(false);
    });

    it('sollte den Text aktualisieren können', function () {
      let t = new Task("Textbeispiel");
      t.text = "**";
      expect(t.text).equal("**")
    });

    it('Es sollte eine neue Positionsnummer zugewiesen werden können', function () {
      let t = new Task;
      t.position = 7.5;
      expect(t.position).equal(7.5);

      t.position = "Banane";
      expect(t.position).equal(7.5)
    });

  });
});