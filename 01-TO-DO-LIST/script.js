let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

let taskInput = document.getElementById("taskInput");
let addTaskBtn = document.getElementById("addTaskBtn");
let taskList = document.getElementById("taskList");
let emptyState = document.getElementById("emptyState");

let totalTasks = document.getElementById("totalTasks");
let completedTasks = document.getElementById("completedTasks");
let remainingTasks = document.getElementById("remainingTasks");

let filterButtons = document.querySelectorAll(".filter-btn");


// Add Task
addTaskBtn.addEventListener("click", function() {

    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    let newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    taskInput.value = "";

    showTasks();
});


// Add task with Enter key
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTaskBtn.click();
    }

});


// Display Tasks
function showTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;


    // Active filter
    if (currentFilter === "active") {

        filteredTasks = tasks.filter(function(task) {
            return task.completed === false;
        });

    }


    // Completed filter
    if (currentFilter === "completed") {

        filteredTasks = tasks.filter(function(task) {
            return task.completed === true;
        });

    }


    // Empty state
    if (filteredTasks.length === 0) {

        emptyState.style.display = "block";

    } else {

        emptyState.style.display = "none";

    }


    // Create each task
    filteredTasks.forEach(function(task) {

        let taskItem = document.createElement("div");

        taskItem.className = "list-group-item task-item";


        if (task.completed) {
            taskItem.classList.add("completed");
        }


        let taskRow = document.createElement("div");

        taskRow.className = "d-flex align-items-center gap-3";


        // Checkbox
        let checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className = "form-check-input task-checkbox";

        checkbox.checked = task.completed;


        checkbox.addEventListener("change", function() {

            task.completed = checkbox.checked;

            saveTasks();

            showTasks();

        });


        // Task content
        let taskContent = document.createElement("div");

        taskContent.className = "task-content flex-grow-1";


        let taskTitle = document.createElement("div");

        taskTitle.className = "task-title";

        taskTitle.textContent = task.text;


        let taskDate = document.createElement("div");

        taskDate.className = "task-date";

        taskDate.innerHTML = '<i class="bi bi-clock"></i> Added just now';


        taskContent.appendChild(taskTitle);

        taskContent.appendChild(taskDate);


        // Delete button
        let deleteButton = document.createElement("button");

        deleteButton.className = "delete-btn";

        deleteButton.innerHTML = '<i class="bi bi-trash3"></i>';


        deleteButton.addEventListener("click", function() {

            tasks = tasks.filter(function(item) {

                return item.id !== task.id;

            });

            saveTasks();

            showTasks();

        });


        taskRow.appendChild(checkbox);

        taskRow.appendChild(taskContent);

        taskRow.appendChild(deleteButton);

        taskItem.appendChild(taskRow);

        taskList.appendChild(taskItem);

    });


    updateSummary();

}


// Update Summary
function updateSummary() {

    let total = tasks.length;

    let completed = tasks.filter(function(task) {

        return task.completed === true;

    }).length;

    let remaining = total - completed;


    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    remainingTasks.textContent = remaining;

}


// Save tasks in localStorage
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}


// Filter buttons
filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        filterButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        currentFilter = button.getAttribute("data-filter");

        showTasks();

    });

});


// Load saved tasks
showTasks();
