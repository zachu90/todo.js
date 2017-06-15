'use strict';

/**
 * List is a collection of tasks
 */
class List {
  constructor(title) {
    this.title = title;
    this.tasks = new Array();
  }

  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  getTasks() {
    return this.tasks;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  render() {
    var tasks = '<ul>';
    $.each(this.tasks, function(index, task) {
      tasks += '<li>' + Task.render(task) + '</li>';
    });

    tasks += '</ul>';
    return '<h1>' + this.title + '</h1>' + tasks;
  }
}

/**
 * Structure and behaviour of individual task
 */
class Task {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }

  static render(task) {
    return task.title + ': ' + task.content
  }
}