// Canvas Related 
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
const socket = io('/pong');
let isPlayer2 = false;
let paddleIndex = 0;

let namePlayer = "";

let width = 500;
let height = 700;

// Paddle
let paddleHeight = 10;
let paddleWidth = 50;
let paddleDiff = 25;
let paddleX = [225, 225];
let trajectoryX = [0, 0];
let playerMoved = false;

// Ball
let ballX = 250;
let ballY = 350;
let ballRadius = 5;
let ballDirection = 1;

// Speed
let speedY = 2;
let speedX = 0;

// Score for Both Players
let score = [0, 0];

// Timer
let timer = 10;
let time = getTimeInSeconds();

// Winner
let winner = -1;
let finished = false;

function getTimeInSeconds(){
  var dt = new Date();
  return dt.getSeconds();
}

// Create Canvas Element
function createCanvas() {
  canvas.id = 'canvas';
  canvas.width = width;
  canvas.height = height;
  //document.body.appendChild(canvas);
  renderCanvas();
}

// Wait for Opponents
function renderIntro() {
  // Canvas Background
  context.fillStyle = 'black';
  context.fillRect(0, 0, width, height);

  // Intro Text
  context.fillStyle = 'white';
  context.font = "32px Courier New";
  context.fillText("Waiting for opponent...", 20, (canvas.height / 2) - 30);
}

// Render Everything on Canvas
function renderCanvas() {
  // Canvas Background
  context.fillStyle = 'black';
  context.fillRect(0, 0, width, height);

  // Paddle Color
  context.fillStyle = 'white';

  // Bottom Paddle
  context.fillRect(paddleX[0], height - 20, paddleWidth, paddleHeight);

  // Top Paddle
  context.fillRect(paddleX[1], 10, paddleWidth, paddleHeight);

  // Dashed Center Line
  context.beginPath();
  context.setLineDash([4]);
  context.moveTo(80, 350);
  context.lineTo(500, 350);
  context.strokeStyle = 'grey';
  context.stroke();

  // Ball
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 2 * Math.PI, false);
  context.fillStyle = 'white';
  context.fill();

  // Score
  context.font = "32px Courier New";
  context.fillText(score[0], 20, (canvas.height / 2) + 90);
  context.fillText(timer, 20, (canvas.height / 2) + 10);
  context.fillText(score[1], 20, (canvas.height / 2) - 70);
}

// Reset Ball to Center
function ballReset() {
  ballX = width / 2;
  ballY = height / 2;
  speedY = 3;
  socket.emit('ballMove', {
    ballX,
    ballY,
    score,
  });
}

// Adjust Ball Movement
function ballMove() {
  // Vertical Speed
  ballY += speedY * ballDirection;
    
  // Horizontal Speed
  if (playerMoved) {
    ballX += speedX;
  }
  socket.emit('ballMove', {
    ballX,
    ballY,
    score,
  });
}

function calculateWinner(){
  if(score[0] > score[1]){
    winner = 2;
  }
  else if(score[0] < score[1]){
    winner = 1;
  }
  else{
    winner = 0;
  }
}

function timerUpdate(){
  if(timer == 0){
    calculateWinner();
    console.log("Game finished, player ",winner," won");
    socket.emit('finished',{
      winner,
    });
    finished = true;
  }
  else{
    if(getTimeInSeconds() != time){
      timer -= 1;
      time = getTimeInSeconds();
      socket.emit('timer',{
        timer,
      });
    }
  }
}

// Determine What Ball Bounces Off, Score Points, Reset Ball
function ballBoundaries() {
  // Bounce off Left Wall
  if (ballX < 0 && speedX < 0) {
    speedX = -speedX;
  }
  // Bounce off Right Wall
  if (ballX > width && speedX > 0) {
    speedX = -speedX;
  }
  // Bounce off player paddle (bottom)
  if (ballY > height - paddleDiff) {
    if (ballX >= paddleX[0] && ballX <= paddleX[0] + paddleWidth) {
      // Add Speed on Hit
      if (playerMoved) {
        speedY += 1;
        // Max Speed
        if (speedY > 5) {
          speedY = 5;
        }
      }
      ballDirection = -ballDirection;
      trajectoryX[0] = ballX - (paddleX[0] + paddleDiff);
      speedX = trajectoryX[0] * 0.3;
    } else {
      // Reset Ball, add to Computer Score
      ballReset();
      score[1]++;
    }
  }
  // Bounce off computer paddle (top)
  if (ballY < paddleDiff) {
    if (ballX >= paddleX[1] && ballX <= paddleX[1] + paddleWidth) {
      // Add Speed on Hit
      if (playerMoved) {
        speedY += 1;
        // Max Speed
        if (speedY > 5) {
          speedY = 5;
        }
      }
      ballDirection = -ballDirection;
      trajectoryX[1] = ballX - (paddleX[1] + paddleDiff);
      speedX = trajectoryX[1] * 0.3;
    } else {
      ballReset();
      score[0]++;
    }
  }
}

// Called Every Frame
function animate() {
  if(!finished){
    if (isPlayer2) {
      ballMove();
      ballBoundaries();
      timerUpdate();
    }
    renderCanvas();
    window.requestAnimationFrame(animate);
  }
  else{
    showWinner();
  }
}

