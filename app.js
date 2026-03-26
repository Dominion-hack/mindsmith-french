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
let lessons = ["🌚Lesson 1: Greetings
Bonjour – Hello (formal)
Salut – Hi / Bye (informal)
Bonsoir – Good evening
Bonne nuit – Good night
Ça va? – How are you?
Comment ça va? – How’s it going?
Très bien – Very good
Merci – Thank you
Merci beaucoup – Thank you very much
De rien – You’re welcome
🌚Lesson 2: Numbers 1–10
Un – 1
Deux – 2
Trois – 3
Quatre – 4
Cinq – 5
Six – 6
Sept – 7
Huit – 8
Neuf – 9
Dix – 10
🌚Lesson 3: Family
Père – Father
Mère – Mother
Frère – Brother
Soeur – Sister
Fils – Son
Fille – Daughter
Grand-père – Grandfather
Grand-mère – Grandmother
Oncle – Uncle
Tante – Aunt
🌚Lesson 4: Days of the Week
Lundi – Monday
Mardi – Tuesday
Mercredi – Wednesday
Jeudi – Thursday
Vendredi – Friday
Samedi – Saturday
Dimanche – Sunday
🌚Lesson 5: Common Phrases
Oui – Yes
Non – No
Peut-être – Maybe
S’il vous plaît – Please
Excusez-moi – Excuse me
Je suis désolé – I’m sorry
Je ne comprends pas – I don’t understand
Parlez-vous anglais? – Do you speak English?
Je m’appelle… – My name is…
Enchanté(e) – Nice to meet you
🌚Lesson 6: Colors
Rouge – Red
Bleu – Blue
Vert – Green
Jaune – Yellow
Noir – Black
Blanc – White
Orange – Orange
Rose – Pink
Marron – Brown
Gris – Gray
🌚Lesson 7: Food & Drink
Pain – Bread
Eau – Water
Lait – Milk
Café – Coffee
Thé – Tea
Vin – Wine
Fromage – Cheese
Fruits – Fruits
Légumes – Vegetables
Poulet – Chicken
🌚Lesson 8: Common Verbs
Être – To be
Avoir – To have
Aller – To go
Faire – To do / make
Dire – To say
Voir – To see
Manger – To eat
Boire – To drink
Venir – To come
Prendre – To take
🌚Lesson 9: Places
Maison – House
École – School
Magasin – Store
Rue – Street
Parc – Park
Restaurant – Restaurant
Hôpital – Hospital
Gare – Train station
Église – Church
Plage – Beach
🌚Lesson 10: Questions
Qui? – Who?
Quoi? – What?
Où? – Where?
Quand? – When?
Pourquoi? – Why?
Comment? – How?
Combien? – How much / How many?
Quel / Quelle? – Which?
Lequel / Laquelle? – Which one?
Est-ce que…? – Is it…?
🌚Lesson 11: Directions
À gauche – Left
À droite – Right
Tout droit – Straight ahead
Près – Near
Loin – Far
Ici – Here
Là-bas – There
Devant – In front
Derrière – Behind
Entre – Between
🌚Lesson 12: Weather
Il fait chaud – It’s hot
Il fait froid – It’s cold
Il pleut – It’s raining
Il neige – It’s snowing
Il fait du soleil – It’s sunny
Il fait du vent – It’s windy
Nuageux – Cloudy
Orage – Storm
Brouillard – Fog
Temps – Weather
🌚Lesson 13: Time
Heure – Hour
Minute – Minute
Seconde – Second
Aujourd’hui – Today
Demain – Tomorrow
Hier – Yesterday
Matin – Morning
Après-midi – Afternoon
Soir – Evening
Nuit – Night
🌚Lesson 14: Transportation
Voiture – Car
Bus – Bus
Train – Train
Avion – Plane
Vélo – Bicycle
Moto – Motorcycle
Métro – Subway
Taxi – Taxi
Bateau – Boat
Route – Road
🌚Lesson 15: Shopping
Acheter – To buy
Vendre – To sell
Cher – Expensive
Bon marché – Cheap
Magasin – Store
Marché – Market
Panier – Basket
Caisse – Cash register
Prix – Price
Argent – Money
🌚Lesson 16: Clothing
Chemise – Shirt
Pantalon – Pants
Robe – Dress
Chaussures – Shoes
Chapeau – Hat
Manteau – Coat
Pull – Sweater
Jupe – Skirt
Chaussettes – Socks
Gants – Gloves
🌚Lesson 17: Body Parts
Tête – Head
Cheveux – Hair
Yeux – Eyes
Oreilles – Ears
Nez – Nose
Bouche – Mouth
Main – Hand
Pied – Foot
Jambe – Leg
Bras – Arm
🌚Lesson 18: Animals
Chat – Cat
Chien – Dog
Oiseau – Bird
Poisson – Fish
Cheval – Horse
Vache – Cow
Mouton – Sheep
Cochon – Pig
Lapin – Rabbit
Serpent – Snake
🌚Lesson 19: School
École – School
Classe – Classroom
Professeur – Teacher
Étudiant(e) – Student
Cahier – Notebook
Livre – Book
Crayon – Pencil
Stylo – Pen
Tableau – Blackboard
Examen – Exam
🌚Lesson 20: Technology
Téléphone – Phone
Ordinateur – Computer
Internet – Internet
Clavier – Keyboard
Souris – Mouse
Écran – Screen
Application – App
Email – Email
Mot de passe – Password
Wi-Fi – Wi-Fi"];

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
