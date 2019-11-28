let todos = JSON.parse(localStorage.getItem("todos")) || [];

var ele = {
  all: document.getElementById("allDiv"),
  alltodos: document.getElementById("alltodos"),
  tdetails: document.getElementById("td"),
  editDiv: document.getElementById("edit"),
  det_title: document.getElementById("t-title"),
  det_time: document.getElementById("t-time"),
  det_desc: document.getElementById("t-desc"),
  det_status: document.getElementById("t-status"),
  edit_title: document.getElementById("edit-title"),
  edit_time: document.getElementById("edit-time"),
  edit_desc: document.getElementById("edit-description")
};

function td() {
  ele.tdetails.className = "visible";
  ele.all.className = "hidden";
  ele.editDiv.className = "hidden";
}

const display = (todos, alltodos) => {
  alltodos.innerHTML = todos
    .map((todo, i) => {
      return `
    <div class="td-display" id="new-${i}" ><input type='checkbox' id='chb-${i}' /><label  class="cb-l" id="todo-label-${i}"  for='chb-${i}'> ${todo.title} </label><div class="more">More</div><div class="sibling"><button onclick="td()" id="edit-${i}">Edit Todo</button><button onclick="td()" id="det-${i}">View Details</button><button id="del-${i}" >Delete Todo</button></div></div>
    `;
    })
    .join("");
};

// ! delete  todo

ele.alltodos.addEventListener("click", e => {
  for (let j = 0; j < todos.length; j++) {
    if (e.target.id === `del-${j}`) {
      todos.splice(j, 1);
      display(todos, ele.alltodos);
      localStorage.setItem("todos", JSON.stringify(todos));
    }

    // ! view details div

    if (e.target.id === `det-${j}`) {
      ele.det_title.innerHTML = todos[j].title;
      ele.det_time.innerHTML = todos[j].time;
      ele.det_desc.innerHTML = todos[j].description;
      ele.det_status.innerHTML = todos[j].comp;
    }

    //  ! edit todo

    if (e.target.id === `edit-${j}`) {
      ele.edit_title.value = todos[j].title;
      ele.edit_desc.value = todos[j].description;
      extra = j;
      ele.editDiv.className = "visible";
      ele.all.className = "hidden";
      ele.tdetails.className = "hidden";
    }
    //  ! checked for backend
    if (e.target.id === `todo-label-${i}`) {
      setTimeout(function() {
        let current = e.target.previousElementSibling.checked;
        todos[j].checked = current;
        if (current) {
          todos[j].comp = "Completed";
        } else {
          todos[j].comp = "Incomplete";
        }
        localStorage.setItem("todos", JSON.stringify(todos));
      }, 1);
    }
  }
});

// ! update todo data  function

function update() {
  var updatedTitle = ele.edit_title.value;
  todos[extra].title = updatedTitle;
  var updatedTime = ele.edit_time.value;
  if (updatedTime) {
    updatedTime = formatTime(updatedTime);
    todos[extra].time = updatedTime;
  }
  todos[extra].description = ele.edit_desc.value;
  document.getElementById(`todo-label-${extra}`).innerHTML = updatedTitle;
  localStorage.setItem("todos", JSON.stringify(todos));
  ele.editDiv.className = "hidden";
  ele.all.className = "visible";
  ele.tdetails.className = "hidden";
}

// ! Timer function
function formatTime(formatTime) {
  var timer = formatTime.split(":");
  var hours = +timer[0];
  var mins = timer[1];
  if (hours === 00) {
    formatTime = ` ${hours + 12}:${mins}AM`;
  } else if (hours <= 11) {
    formatTime = `${hours}:${mins}AM`;
  } else if (hours === 12) {
    formatTime = `${hours}:${mins}PM`;
  } else if (hours >= 13) {
    formatTime = ` ${hours - 12}:${mins}PM`;
  }
  return formatTime;
}

// ! cheked for loading window
const loadingCheck = (todo, i) => {
  ele.alltodos.children[i].children[0].checked = todo.checked;
  localStorage.setItem("todos", JSON.stringify(todos));
};

todos.forEach((todo, i) => loadingCheck(todo, i));

display(todos, ele.alltodos);
