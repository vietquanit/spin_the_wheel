let wheelCanvas = document.getElementById("wheel");
let ctx = wheelCanvas.getContext("2d");
let names = [
  "Liam",
  "Noah",
  "Oliver",
  "James",
  "Elijah",
  "Mateo",
  "Theodore",
  "Henry",
  "Role",
  "Ren",
];
let colors = ["#FF0000", "#FFD700", "#0000FF", "#008000"]; // Đỏ, Vàng Thư đậm, Xanh Blue, Xanh lá đậm
let currentRotation = 0;
let isSpinning = false;

function initializeWheel() {
  updateListUI();
  drawWheel();
}

function updateListUI() {
  const namesList = document.getElementById("namesList");
  namesList.innerHTML = "";
  names.forEach((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    namesList.appendChild(li);
  });
}

function updateResultUI(value) {
  const resultList = document.getElementById("resultList");
  const numberLi = document.querySelectorAll("#resultList li").length;
  
  const li = document.createElement("li");
  li.textContent = `${numberLi}. ${value}`;
  resultList.appendChild(li);
}

function drawWheel() {
  currentRotation = 0;
  wheelCanvas.width = 432;
  wheelCanvas.height = 432;
  const numSegments = names.length;
  const arcSize = (2 * Math.PI) / numSegments;
  ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
  for (let i = 0; i < numSegments; i++) {
    const angle = i * arcSize - Math.PI / 2 - arcSize / 2;
    ctx.beginPath();
    ctx.moveTo(216, 216);
    ctx.arc(216, 216, 216, angle, angle + arcSize);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    ctx.save();
    ctx.translate(216, 216);
    ctx.rotate(angle + arcSize / 2);
    ctx.fillStyle = "white";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "right";
    ctx.fillText(names[i], 180, 10);
    ctx.restore();
  }

  wheelCanvas.style.transform = `rotate(${currentRotation}deg)`;
}

function spinWheel() {
  if (isSpinning) return;
  isSpinning = true;
  const pointer = document.querySelector(".pointer");
  let spins = Math.floor(Math.random() * 5 + 5);
  const arcSize = 360 / names.length;
  const randomSegment = Math.floor(Math.random() * names.length); 

  
  const stopAngle = randomSegment * arcSize;
  currentRotation = spins * 360 + stopAngle;
  const spinDuration = 3000;
  wheelCanvas.style.transition = `transform ${spinDuration}ms ease-out`;
  wheelCanvas.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    
    pointer.style.backgroundColor = "#2658A5";
    isSpinning = false;
    let resultIndex = randomSegment == 0 ? 0 : names.length - randomSegment;
    updateResultUI(names[resultIndex]);
  }, spinDuration);
}

function updateWheel() {
  const namesList = document.getElementById("namesList").children;
  names = Array.from(namesList)
    .map((li) => li.textContent.trim())
    .filter((name) => name);
  drawWheel();
}

initializeWheel();
