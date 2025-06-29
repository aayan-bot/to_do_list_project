					
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];					
let filter = "all";					
					
const taskForm = document.getElementById("task-form");					
const taskInput = document.getElementById("task-input");					
const taskList = document.getElementById("task-list");					
const filterButtons = document.querySelectorAll(".filters button");					
					
taskForm.addEventListener("submit", e => {					
e.preventDefault();					
const taskText = taskInput.value.trim();					
if (taskText !== "") {					
tasks.push({					
text: taskText,					
completed: false,					
timestamp: new Date().toLocaleString()					
});					
saveAndRender();					
taskInput.value = "";					
}					
});					
					
function saveAndRender() {					
localStorage.setItem("tasks", JSON.stringify(tasks));					
renderTasks();					
}					
					
function renderTasks() {					
taskList.innerHTML = "";					
let filteredTasks = tasks.filter(task => {					
if (filter === "all") return true;					
return filter === "completed" ? task.completed : !task.completed;					
});					
					
filteredTasks.forEach((task, index) => {					
const li = document.createElement("li");					
					
const info = document.createElement("div");					
info.className = "task-info";					
					
const span = document.createElement("span");					
span.textContent = task.text;					
if (task.completed) span.classList.add("completed");					
					
const time = document.createElement("small");					
time.textContent = task.timestamp;					
					
info.appendChild(span);					
info.appendChild(time);					
					
const buttons = document.createElement("div");					
buttons.className = "task-buttons";					
					
const toggleBtn = document.createElement("button");					
toggleBtn.textContent = task.completed ? "Undo" : "Done";					
toggleBtn.onclick = () => {					
task.completed = !task.completed;					
saveAndRender();					
};					
					
const editBtn = document.createElement("button");					
editBtn.textContent = "Edit";					
editBtn.onclick = () => {					
const newText = prompt("Edit task:", task.text);					
if (newText !== null) {					
task.text = newText.trim();					
saveAndRender();					
}					
};					
					
const deleteBtn = document.createElement("button");					
deleteBtn.textContent = "Delete";					
deleteBtn.onclick = () => {					
tasks.splice(index, 1);					
saveAndRender();					
};					
					
buttons.append(toggleBtn, editBtn, deleteBtn);					
li.append(info, buttons);					
taskList.appendChild(li);					
});					
}					
					
filterButtons.forEach(btn => {					
btn.addEventListener("click", () => {					
filterButtons.forEach(b => b.classList.remove("active"));					
btn.classList.add("active");					
filter = btn.dataset.filter;					
renderTasks();					
});					
});					
					
renderTasks();					
					
					
					
					
					
					