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

  // Remove task from the list
  static removeTask(task) {
    $(task).closest("li").remove();
  }

  // Edit the task from the list
  static editTask(task, template) {
    $(task).closest("li").empty().append(template);
  }

  // Update the task
  static updateTask(task, element) {
    task = Task.render(task);
    $(element).closest("li").empty().append(task);
  }

  // Discard task editing
  static discardEditTask(task, element) {
    task = Task.render(task);
    $(element).closest("li").empty().append(task);
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

  // Get existing task title
  static getTitle(task) {
    return $(task).closest("span.task").find(".task-title").text();
  }

  // Get existing task content
  static getContent(task) {
    return $(task).closest("span.task").find(".task-content").text();
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

  // Render the task edit template
  static renderEdit(data) {
    var source = $("script#task-edit-template").html();
    var template = Handlebars.compile(source);

    return template(data);
  }
}

/**
 * Handle events
 */
$(document).ready(function() {
  // Add a task to the list
  $(document).on("click", ".task-add", function() {
    var title = $(this).closest("div.list-container").find(".task-title-input").val();
    var content = $(this).closest("div.list-container").find(".task-content-input").val();
    var task = new Task(title, content);

    List.addTask(task, this);
  });

  // Delete task from the list
  $(document).on("click", ".task-delete", function() {
    List.removeTask(this);
  });

  // Edit the task
  $(document).on("click", ".task-edit", function() {
    var title = Task.getTitle(this);
    var content = Task.getContent(this);

    var template = Task.renderEdit({
      title: title,
      content: content
    });

    List.editTask(this, template);
  });

  // Update the task
  $(document).on("click", ".task-update", function() {
    var title = $(this).closest("li").find(".task-title-input").val();
    var content = $(this).closest("li").find(".task-content-input").val();
    var task = new Task(title, content);

    List.updateTask(task, this);
  });

  // Discard task changes
  $(document).on("click", ".task-edit-discard", function() {
    var title = $(this).closest("li").find("input[name=title]").val();
    var content = $(this).closest("li").find("input[name=content]").val();
    var task = new Task(title, content);

    List.discardEditTask(task, this);
  });
});