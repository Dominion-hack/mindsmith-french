// LOGIN
function login(){
  let user = document.getElementById("username").value;
  localStorage.setItem("user", user);
  document.getElementById("welcome").innerText = "Welcome " + user;
}

// XP SYSTEM
let xp = 0;
let level = 1;

function addXP(points){
  xp += points;
  if(xp >= 100){
    level++;
    xp = 0;
    alert("🎉 Level Up!");
  }
  document.getElementById("xp").innerText = "XP: " + xp;
  document.getElementById("level").innerText = "Level: " + level;
}

// LESSONS (50 AUTO)
let lessons = ["Bonjour = Hello","Merci = Thank you","Oui = Yes","Non = No"];

for(let i=1;i<=50;i++){
  let div = document.createElement("div");
  div.innerHTML = `<p>Lesson ${i}: ${lessons[i%lessons.length]}</p>`;
  document.getElementById("lessonsContainer").appendChild(div);
}

// QUIZ
let questions = [
  {q:"Bonjour means?",a:"Hello",b:"Bye",correct:"a"},
  {q:"Merci means?",a:"Thanks",b:"No",correct:"a"}
];

let index=0, score=0;

function loadQ(){
  if(index < questions.length){
    document.getElementById("q").innerText = questions[index].q;
    document.getElementById("a").innerText = questions[index].a;
    document.getElementById("b").innerText = questions[index].b;
  } else {
    document.getElementById("q").innerText = "Finished!";
  }
}

function answer(choice){
  if(choice === questions[index].correct){
    score++;
    addXP(10);
  }
  index++;
  updateProgress();
  loadQ();
}

function updateProgress(){
  let progress = (index/questions.length)*100;
  document.getElementById("progressBar").value = progress;
}

loadQ();

// PRACTICE
function checkPractice(){
  let input = document.getElementById("practiceInput").value.toLowerCase();
  if(input === "bonsoir"){
    document.getElementById("practiceResult").innerText = "✅ Correct";
  } else {
    document.getElementById("practiceResult").innerText = "❌ Bonsoir";
  }
}

// LISTENING
function checkAnswer(btn){
  let form = btn.parentElement;
  let selected = form.querySelector("input:checked");
  let result = form.querySelector(".result");

  if(!selected){
    result.innerText = "Choose answer!";
    return;
  }

  if(selected.value === form.dataset.answer){
    result.innerText = "✅ Correct";
  } else {
    result.innerText = "❌ Wrong";
  }
}
