# My To-Do List 📝

A modern and responsive To-Do List web application built using **HTML5, CSS3, Bootstrap 5, and Vanilla JavaScript**.

The application helps users add, manage, complete, delete, and filter their daily tasks. Tasks are saved in the browser using **localStorage**, so they remain available even after refreshing the page.

## 🚀 Features

* Add new tasks
* Mark tasks as completed
* Delete tasks
* Filter tasks:

  * All
  * Active
  * Completed
* Display total task count
* Display completed task count
* Display remaining task count
* Save tasks using localStorage
* Load saved tasks after page refresh
* Keep completed status after refresh
* Empty state when there are no tasks
* Press **Enter** to quickly add a task
* Fully responsive design
* Modern UI with subtle animations

## 🛠️ Technologies Used

* **HTML5** – Page structure
* **CSS3** – Styling, responsive design and animations
* **Bootstrap 5** – Layout and responsive components
* **Bootstrap Icons** – Icons
* **Vanilla JavaScript** – Application functionality
* **LocalStorage** – Saving tasks in the browser

## 📂 Project Structure

```text
my-todo-list/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## 💻 How to Run

1. Download or clone this repository.
2. Open the project folder in VS Code.
3. Open `index.html` in your browser.

You can also use the **Live Server** extension in VS Code for a better development experience.

## 🧠 How It Works

Tasks are stored as JavaScript objects:

```javascript
{
    id: 123456789,
    text: "Complete JavaScript practice",
    completed: false
}
```

The tasks are stored in the browser using:

```javascript
localStorage.setItem("tasks", JSON.stringify(tasks));
```

When the application starts, saved tasks are loaded using:

```javascript
JSON.parse(localStorage.getItem("tasks")) || [];
```

This allows the tasks to remain saved even after the browser page is refreshed.

## 📱 Responsive Design

The application is designed to work on:

* Desktop
* Laptop
* Tablet
* Mobile devices

Bootstrap's responsive grid and custom CSS media queries are used to adapt the layout to different screen sizes.

## 🎨 UI Design

The application uses a clean productivity-dashboard style with:

* Light background
* Purple and indigo accent colors
* Rounded cards
* Soft shadows
* Simple icons
* Responsive task layout
* Small CSS animations

## 📸 Main Functionality

Users can:

**Add Task →** Enter a task and click Add Task.

**Complete Task →** Click the checkbox to mark a task as completed.

**Delete Task →** Click the trash icon to remove a task.

**Filter Tasks →** Use All, Active, or Completed to display specific tasks.

**Refresh Page →** Previously saved tasks remain available because of localStorage.

## 🔮 Future Improvements

Some features that could be added in the future:

* Edit existing tasks
* Task priority
* Due dates
* Search tasks
* Dark mode
* Clear completed tasks
* Drag and drop task ordering

## 👨‍💻 Author

**M. Indu**

Frontend Development Learner

Skills practiced in this project:

`HTML5` `CSS3` `Bootstrap 5` `JavaScript` `DOM` `Arrays` `Functions` `Events` `LocalStorage`

## 📄 License

This project is created for **learning and educational purposes**.
