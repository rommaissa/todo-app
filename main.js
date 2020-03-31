/*
  Helper functions
*/
function hideError() {
  errorElement.innerHTML = "";
}

function generateId() {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

function showTasks(tasks) {
  tasksList.innerHTML = "";
  if (tasks) {
    tasks.forEach(task => {
      if (task.isFinished == false) {
        const html = `
            <li class="task" id=${task.id}>
              <div class="task-info">
                  <div class="task-info__text">${task.text}</div>
                  <div class="task-info__time">${task.date}</div>
              </div>
              <div class="task-toggle">
                  <label class="toggle">
                      <input type="checkbox" class="check-input">
                      <span class="slider"></span>
                  </label>
              </div>
            </li>
         `;
        tasksList.innerHTML += html;
      }
    });
  } else {
    tasksList.innerHTML = "No tasks to show";
  }
}

function updateLocalStorage(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach(task => {
    if (task.id == id) {
      task.isFinished = true;
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks(tasks);
}

const taskInput = document.getElementById("input-task");
const form = document.querySelector(".task-submit");
const tasksList = document.querySelector(".tasks");
const errorElement = document.querySelector(".error");
const checkbox = document.querySelector(".task-toggle");

let t = [];

form.addEventListener("submit", function(e) {
  e.preventDefault();
  let taskTtext = taskInput.value;
  //construct task
  let task = {
    id: generateId(),
    text: taskTtext,
    date: moment().format("MM-DD-YYYY HH:mm"),
    isFinished: false
  };

  if (taskTtext !== "") {
    e.preventDefault();
    const tasks = JSON.parse(localStorage.getItem("tasks")); //null
    if (tasks == null) {
      t.push(task);
      localStorage.setItem("tasks", JSON.stringify(t));
    } else {
      const t = JSON.parse(localStorage.getItem("tasks"));
      t.push(task);
      localStorage.setItem("tasks", JSON.stringify(t));
    }

    taskInput.value = "";
  } else {
    errorElement.innerHTML = "Please fill in the input";
    setTimeout(hideError, 3000);
  }

  //update ui
  tasksList.innerHTML = "";

  const tasks = JSON.parse(localStorage.getItem("tasks"));
  showTasks(tasks);
});

const tasks = JSON.parse(localStorage.getItem("tasks"));
showTasks(tasks);

const tasksElement = document.querySelector(".tasks");
tasksElement.addEventListener("click", function(e) {
  if (e.target.tagName.toUpperCase() === "INPUT") {
    e.target.checked = true;
    const id = e.target.parentElement.parentElement.parentElement.id;
    setTimeout(() => {
      updateLocalStorage(id);
    }, 1000);
  }
});
