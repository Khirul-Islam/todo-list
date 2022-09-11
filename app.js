//selectors
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todos");

//Event Listners
document.addEventListener("DOMContentLoaded", getTodos);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions

function addTodo(event) {
  event.preventDefault();

  //Through a Alert If The Field is Empty
  if (todoInput.value === " ") {
    alert("Please Input Something");
  } else {
    //Create todoDIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //server opiton

    saveLocalTodos(todoInput.value);

    //Create li

    const todoLi = document.createElement("li");
    todoLi.classList.add("todo-item");
    todoLi.innerText = todoInput.value;
    todoDiv.appendChild(todoLi);

    //Create Checked Button

    const ComplateBtn = document.createElement("button");
    ComplateBtn.classList.add("checked-btn");
    ComplateBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todoDiv.appendChild(ComplateBtn);

    //Create trash Button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("tras-btn");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    todoDiv.appendChild(deleteBtn);

    //Append Into Todo DIV

    todoList.appendChild(todoDiv);

    //Clear The Input value
    todoInput.value = " ";
  }
}

function deleteCheck(e) {
  const item = e.target;
  //Delete Todo
  if (item.classList[0] === "tras-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //Check Button

  if (item.classList[0] === "checked-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("complated");
  }
}

function filterTodo(f) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (f.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("complated")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("complated")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Get Todos From Local Stroge TO UI

function getTodos() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  localStorage.setItem("todos", JSON.stringify(todos));

  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //server opiton

    //Create li

    const todoLi = document.createElement("li");
    todoLi.classList.add("todo-item");
    todoLi.innerText = todo;
    todoDiv.appendChild(todoLi);

    //Create Checked Button

    const ComplateBtn = document.createElement("button");
    ComplateBtn.classList.add("checked-btn");
    ComplateBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todoDiv.appendChild(ComplateBtn);

    //Create trash Button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("tras-btn");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    todoDiv.appendChild(deleteBtn);

    //Append Into Todo DIV

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  localStorage.setItem("todos", JSON.stringify(todos));

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//End of the CODING
