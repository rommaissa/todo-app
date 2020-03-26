// get input value (task)
// watch for key enter or add button clicked
// add the task to task to do

function hideError() {
  errorElement.innerHTML = "";
}

// njibo wch kayen f local storage => string | null
// const tasks = JSON.parse(localStorage.getItem("tasks"));
// console.log(tasks, typeof tasks);

const taskInput = document.getElementById("task");
const form = document.querySelector(".task-submit");
const tasksList = document.querySelector(".tasks");
const errorElement = document.querySelector(".error");

form.addEventListener("submit", function(e) {
  let task = taskInput.value;

  if (task !== "") {
    e.preventDefault();
    const tasks = JSON.parse(localStorage.getItem("tasks")); //null
    if (tasks == null) {
      let t = [];
      t.push(task);
      localStorage.setItem("tasks", JSON.stringify(t));
    } else {
      const t = JSON.parse(localStorage.getItem("tasks")); // t = ["hello", "bb"]
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

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(task));
    tasksList.appendChild(li);
  });
});

const tasks = JSON.parse(localStorage.getItem("tasks"));

tasks.forEach(task => {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(task));
  tasksList.appendChild(li);
});