// Load Game, Reset Everything
function loadGame() {
  createCanvas();
  renderIntro();
  socket.emit('ready');
}

function startGame() {
  paddleIndex = isPlayer2 ? 0 : 1;
  window.requestAnimationFrame(animate);
  canvas.addEventListener('mousemove', (e) => {
    playerMoved = true;
    paddleX[paddleIndex] = e.offsetX;
    if (paddleX[paddleIndex] < 0) {
      paddleX[paddleIndex] = 0;
    }
    if (paddleX[paddleIndex] > (width - paddleWidth)) {
      paddleX[paddleIndex] = width - paddleWidth;
    }
    socket.emit('paddleMove', {
      xPosition: paddleX[paddleIndex],
    });
    // Hide Cursor
    canvas.style.cursor = 'none';
  });
}

// On Load

/*function checkCredentials() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  if (username === "admin" && password === "password") {
    alert("Login successful!");
    document.getElementById("popup").style.display = "none";
    document.getElementById("popup_btn").style.display = "none";
    loadGame();
  } else {
    alert("Invalid credentials. Please try again.");
  }
}*/

function checkCredentials() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  namePlayer = username;

  const query = `query login($username: String!, $password: String!) { login(username: $username, password: $password) }`;

  const variables = {
      "username": username,
      "password": password
  };

  console.log(JSON.stringify({ query, variables }));

  fetch('http://127.0.0.1:5000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables })
  })
      .then(res => res.json())
      .then(data => {
          if (data.data.login === "0") {
              console.log("login failed");
              alert("Invalid credentials. Please try again.");
            } else {
              console.log("login successful: ",data.data.login);
              document.getElementById("popup").style.display = "none";
              loadGame();
          }
      });
}

function createUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  namePlayer = username;

  const query = `query createuser($username: String!, $password: String!) { createuser(username: $username, password: $password) }`;

  const variables = {
      "username": username,
      "password": password
  };

  console.log(JSON.stringify({ query, variables }));

  fetch('http://127.0.0.1:5000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables })
  })
      .then(res => res.json())
      .then(data => {
          if (data.data.login === "0") {
              console.log("Create user failed");
              alert("Create user failed");
            } else {
              console.log("Create user successful: ",data.data.login);
              alert("User created, you can now login.");
              //document.getElementById("popup").style.display = "none";
              //document.getElementById("popup_btn").style.display = "none";
              //loadGame();
          }
      });
}

function showWinner(){
  document.getElementById("winner-popup").style.display = "block";
  document.getElementById("winner-text").style.display = "block";
  document.getElementById("winner-text1").style.display = "block";
  document.getElementById("winner-text2").style.display = "block";
  document.getElementById("winner-text3").style.display = "block";
  document.getElementById("restart-btn").style.display = "block, center";
  document.getElementById("container").style.display = "none";
  let message = "";
  let message1 = "";
  let message2 = "";
  if(!isPlayer2){
    message1 = " (You)";
  }
  else{
    message2 = " (You)";
  }

  if(winner = 0){
    message = "It is a tie";
  }
  else if(winner = 1){
    message = "Player 1 won"+message1;
  }
  else if(winner = 2){
    message = "Player 2 won"+message2;
  }
  document.getElementById("winner-text").textContent = message;
  document.getElementById("winner-text1").textContent = "Scores:";
  document.getElementById("winner-text2").textContent = "Player 1: "+score[1]+message1;
  document.getElementById("winner-text3").textContent = "Player 2: "+score[0]+message2;
}

function restart(){
  window.location.reload();
}


socket.on('connect', () => {
  console.log('Connected as...', socket.id);
});

socket.on('startGame', (refereeId) => {
  console.log('Referee is', refereeId);

  isPlayer2 = socket.id === refereeId;
  console.log("I am Player 2: ",isPlayer2);
  startGame();
  if(!isPlayer2){
    document.getElementById("textPlayer1").textContent = "Player 1: "+namePlayer;
  }
  else{
    document.getElementById("textPlayer2").textContent = "Player 2: "+namePlayer;
  }
  
});

socket.on('paddleMove', (paddleData) => {
  // Toggle 1 into 0, and 0 into 1
  const opponentPaddleIndex = 1 - paddleIndex;
  paddleX[opponentPaddleIndex] = paddleData.xPosition;
});

socket.on('ballMove', (ballData) => {
  ({ ballX, ballY, score } = ballData);
});

socket.on('timer', (timerTime) => {
  ({timer} = timerTime);
});

socket.on('finished', (winnerId) => {
  ({winner} = winnerId);
  console.log("Game finished, player ",winner," won");
  finished = true;
});
















/*import gql from 'graphql-tag';

const CREATE_USER_MUTATION = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      id
      name
      age
    }
  }
`;

const input = {
  name: "John",
  age: 25
}

client
  .mutate({
    mutation: CREATE_USER_MUTATION,
    variables: { input },
  })
  .then(response => {
    console.log(response.data.createUser);
  });

// Nieuw
const query = `
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password)
}
`;

const variables = {
  username: "admin",
  password: "password"
};

fetch('/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query, variables })
})
  .then(res => res.json())
  .then(data => {
    if (data.data.login === 1) {
      console.log("login successful");
    } else {
      console.log("login failed");
    }
  });
*/