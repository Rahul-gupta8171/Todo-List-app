// Select Dom Elements

const input = document.querySelector("#todo-input");
const addbtn = document.querySelector("#add-btn");
const list = document.querySelector("#todo-list");

const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

function savetodos() {
  // Save Currect todos to Local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

function render() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const node = createtodo(todo, index);
    list.appendChild(node);
  });
}

function createtodo(todo, index) {
  const li = document.createElement("li");

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = !!todo.completed; // !!
  
  checkbox.addEventListener("change", function () {
    todo.completed = checkbox.checked; // !!
    
    if(todo.completed){
        span.style.textDecoration = "line-through";
        span.style.color = "grey";
    }
    else{
        span.style.textDecoration = "";
        span.style.color = "black";

    }
    // span.style.textDecoration = todo.completed ? "line-through" : "";
    savetodos();
  });

  // Span
  const span = document.createElement("span");
  span.textContent = todo.text;
  span.style.margin = "0px 8px";

  if (todo.completed) {
    span.style.textDecoration = "line-through";
  }
  span.addEventListener("dblclick", function () {
    const a = prompt("Rename", todo.text);
    if (a !== null) {
      todo.text = a.trim();
      span.textContent = todo.text;
      savetodos();
    }
  });

  //  Delete Button
  const del = document.createElement("button");
  del.id = "delbtn";
  del.textContent = "Delete";
  del.addEventListener("click", function () {
    todos.splice(index, 1);
    render();
    savetodos();
  });

  li.append(checkbox);
  li.append(span);
  li.append(del);
  return li;
}

function addtodo() {
    // list.style.border = "1px solid red";
  const text = input.value.trim();
  if (!text) {
    return;
  }
  todos.push({ text: text, completed: false });
  input.value = "";
  render();
  savetodos();
}

addbtn.addEventListener("click", addtodo);
input.addEventListener("keydown", function (dets) {
  if (dets.key == "Enter") {
    addtodo();
  }
});

render();
// savetodos();
