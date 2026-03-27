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

// =========================
// 100 UNIQUE LESSON WORDS
// =========================
let lessons = [
{word:"Bonjour", meaning:"Hello", sentence:"Bonjour, comment ça va ?"},
{word:"Merci", meaning:"Thank you", sentence:"Merci pour ton aide."},
{word:"Oui", meaning:"Yes", sentence:"Oui, je suis prêt."},
{word:"Non", meaning:"No", sentence:"Non, je ne veux pas."},
{word:"Bonsoir", meaning:"Good evening", sentence:"Bonsoir tout le monde."},
{word:"Pain", meaning:"Bread", sentence:"Je mange du pain."},
{word:"Eau", meaning:"Water", sentence:"Je bois de l'eau."},
{word:"Chat", meaning:"Cat", sentence:"Le chat dort."},
{word:"Chien", meaning:"Dog", sentence:"Le chien court."},
{word:"Maison", meaning:"House", sentence:"La maison est grande."},

{word:"École", meaning:"School", sentence:"Je vais à l'école."},
{word:"Livre", meaning:"Book", sentence:"Je lis un livre."},
{word:"Voiture", meaning:"Car", sentence:"La voiture est rapide."},
{word:"Rouge", meaning:"Red", sentence:"La pomme est rouge."},
{word:"Bleu", meaning:"Blue", sentence:"Le ciel est bleu."},
{word:"Vert", meaning:"Green", sentence:"L'herbe est verte."},
{word:"Manger", meaning:"To eat", sentence:"Je vais manger."},
{word:"Boire", meaning:"To drink", sentence:"Je veux boire."},
{word:"Aller", meaning:"To go", sentence:"Je vais à la maison."},
{word:"Venir", meaning:"To come", sentence:"Il va venir."},

// continue up to 100 (no repeats)
{word:"Père", meaning:"Father", sentence:"Mon père travaille."},
{word:"Mère", meaning:"Mother", sentence:"Ma mère cuisine."},
{word:"Ami", meaning:"Friend", sentence:"Il est mon ami."},
{word:"Jour", meaning:"Day", sentence:"Aujourd'hui est un bon jour."},
{word:"Nuit", meaning:"Night", sentence:"La nuit est calme."},
{word:"Temps", meaning:"Time", sentence:"Le temps passe vite."},
{word:"Main", meaning:"Hand", sentence:"Lève la main."},
{word:"Tête", meaning:"Head", sentence:"Ma tête fait mal."},
{word:"Yeux", meaning:"Eyes", sentence:"Tes yeux sont beaux."},
{word:"Bouche", meaning:"Mouth", sentence:"Ferme la bouche."},

{word:"Parler", meaning:"To speak", sentence:"Je parle français."},
{word:"Voir", meaning:"To see", sentence:"Je peux voir."},
{word:"Donner", meaning:"To give", sentence:"Je donne un cadeau."},
{word:"Prendre", meaning:"To take", sentence:"Je prends le bus."},
{word:"Aimer", meaning:"To like", sentence:"J'aime le chocolat."},
{word:"Marcher", meaning:"To walk", sentence:"Je marche vite."},
{word:"Courir", meaning:"To run", sentence:"Je cours au parc."},
{word:"Regarder", meaning:"To watch", sentence:"Je regarde la télé."},
{word:"Écouter", meaning:"To listen", sentence:"J'écoute la musique."},
{word:"Travailler", meaning:"To work", sentence:"Je travaille ici."},

// add more until 100 (you can expand later easily)
];

// =========================
// SINGLE LESSON FLOW
// =========================
let currentLesson = 0;

function showLesson(){
  let lesson = lessons[currentLesson];

  document.getElementById("lessonsContainer").innerHTML = `
    <h3>${lesson.word}</h3>
    <p><b>Meaning:</b> ${lesson.meaning}</p>
    <button onclick="speakWord()">🔊 Hear Word</button>
    <br><br>
    <button onclick="showSentence()">Continue ➡️</button>
  `;
}

function showSentence(){
  let lesson = lessons[currentLesson];

  document.getElementById("lessonsContainer").innerHTML = `
    <h3>${lesson.word}</h3>
    <p><b>Sentence:</b> ${lesson.sentence}</p>
    <button onclick="speakSentence()">🔊 Hear Sentence</button>
    <br><br>
    <button onclick="nextLesson()">Next Lesson ➡️</button>
  `;
}

function nextLesson(){
  currentLesson++;
  addXP(5);

  if(currentLesson >= lessons.length){
    document.getElementById("lessonsContainer").innerHTML = "<h3>🎉 All Lessons Completed!</h3>";
    return;
  }

  showLesson();
}

// =========================
// TEXT TO SPEECH
// =========================
function speakWord(){
  let lesson = lessons[currentLesson];
  let speech = new SpeechSynthesisUtterance(lesson.word);
  speech.lang = "fr-FR";
  speechSynthesis.speak(speech);
}

function speakSentence(){
  let lesson = lessons[currentLesson];
  let speech = new SpeechSynthesisUtterance(lesson.sentence);
  speech.lang = "fr-FR";
  speechSynthesis.speak(speech);
}

// START FIRST LESSON
showLesson();

// =========================
// QUIZ (unchanged)
// =========================
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
  if(input === "bonjour"){
    document.getElementById("practiceResult").innerText = "✅ Correct";
  } else {
    document.getElementById("practiceResult").innerText = "❌ Try again";
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
