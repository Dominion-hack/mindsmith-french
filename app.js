// ================= USER DATA =================
let user = localStorage.getItem("user");
let lessonIndex = parseInt(localStorage.getItem("lesson")) || 0;
let xp = parseInt(localStorage.getItem("xp")) || 0;
let level = parseInt(localStorage.getItem("level")) || 1;
let coins = parseInt(localStorage.getItem("coins")) || 0;
let money = parseFloat(localStorage.getItem("money")) || 0;

// ================= LOGIN =================
function login(){
  let name = document.getElementById("username").value;
  if(!name) return alert("Enter name");

  user = name;
  localStorage.setItem("user", name);

  document.getElementById("welcome").innerText = "Welcome " + name;

  loadLesson();
  updateUI();
  loadMissions();
}

// ================= UI =================
function updateUI(){
  xpEl("xp", "XP:"+xp);
  xpEl("level", "Lv:"+level);
  xpEl("coins", "🪙"+coins);
  xpEl("money", "$"+money);
}

function xpEl(id,text){
  document.getElementById(id).innerText = text;
}

// ================= LESSONS (100 UNIQUE) =================
let lessons = [
"Bonjour","Merci","Chat","Chien","Maison","École","Livre","Voiture","Pain","Eau",
"Rouge","Bleu","Vert","Jaune","Noir","Blanc","Manger","Boire","Aller","Venir",
"Père","Mère","Ami","Jour","Nuit","Temps","Main","Tête","Yeux","Bouche",
"Parler","Voir","Donner","Prendre","Aimer","Marcher","Courir","Regarder","Écouter","Travailler",
"Ville","Route","Parc","Mer","Montagne","Forêt","Soleil","Pluie","Vent","Neige",
"Chaise","Table","Porte","Fenêtre","Stylo","Cahier","Sac","Chaussure","Chapeau","Montre",
"Ordinateur","Téléphone","Clavier","Souris","Écran","Application","Internet","Mot","Phrase","Question",
"Réponse","Langue","Apprendre","Étudier","Comprendre","Parfait","Facile","Difficile","Rapide","Lent",
"Heure","Minute","Seconde","Matin","Soir","Midi","Hier","Demain","Aujourd'hui","Toujours"
];

// ================= LESSON FLOW =================
function loadLesson(){
  if(!user) return;

  let word = lessons[lessonIndex];

  document.getElementById("lessonBox").innerHTML = `
    <h2>${word}</h2>
    <button onclick="speak('${word}')">🔊</button>
    <button onclick="showSentence()">Continue</button>
  `;
}

function showSentence(){
  let word = lessons[lessonIndex];

  document.getElementById("lessonBox").innerHTML = `
    <p>Je vois ${word}</p>
    <button onclick="quiz()">Quiz</button>
  `;
}

function quiz(){
  let word = lessons[lessonIndex];

  document.getElementById("lessonBox").innerHTML = `
    <p>${word} means?</p>
    <button onclick="correct()">Correct</button>
    <button onclick="wrong()">Wrong</button>
  `;
}

function correct(){
  xp += 10;
  coins += 5;
  nextLesson();
}

function wrong(){
  nextLesson();
}

function nextLesson(){
  lessonIndex++;
  save();

  if(lessonIndex >= lessons.length){
    document.getElementById("lessonBox").innerHTML = "🎉 Done!";
    return;
  }

  updateUI();
  loadLesson();
}

// ================= SAVE =================
function save(){
  localStorage.setItem("lesson", lessonIndex);
  localStorage.setItem("xp", xp);
  localStorage.setItem("level", level);
  localStorage.setItem("coins", coins);
  localStorage.setItem("money", money);
}

// ================= MISSIONS =================
function loadMissions(){
  document.getElementById("mission1").innerText = "Finish 3 lessons (+20 coins)";
  document.getElementById("mission2").innerText = "Earn 50 XP (+10 coins)";
  document.getElementById("mission3").innerText = "Use voice 1 time (+5 coins)";
}

// ================= SHOP =================
function buy(item){
  if(coins < 20) return alert("Not enough coins");
  coins -= 20;
  updateUI();
  alert("Bought " + item);
}

// ================= MONEY =================
function convertCoins(){
  if(coins < 100) return alert("Need 100 coins");

  coins -= 100;
  money += 1;

  save();
  updateUI();

  alert("$1 added!");
}

// ================= SPEECH =================
function speak(text){
  let u = new SpeechSynthesisUtterance(text);
  u.lang = "fr-FR";
  speechSynthesis.speak(u);
}

// ================= VOICE =================
function startVoice(){
  let rec = new (webkitSpeechRecognition || SpeechRecognition)();
  rec.onresult = e=>{
    let t = e.results[0][0].transcript.toLowerCase();
    if(t.includes("hello")) speak("bonjour");
    else speak("je ne comprends pas");
  };
  rec.start();
}

// AUTO LOAD
if(user){
  document.getElementById("welcome").innerText = "Welcome back " + user;
  updateUI();
  loadLesson();
  loadMissions();
}
