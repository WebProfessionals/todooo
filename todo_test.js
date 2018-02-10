var assert = require('chai').assert;
var expect = require('chai').expect;

var Task = require('./todo.js').Task;
var TodoList = require('./todo.js').TodoList;

describe('Todo', function () {


  describe('TodoList', function () {
    it('Der Text eines Tasks in der Liste sollte aktualisert werden können', function () {
      let liste = new TodoList();
      liste.addTask('Neue Aufgabe');
      liste.addTask('Neue Aufgabe B');
      let task = liste.addTask('Neue Aufgabe C');

      liste.updateTaskText(1,"neuer Text");
      expect(liste.tasks[1].text).equal("neuer Text");
      liste.tasks[1].text = "Hi";
      expect(liste.tasks[1].text).equal("Hi");

      task.text = "3";
      expect(liste.tasks[2].text).equal("3");
    });


    it('Wir sollten einen Task der Liste hinzufügen können', function () {
      let liste = new TodoList();
      liste.addTask('Neue Aufgabe');
      expect(liste.tasks.length).equals(1);
      liste.addTask('Neue Aufgabe B');
      expect(liste.tasks.length).equals(2);

      expect(liste.tasks[0].text).equal("Neue Aufgabe");
      expect(liste.tasks[1].text).equal("Neue Aufgabe B");

    });

    it('Neue Tasks sollten die Position des letzten Tasks +1 haben', function () {
      let liste = new TodoList();

      liste.addTask('Neue Aufgabe');
      expect(liste.tasks[0].position).equal(0);

      liste.addTask('Neue Aufgabe B');
      expect(liste.tasks[1].position).equal(1);
      liste.tasks[1].position=202;
      expect(liste.tasks[1].position).equal(202);

      liste.addTask('Neue Aufgabe C');
      expect(liste.tasks[2].position).equal(203);
    });

    it('Ein Task soll entfernt werden können', function () {
      let liste = new TodoList();
      liste.addTask('Neue Aufgabe A');
      liste.addTask('Neue Aufgabe B');
      liste.addTask('Neue Aufgabe C');

      liste.removeTask(1);
      expect(liste.tasks.length).equal(2);
      expect(liste.tasks[1].text).equal('Neue Aufgabe C');
    });

  });

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