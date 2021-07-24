const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");
const TODOS_KEY = "todos";
let todos = [];

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteToDo(event){
    const li = event.target.parentElement;
    todos = todos.filter(item => item.id !== parseInt(li.id));
    saveToDos();
    li.remove();
}

function paintToDo(newTodoObject){
    const li = document.createElement("li");
    li.id = newTodoObject.id;
    const span = document.createElement("span");
    const button = document.createElement("button");
    button.innerText = "🥰";
    button.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    span.innerText = newTodoObject.text;
    toDoList.appendChild(li);
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObject = {
        text:newTodo,
        id : Date.now()
    }
    todos.push(newTodoObject);
    paintToDo(newTodoObject);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const isLogged = localStorage.getItem("username");

if(isLogged === null){
    toDoInput.classList.add("hidden");
}

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    todos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}