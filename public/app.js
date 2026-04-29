let vocab = [];
let current = 0;
let score = 0;
let streak = 0;

const card = document.getElementById("card");
const feedback = document.getElementById("feedback");
const stats = document.getElementById("stats");

async function load(){
  const res = await fetch('/api/vocab');
  vocab = await res.json();
  show();
}

function show(){
  card.innerText = vocab[current].q;
}

function updateStats(){
  stats.innerText = `Score: ${score} | Streak: ${streak}`;
}

function submitAnswer(){
  const input = document.getElementById("answer").value.toLowerCase();
  const correct = vocab[current].a.toLowerCase();

  if(input.includes(correct)){
    streak++;
    score += 10000 + streak*200;
    feedback.innerText = "Correct";
  } else {
    streak = 0;
    feedback.innerText = "Wrong: " + vocab[current].a;
  }

  updateStats();
}

function nextCard(){
  current++;
  document.getElementById("answer").value="";

  if(current>=vocab.length){
    alert("Final Score: "+score);
    location.reload();
  }

  show();
}

async function sendChat(){
  const input = document.getElementById("chatInput");
  const msg = input.value;
  const log = document.getElementById("chatLog");

  log.innerHTML += `<div>You: ${msg}</div>`;

  const res = await fetch('/api/ask',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({message:msg, vocab})
  });
load();
