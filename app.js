const dasboard_page = document.querySelector(".dashboard");
const todo_page = document.querySelector(".todo-page");
const planner_page = document.querySelector(".planner-page");
const goals_page = document.querySelector(".goals-page");
const timer_page = document.querySelector(".pomodoro-page");
const settings_page = document.querySelector(".settings-page");

const dashboard_navbtn = document.querySelector(".das_nav");
const todo_navbtn = document.querySelector(".todo_nav");
const planner_navbtn = document.querySelector(".plan_nav");
const goals_navbtn = document.querySelector(".goal_nav");
const timer_navbtn = document.querySelector(".timer_nav");
const settings_navbtn = document.querySelector(".sett_nav");

const allNavButtons = [
  dashboard_navbtn,
  todo_navbtn,
  planner_navbtn,
  goals_navbtn,
  timer_navbtn,
  settings_navbtn,
];

function setActiveNav(activeBtn) {
  allNavButtons.forEach((btn) => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}

dashboard_navbtn.addEventListener("click", () => {
  hideAllPages();
  dasboard_page.style.display = "grid";
  setActiveNav(dashboard_navbtn);
});
todo_navbtn.addEventListener("click", () => {
  hideAllPages();
  todo_page.style.display = "grid";
  setActiveNav(todo_navbtn);
});
planner_navbtn.addEventListener("click", () => {
  hideAllPages();
  planner_page.style.display = "grid";
  setActiveNav(planner_navbtn);
});
goals_navbtn.addEventListener("click", () => {
  hideAllPages();
  goals_page.style.display = "grid";
  setActiveNav(goals_navbtn);
});
timer_navbtn.addEventListener("click", () => {
  hideAllPages();
  timer_page.style.display = "grid";
  setActiveNav(timer_navbtn);
});
settings_navbtn.addEventListener("click", () => {
  hideAllPages();
  settings_page.style.display = "grid";
  setActiveNav(settings_navbtn);
});

function hideAllPages() {
  dasboard_page.style.display = "none";
  todo_page.style.display = "none";
  planner_page.style.display = "none";
  goals_page.style.display = "none";
  timer_page.style.display = "none";
  settings_page.style.display = "none";
}

// ---------- shared helpers ----------

function loadData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function finishEditing(h3, onSave) {
  h3.contentEditable = "false";
  onSave(h3.textContent.trim());
}

function attachEditBehavior(h3, onSave) {
  h3.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      h3.blur();
    }
  });
  h3.addEventListener("blur", () => finishEditing(h3, onSave), {
    once: true,
  });
}

// ---------- todo logic ----------

const inp = document.querySelector(".todoinput");
const btn = document.querySelector("#todoadd");
const list = document.querySelector(".todo-list ul");
list.style.listStyleType = "none";

let todos = loadData("mywork_todos", []);

function renderTodos() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.classList.add("li");
    li.innerHTML = `
          <h3 class="taskName">${todo.text}</h3>
          <div>
            <button class="btn edit">Edit</button>
            <button class="btn del">Delete</button>
          </div>`;
    li.dataset.index = index;
    list.appendChild(li);
  });
}

function addTodo() {
  const value = inp.value.trim();
  if (value === "") return;
  todos.push({ text: value });
  saveData("mywork_todos", todos);
  renderTodos();
  inp.value = "";
}

btn.addEventListener("click", addTodo);
inp.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

list.addEventListener("click", (event) => {
  const li = event.target.closest(".li");
  if (!li) return;
  const index = Number(li.dataset.index);

  if (event.target.classList.contains("edit")) {
    const h3 = li.querySelector(".taskName");
    h3.contentEditable = "true";
    h3.focus();
    attachEditBehavior(h3, (newText) => {
      if (newText === "") return renderTodos();
      todos[index].text = newText;
      saveData("mywork_todos", todos);
    });
  }

  if (event.target.classList.contains("del")) {
    todos.splice(index, 1);
    saveData("mywork_todos", todos);
    renderTodos();
  }
});

renderTodos();

// ---------- daily planner ----------

const plannerinp = document.querySelector(".plannerinput");
const plannerbtn = document.querySelector("#planneradd");
const plannerlist = document.querySelector(".plannerul");
const startTime = document.querySelector(".start-time");
const endTime = document.querySelector(".end-time");
plannerlist.style.listStyleType = "none";

let plannerItems = loadData("mywork_planner", []);

