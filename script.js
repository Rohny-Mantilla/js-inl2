const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const error = document.querySelector("#inputError");
const output = document.querySelector("#output");

let todos = [];

const fetchTodo = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();
  todos = data;

  printTodos();
};

fetchTodo();

const printTodos = () => {
  output.innerHTML = "";
  todos.forEach((todo) => {
    output.appendChild(createTodoElement(todo));
  });
};

const createTodoElement = (todo) => {
  let cardContainer = document.createElement("div");
  cardContainer.classList.add("todoList");

  let card = document.createElement("div");
  card.classList.add("todo");

  let title = document.createElement("p");
  title.classList.add("todo-title");
  title.innerText = todo.title;

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn-danger");
  deleteBtn.innerText = "X";
  deleteBtn.addEventListener("click", () => removeTodo(todo.id));

  cardContainer.appendChild(card);

  card.appendChild(title);
  card.appendChild(deleteBtn);

  return cardContainer;
};

function removeTodo(id) {
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "DELETE",
  });
  todos = todos.filter((todo) => todo.id !== id);
  console.log(id);
  //Delete from db?
  printTodos();
}

const createNewTodo = (title) => {
  fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      title,
      completed: false,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      todos.unshift(data);
      output.prepend(createTodoElement(data));
    });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value == "") {
    input.classList.add("is-invalid");
    error.innerText = "Input can't be empty";
  } else {
    input.classList.remove("is-invalid");
    error.innerText = "";
    createNewTodo(input.value);
    input.value = "";
    input.focus();
  }
});
