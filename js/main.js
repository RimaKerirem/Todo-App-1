let inputTask = document.querySelector(".form .input-task");
let addBtn = document.querySelector(".form .add");

let tasks = document.querySelector(".container .tasks");

let deleteAll = document.querySelector(".container .all");
let deleteAllModal = document.getElementById("delete-all-modal");
let yesAll = document.querySelector("#delete-all-modal .content .yes");
let noAll = document.querySelector("#delete-all-modal .content .no");

let updateModal = document.getElementById("update-modal");
let updateBtn = document.querySelector("#update-modal .content .yes");
let cancelBtn = document.querySelector("#update-modal .content .no");
let updateField = document.querySelector(".modal .content .update-field");

let deleteModal = document.getElementById("delete-modal");
let yesBtn = document.querySelector("#delete-modal .content .yes");
let noBtn = document.querySelector("#delete-modal .content .no");

let tasksArray = [];

getData();

addBtn.addEventListener("click", function () {
  if (inputTask.value !== "") {
    let t = {
      id: (Math.floor(Math.random() * 100) * Date.now()).toString(),
      text: inputTask.value,
      done: false,
    };

    inputTask.value = "";

    tasksArray.push(t);
    addTasks(tasksArray);
    localStorage.setItem("task", JSON.stringify(tasksArray));
  }
});

// For Update Task, Task Done, Delete Task
tasks.addEventListener("click", function (e) {
  if (e.target.closest(".update")) {
    updateModal.style.top = "0";
    updateBtn.onclick = () => {
      if (updateField.value != "") {
        updateFunction(e.target.closest(".task").getAttribute("data-id"));
        updateField.value = "";
      }
    };
    cancelBtn.onclick = () => {
      updateModal.style.top = "-100%";
      updateField.value = "";
    };
  }

  if (e.target.closest(".check")) {
    checkFunction(e.target.closest(".task").getAttribute("data-id"));
    e.target.closest(".task").classList.toggle("done");
  }

  if (e.target.closest(".trash")) {
    deleteModal.style.top = "0";

    yesBtn.onclick = () =>
      deleteFunction(e.target.closest(".task").getAttribute("data-id"));

    noBtn.onclick = () => (deleteModal.style.top = "-100%");
  }
});

deleteAll.onclick = () => (deleteAllModal.style.top = "0");

yesAll.onclick = () => {
  tasks.innerHTML = "";
  window.localStorage.clear();
  tasksArray = [];
  deleteAll.style.display = "none";
  deleteAllModal.style.top = "-100%";
};

noAll.onclick = () => (deleteAllModal.style.top = "-100%");

window.onclick = function (e) {
  if (e.target == deleteModal) {
    deleteModal.style.top = "-100%";
  }
  if (e.target == updateModal) {
    updateModal.style.top = "-100%";
  }
  if (e.target == deleteAllModal) {
    deleteAllModal.style.top = "-100%";
  }
};

function addTasks(tasksArray) {
  tasks.innerHTML = "";

  tasksArray.forEach((elt) => {
    let task = document.createElement("div");
    task.setAttribute("data-id", elt.id);

    task.className = elt.done ? "task done" : "task";

    let text = document.createElement("div");
    text.className = "text";

    let title = document.createElement("h3");
    let num = tasksArray.indexOf(elt) + 1;

    title.appendChild(document.createTextNode(`Task ${num.toString()}`));

    let parag = document.createElement("p");
    parag.appendChild(document.createTextNode(elt.text));

    text.appendChild(title);
    text.appendChild(parag);

    let icons = document.createElement("div");
    icons.className = "icons";

    let update = document.createElement("div");
    update.className = "update";
    update.setAttribute("data-info", "Update Task");
    let upIcon = document.createElement("i");
    upIcon.className = "fa-solid fa-pen";
    update.appendChild(upIcon);

    let check = document.createElement("div");
    check.className = "check";
    check.setAttribute("data-info", "Task Done");
    let checkIcon = document.createElement("i");
    checkIcon.className = "fa-regular fa-square-check";
    check.appendChild(checkIcon);

    let del = document.createElement("div");
    del.className = "trash";
    del.setAttribute("data-info", "Delete Task");
    let delIcon = document.createElement("i");
    delIcon.className = "fa-solid fa-trash-can";
    del.appendChild(delIcon);

    icons.appendChild(update);
    icons.appendChild(check);
    icons.appendChild(del);

    task.appendChild(text);
    task.appendChild(icons);

    tasks.appendChild(task);
    if (tasksArray.length !== 0) {
      deleteAll.style.display = "block";
    }
  });
}

function updateFunction(taskId) {
  for (let i = 0; i < tasksArray.length; i++) {
    if (tasksArray[i].id === taskId) {
      tasksArray[i].text = updateField.value;
    }
  }
  updateModal.style.top = "-100%";
  localStorage.setItem("task", JSON.stringify(tasksArray));
  addTasks(tasksArray);
}

function checkFunction(taskId) {
  for (let i = 0; i < tasksArray.length; i++) {
    if (tasksArray[i].id === taskId) {
      tasksArray[i].done == false
        ? (tasksArray[i].done = true)
        : (tasksArray[i].done = false);
    }
  }
  window.localStorage.setItem("task", JSON.stringify(tasksArray));
}

function deleteFunction(taskId) {
  for (let i = 0; i < tasksArray.length; i++) {
    if (tasksArray[i].id === taskId) {
      tasksArray.splice(i, 1);
    }
  }
  if (tasksArray.length === 0) {
    deleteAll.style.display = "none";
  }

  deleteModal.style.top = "-100%";
  localStorage.setItem("task", JSON.stringify(tasksArray));
  addTasks(tasksArray);
}

function getData() {
  if (localStorage.getItem("task")) {
    tasksArray = JSON.parse(localStorage.getItem("task"));
    addTasks(tasksArray);
  }
}