function renderPlanner() {
  plannerlist.innerHTML = "";
  plannerItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("li");
    li.innerHTML = `
          <p>${item.start} - ${item.end}</p>
          <h3 class="taskName">${item.text}</h3>
          <div>
            <button class="btn edit">Edit</button>
            <button class="btn del">Delete</button>
          </div>`;
    li.dataset.index = index;
    plannerlist.appendChild(li);
  });
}

function addPlannerItem() {
  const value = plannerinp.value.trim();
  if (value === "") return;
  plannerItems.push({
    text: value,
    start: startTime.value,
    end: endTime.value,
  });
  saveData("mywork_planner", plannerItems);
  renderPlanner();
  plannerinp.value = "";
}

plannerbtn.addEventListener("click", addPlannerItem);
plannerinp.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addPlannerItem();
});

plannerlist.addEventListener("click", (event) => {
  const li = event.target.closest(".li");
  if (!li) return;
  const index = Number(li.dataset.index);

  if (event.target.classList.contains("edit")) {
    const h3 = li.querySelector(".taskName");
    h3.contentEditable = "true";
    h3.focus();
    attachEditBehavior(h3, (newText) => {
      if (newText === "") return renderPlanner();
      plannerItems[index].text = newText;
      saveData("mywork_planner", plannerItems);
    });
  }

  if (event.target.classList.contains("del")) {
    plannerItems.splice(index, 1);
    saveData("mywork_planner", plannerItems);
    renderPlanner();
  }
});

renderPlanner();

// ---------- goals ----------
// NOTE: previously this always inserted a hardcoded "Learn React" item
// with invalid nested <li> markup, ignoring the input entirely. Fixed
// to use the typed value, matching the todo/planner pattern.

const goalinp = document.querySelector(".goalinput");
const goalbtn = document.querySelector("#goaladd");
const goallist = document.querySelector(".goalul");
goallist.style.listStyleType = "none";

let goals = loadData("mywork_goals", []);

function renderGoals() {
  goallist.innerHTML = "";
  goals.forEach((goal, index) => {
    const li = document.createElement("li");
    li.classList.add("li");
    li.innerHTML = `
          <input type="checkbox" class="complete" ${
            goal.done ? "checked" : ""
          }>
          <h3 class="goalName ${goal.done ? "completed" : ""}">${
      goal.text
    }</h3>
          <button class="btn del">Delete</button>`;
    li.dataset.index = index;
    goallist.appendChild(li);
  });
}

function addGoal() {
  const value = goalinp.value.trim();
  if (value === "") return;
  goals.push({ text: value, done: false });
  saveData("mywork_goals", goals);
  renderGoals();
  goalinp.value = "";
}

goalbtn.addEventListener("click", addGoal);
goalinp.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addGoal();
});

goallist.addEventListener("click", (event) => {
  const li = event.target.closest(".li");
  if (!li) return;
  const index = Number(li.dataset.index);

  if (event.target.classList.contains("complete")) {
    goals[index].done = event.target.checked;
    saveData("mywork_goals", goals);
    renderGoals();
  }

  if (event.target.classList.contains("del")) {
    goals.splice(index, 1);
    saveData("mywork_goals", goals);
    renderGoals();
  }
});

renderGoals();

// ---------- pomodoro timer ----------

const timer = document.querySelector("#timer");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const resetBtn = document.querySelector("#resetBtn");

let totalSeconds = 25 * 60;
let interval;

function updateTimer() {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  timer.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
}

updateTimer();

startBtn.addEventListener("click", function () {
  if (interval) return;

  interval = setInterval(function () {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateTimer();
    } else {
      clearInterval(interval);
      interval = null;
      alert("Time's Up!");
    }
  }, 1000);
});

stopBtn.addEventListener("click", function () {
  clearInterval(interval);
  interval = null;
});

resetBtn.addEventListener("click", function () {
  clearInterval(interval);
  interval = null;
  totalSeconds = 25 * 60;
  updateTimer();
});

// ---------- settings ----------

const usernameInput = document.querySelector(".usernameInput");
const submitBtn = document.querySelector(".submitusernamebtn");
const welcomeText = document.querySelector("#welcomeText");

let username = loadData("mywork_username", "Utkarsh");

function applyUsername(name) {
  welcomeText.textContent = `Welcome, ${name}! 👋`;
}

applyUsername(username);

submitBtn.addEventListener("click", () => {
  const name = usernameInput.value.trim();
  if (name === "") return;
  username = name;
  saveData("mywork_username", username);
  applyUsername(username);
  usernameInput.value = "";
});

// start on dashboard with correct active nav state
setActiveNav(dashboard_navbtn);
