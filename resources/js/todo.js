'use strict';

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
    return '<h1>' + this.title + '</h1>';
  }
}

class Task{
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }
}