'use strict';

/**
 * List is a collection of tasks
 */
class List {
  // Create a list
  constructor(list) {
    this.title = list.title;
    this.tasks = list.tasks;
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

  // Add task to the list
  static addTask(task, list) {
    task = Task.render(task);
    $(list).closest("div.list-container").find("div.list-tasks ul").append("<li>" + task + "</li>");
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
  // Add a task to the list
  $(document).on("click", ".add-task", function() {
    var title = $(this).closest("div.list-container").find(".task-title-input").val();
    var content = $(this).closest("div.list-container").find(".task-content-input").val();
    var task = new Task(title, content);

    List.addTask(task, this);
  });
});