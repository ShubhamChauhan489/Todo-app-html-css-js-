document.addEventListener("DOMContentLoaded", () => {
  const newTodoInput = document.querySelector("#new-todo");
  const addTodoButton = document.querySelector("#add-btn");
  const todoList = document.querySelector("#todoList");

  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
      const list = document.createElement("li");
      list.className = "todo-item";
      list.innerHTML = `
          <input type="checkbox" ${
            todo.completed ? "checked" : ""
          } data-index="${index}">
          ${todo.text}
          <button data-index="${index}">Delete</button>
        `;
      todoList.appendChild(list);
    });
  }

  // add todo list function
  function addTodo() {
    const text = newTodoInput.value.trim();
    if (text) {
      todos.push({ text, completed: false });
      localStorage.setItem("todos", JSON.stringify(todos));
      newTodoInput.value = "";
      renderTodos();
    }
  }
  function handleTodoListClick(event) {
    if (event.target.tagName === "BUTTON") {
      const index = event.target.getAttribute("data-index");
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    } else if (event.target.type === "checkbox") {
      const index = event.target.getAttribute("data-index");
      todos[index].completed = event.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    }
  }

  addTodoButton.addEventListener("click", addTodo);
  todoList.addEventListener("click", handleTodoListClick);

  renderTodos();
});
