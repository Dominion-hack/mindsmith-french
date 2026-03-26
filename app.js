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
let lessons = [
"🌚Lesson 1: Bonjour = Hello",
"🌚Lesson 2: Salut = Hi / Bye",
"🌚Lesson 3: Bonsoir = Good evening",
"🌚Lesson 4: Bonne nuit = Good night",
"🌚Lesson 5: Ça va? = How are you?",
"🌚Lesson 6: Comment ça va? = How's it going?",
"🌚Lesson 7: Très bien = Very good",
"🌚Lesson 8: Merci = Thank you",
"🌚Lesson 9: Merci beaucoup = Thank you very much",
"🌚Lesson 10: De rien = You're welcome",
"🌚Lesson 11: Un = 1",
"🌚Lesson 12: Deux = 2",
"🌚Lesson 13: Trois = 3",
"🌚Lesson 14: Quatre = 4",
"🌚Lesson 15: Cinq = 5",
"🌚Lesson 16: Six = 6",
"🌚Lesson 17: Sept = 7",
"🌚Lesson 18: Huit = 8",
"🌚Lesson 19: Neuf = 9",
"🌚Lesson 20: Dix = 10",
"🌚Lesson 21: Père = Father",
"🌚Lesson 22: Mère = Mother",
"🌚Lesson 23: Frère = Brother",
"🌚Lesson 24: Soeur = Sister",
"🌚Lesson 25: Fils = Son",
"🌚Lesson 26: Fille = Daughter",
"🌚Lesson 27: Grand-père = Grandfather",
"🌚Lesson 28: Grand-mère = Grandmother",
"🌚Lesson 29: Oncle = Uncle",
"🌚Lesson 30: Tante = Aunt",
"🌚Lesson 31: Lundi = Monday",
"🌚Lesson 32: Mardi = Tuesday",
"🌚Lesson 33: Mercredi = Wednesday",
"🌚Lesson 34: Jeudi = Thursday",
"🌚Lesson 35: Vendredi = Friday",
"🌚Lesson 36: Samedi = Saturday",
"🌚Lesson 37: Dimanche = Sunday",
"🌚Lesson 38: Oui = Yes",
"🌚Lesson 39: Non = No",
"🌚Lesson 40: Peut-être = Maybe",
"🌚Lesson 41: S’il vous plaît = Please",
"🌚Lesson 42: Excusez-moi = Excuse me",
"🌚Lesson 43: Je suis désolé = I'm sorry",
"🌚Lesson 44: Je ne comprends pas = I don't understand",
"🌚Lesson 45: Parlez-vous anglais? = Do you speak English?",
"🌚Lesson 46: Je m’appelle… = My name is…",
"🌚Lesson 47: Enchanté(e) = Nice to meet you",
"🌚Lesson 48: Rouge = Red",
"🌚Lesson 49: Bleu = Blue",
"🌚Lesson 50: Vert = Green"
];

// Generate lesson divs
for(let i=0;i<lessons.length;i++){
  let div = document.createElement("div");
  div.innerHTML = `<p>${lessons[i]}</p>`;
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
