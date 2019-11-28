//   todo araay

var todos = JSON.parse(localStorage.getItem("todos")) || [];

// ! constructor
class Todo {
  constructor(title, time, description, comp) {
    this.title = title;
    this.time = time;
    this.description = description;
    this.comp = comp;
    this.checked = false;
  }
}

// ! general variables
var ele = {
  feildTitle: document.getElementById("title"),
  feildTime: document.getElementById("time"),
  feildDes: document.getElementById("description"),
  outer: document.querySelector(".outer"),
  inner: document.querySelector(".inner"),
  suc_title: document.getElementById("suc-title"),
  suc_time: document.getElementById("suc-time"),
  suc_des: document.getElementById("suc-des")
};

//  ! making new todo

function newTodo() {
  var titleVal = ele.feildTitle.value;
  var timeVal = ele.feildTime.value;
  var deseVal = ele.feildDes.value;
  if (titleVal && timeVal && deseVal) {
    timeVal = formatTime(timeVal);

    todos.push(new Todo(titleVal, timeVal, deseVal, `incomplete`));
    localStorage.setItem("todos", JSON.stringify(todos));

    ele.suc_title.innerHTML = titleVal;
    ele.suc_time.innerHTML = timeVal;
    ele.suc_des.innerHTML = deseVal;

    ele.feildTitle.value = "";
    ele.feildTime.value = "";
    ele.feildDes.value = "";

    ele.outer.classList.add(`vis`);
    ele.inner.classList.add(`actPos`);

    setTimeout(function() {
      ele.outer.classList.remove(`vis`);
      ele.inner.classList.remove(`actPos`);
    }, 2000);
  }
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
