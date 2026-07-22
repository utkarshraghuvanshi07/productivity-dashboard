// navigation
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

dashboard_navbtn.addEventListener("click", () => {
  hideAllPages();
  dasboard_page.style.display = "grid";
});
todo_navbtn.addEventListener("click", () => {
  hideAllPages();
  todo_page.style.display = "grid";
});
planner_navbtn.addEventListener("click", () => {
  hideAllPages();
  planner_page.style.display = "grid";
});
goals_navbtn.addEventListener("click", () => {
  hideAllPages();
  goals_page.style.display = "grid";
});
timer_navbtn.addEventListener("click", () => {
  hideAllPages();
  timer_page.style.display = "grid";
});
settings_navbtn.addEventListener("click", () => {
  hideAllPages();
  settings_page.style.display = "grid";
});

function hideAllPages() {
  dasboard_page.style.display = "none";
  todo_page.style.display = "none";
  planner_page.style.display = "none";
  goals_page.style.display = "none";
  timer_page.style.display = "none";
  settings_page.style.display = "none";
}

//todo logic

const inp = document.querySelector(".todoinput");
const btn = document.querySelector("#todoadd");
const todoBox = document.querySelector(".todo-list");
const list = document.querySelector("ul");
list.style.listStyleType = "none";

btn.addEventListener("click", () => {
  const value = inp.value;

  if (value.trim() === "") return;

  let li = document.createElement("li");
  li.classList.add("li");
  li.innerHTML = `
          <h3 class ="taskName">${value}</h3>
          <div>
            <button class="btn edit">Edit</button>
            <button class="btn del">Delete</button>
          </div>`;
  list.appendChild(li);
  inp.value = "";
});

list.addEventListener("click", (event) => {
  if (event.target.classList.contains("edit")) {
    const h3 = event.target.closest(".li").querySelector(".taskName");
    h3.contentEditable = "true";
    h3.focus();
  }

  if (event.target.classList.contains("del")) {
    event.target.closest(".li").remove();
  }
});

// daily planner

const plannerinp = document.querySelector(".plannerinput");
const plannerbtn = document.querySelector("#planneradd");
const plannerBox = document.querySelector(".planner-list");
const plannerlist = document.querySelector(".plannerul");
const startTime = document.querySelector(".start-time");
const endTime = document.querySelector(".end-time");
plannerlist.style.listStyleType = "none";

plannerbtn.addEventListener("click", () => {
  const value = plannerinp.value;

  if (value.trim() === "") return;

  let li = document.createElement("li");
  li.classList.add("li");
  li.innerHTML = `
          <p>${startTime.value} - ${endTime.value}</p>
          <h3 class ="taskName">${value}</h3>
          <div>
            <button class="btn edit">Edit</button>
            <button class="btn del">Delete</button>
          </div>`;
  plannerlist.appendChild(li);
  plannerinp.value = "";
});

plannerlist.addEventListener("click", (event) => {
  if (event.target.classList.contains("edit")) {
    const h3 = event.target.closest(".li").querySelector(".taskName");
    h3.contentEditable = "true";
    h3.focus();
  }

  if (event.target.classList.contains("del")) {
    event.target.closest(".li").remove();
  }
});

// goals

const goalinp = document.querySelector(".goalinput");
const goalbtn = document.querySelector("#goaladd");
const goalBox = document.querySelector(".goal-list");
const goallist = document.querySelector(".goalul");
goallist.style.listStyleType = "none";

goalbtn.addEventListener("click", () => {
  const value = goalinp.value;

  if (value.trim() === "") return;

  let li = document.createElement("li");
  li.classList.add("li");
  li.innerHTML = `
          <li>
    <input type="checkbox" class="complete">
    <h3 class="goalName">Learn React</h3>

    <button class="btn del">Delete</button>
             </li>`;
  goallist.appendChild(li);
  goalinp.value = "";
});

goallist.addEventListener("click", (event) => {
  if(event.target.classList.contains("complete")){
    event.target.nextElementSibling.classList.toggle("completed");
}

  if (event.target.classList.contains("del")) {
    event.target.closest(".li").remove();
  }
});


// timer

const timer = document.querySelector("#timer");

const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const resetBtn = document.querySelector("#resetBtn");

let totalSeconds = 25 * 60;
let interval;

function updateTimer(){

    let minutes = Math.floor(totalSeconds / 60);

    let seconds = totalSeconds % 60;

    timer.textContent =
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}

updateTimer();

startBtn.addEventListener("click",function(){

    if(interval) return;

    interval = setInterval(function(){

        if(totalSeconds > 0){

            totalSeconds--;

            updateTimer();

        }else{

            clearInterval(interval);

            interval = null;

            alert("Time's Up!");

        }

    },1000);

});

stopBtn.addEventListener("click",function(){

    clearInterval(interval);

    interval = null;

});

resetBtn.addEventListener("click",function(){

    clearInterval(interval);

    interval = null;

    totalSeconds = 25 * 60;

    updateTimer();

});


//settings

const usernameInput = document.querySelector(".usernameInput");
const submitBtn = document.querySelector(".submitusernamebtn");
const welcomeText = document.querySelector("#welcomeText");

submitBtn.addEventListener("click", () => {
    const name = usernameInput.value.trim();

    if (name === "") return;

    welcomeText.textContent = `Welcome, ${name}! 👋`;

    usernameInput.value = "";
});