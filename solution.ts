let tasks: Array<Task> = JSON.parse(localStorage.getItem("tasks"));

const form: HTMLFormElement = document.querySelector("#todo-add");
const text: HTMLInputElement = document.querySelector("#todo-item");
const addBtn: HTMLInputElement = document.querySelector("#todo-save");
const deleteAllBtn: HTMLInputElement = document.querySelector("#todo-delall");
const delCompleted: HTMLInputElement = document.querySelector("#todo-delcom");
const btn: HTMLButtonElement = document.querySelector("button");
const modal: HTMLElement = document.querySelector(".modal");
const confirmBtn = document.querySelector(".confirm");
const cancelBtn = document.querySelector(".cancel");

class Task {
  public text;
  public completed;

  constructor(text: string, completed: boolean = false) {
    this.text = text;
    this.completed = completed;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

//---------------Create a Task--------------
addBtn.addEventListener("click", function (event) {
  let task = new Task(text.value, false);
  let pattern = /^[\w]+/;

  if (pattern.test(text.value)) {
    tasks.push(task);
    storeTask();
  }
  text.value = "";
});

//---------------Store Task in Local Storage--------------
const storeTask = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  presentTasks();
};

//---------------Present Tasks--------------
const presentTasks = () => {
  const table:HTMLElement = document.querySelector("#todo-list");
  // ES5
  // tasks = Object.assign([], JSON.parse(localStorage.getItem("tasks")));
  // ES6
  let taskJson:Task[] = JSON.parse(localStorage.getItem("tasks"))  || []
  tasks = [...taskJson]

  if (tasks.length === 0) {
    table.innerHTML = "";
    return;
  }
  if (tasks.length !== 0) {
    table.innerHTML = "";
    for (let index = 0; index < tasks.length; index++) {
      table.innerHTML += `<div class="task-card">
            <div class="row">
                <div class="col delete-col">
                  <p class="para">${tasks[index].text}</p>
                  <p class="completed"></p>
                </div>
                <div class="col">
                    <button class="delete-btn" onclick="deleteTask(${index})">&#10004;</button>
                </div>
            </div>
          </div>`;
      if (tasks[index].completed) {
        let paraTask: NodeListOf<HTMLParagraphElement> =
          document.querySelectorAll("p.para");
        let taskCard: NodeListOf<HTMLDivElement> =
          document.querySelectorAll(".task-card");
          taskCard[index].className = "todo-item done"
          // paraTask[index].style.textDecoration = "line-through";
        // taskCard[index].style.backgroundColor = "rgb(220,255,215)";
      }
    }
  }
};
//---------------Mark a Task-----------------
const deleteTask = (i: number) => {
  tasks[i].completed = true;
  storeTask();
};
//---------------Delete Completed-----------------
delCompleted.addEventListener("click", () => {
  let cunt = 1;
  tasks = JSON.parse(localStorage.getItem("tasks"));
  for (let index = 0; index < tasks.length; index++) {
    if (tasks[index].completed) {
      tasks.splice(index, 1);
      index -= 1;
    }
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  presentTasks();
});

//---------------Deleting All Tasks-----------------
deleteAllBtn.addEventListener("click", () => {
  modal.style.display = "block";

  presentTasks();
});
//---------------Confirm Deleting All Tasks-----------------
confirmBtn.addEventListener("click", () => {
  localStorage.clear();
  tasks = [];
  modal.style.display = "none";
  presentTasks();
});
//---------------Canceling Deleting All Tasks-----------------
cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

//---------------OnLoad-----------------
presentTasks();
