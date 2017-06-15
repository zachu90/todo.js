'use strict';

/**
 * List is a collection of tasks
 */
class List {
  // Create a list
  constructor(title) {
    this.title = title;
    this.tasks = new Array();
  }

  // Create list title
  setTitle(title) {
    this.title = title;
  }

  // Fetch title
  getTitle() {
    return this.title;
  }

  // Fetch tasks array
  getTasks() {
    return this.tasks;
  }

  // Add task to the array
  addTask(task) {
    this.tasks.push(task);
  }

  // Render list of tasks template
  render() {
    var tasks = Task.renderAll(this.tasks);
    var source = $("script#list-template").html();
    var template = Handlebars.compile(source);
    var data = {
      title: this.title,
      tasks: tasks
    }

    return template(data);
  }
}

/**
 * Structure and behaviour of individual task
 */
class Task {
  // Create a task
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }

  // Render tasks list template
  static renderAll(tasksArray) {

    var tasks = new Array;
    $.each(tasksArray, function(index, task) {
      tasks.push(Task.render(task));
    });

    var source = $("script#tasks-template").html();
    var template = Handlebars.compile(source);
    var data = {
      tasks: tasks
    }

    return template(data);
  }

  // Render task template
  static render(task) {
    var source = $("script#task-template").html();
    var template = Handlebars.compile(source);
    var data = {
      title: task.title,
      content: task.content
    }

    return template(data);
  }
}

/**
 * Handle events
 */
$(document).ready(function() {
  // All events will be handled here
});