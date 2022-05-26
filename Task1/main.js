let addTaskBtn = document.getElementById("add-task");
let removeTaskBtn = document.getElementById("remove-task");
let removeSelectedTaskBtn = document.getElementById("remove-selected-task");
let taskInput = document.querySelector("input.task-title");
let taskWrapper = document.querySelector(".tasks .list-group");

if (localStorage.getItem("tasks") == null) {
  localStorage.setItem("tasks", "[]")
} else {
  let tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));
  if (tasksFromStorage.length > 0) {
    for (const item of tasksFromStorage) {
      let newTaskElem =
        "<li class='list-group-item d-flex justify-content-between align-items-center'>" +
        item.text +
        "<span class='badge rounded-pill bg-primary'>" + item.date + "</span>"
      "</li>";
      taskWrapper.innerHTML = newTaskElem + taskWrapper.innerHTML;
      removeTaskBtn.classList.remove("d-none");
      removeSelectedTaskBtn.classList.remove("d-none");
    }
  }
}

taskInput.addEventListener("keypress", function (e) {
  if (e.keyCode == 13) {
    saveTask();
  }
})
addTaskBtn.addEventListener("click", saveTask)

function saveTask() {
  if (taskInput.value.trim() !== "") {
    let newTaskElem =
      "<li class='list-group-item d-flex justify-content-between align-items-center'>" +
      taskInput.value +
      "<span class='badge rounded-pill bg-primary'>" + getTime() + "</span>"
    "</li>";
    taskWrapper.innerHTML = newTaskElem + taskWrapper.innerHTML;

    let task = {
      text: taskInput.value,
      date: getTime()
    }

    let tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));
    tasksFromStorage.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasksFromStorage));

    taskInput.value = "";
    removeTaskBtn.classList.remove("d-none");
    removeSelectedTaskBtn.classList.remove("d-none");
  } else {
    alert("You can't add an empty task!");
  }
}


removeTaskBtn.addEventListener("click", () => {
  if (window.confirm('Do you really want to delete all tasks?')) {
    document.querySelectorAll(".list-group-item").forEach(e => {
      e.remove();
    })
    localStorage.setItem("tasks", "[]")
    removeTaskBtn.classList.add("d-none")
    removeSelectedTaskBtn.classList.add("d-none")
  } else {
    alert("No problem didn't delete any!");
  }
})


removeSelectedTaskBtn.addEventListener("click", () => {
  document.querySelectorAll(".list-group-item.active").forEach(e => {
    e.remove();
  })
})


function getTime() {
  let now = new Date();
  return `${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}.${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1}.${now.getFullYear()} / ${now.getHours()}:${now.getMinutes()}`;
}

document.addEventListener("click", function (e) {
  if (e.target.getAttribute("class").includes("list-group-item")) {
    if (!e.target.getAttribute("class").includes("active")) {
      e.target.classList.add("active")
    }
    else {
      e.target.classList.remove("active")
    }
  }
})