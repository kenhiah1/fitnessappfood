const video = document.getElementById("video");
const scanBtn = document.getElementById("scan-btn");
const resultCard = document.getElementById("result-card");
const cancelBtn = document.getElementById("cancel-btn");
const addBtn = document.getElementById("add-btn");

const foodLabel = document.getElementById("food-label");
const foodCals = document.getElementById("food-cals");
const logList = document.getElementById("log-list");
const totalCalsEl = document.getElementById("total-cals");
const progressBar = document.getElementById("progress-bar");

let totalCals = 0;
const goal = 2000;

// 🎥 START CAMERA
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
      audio: false
    });
    video.srcObject = stream;
    video.play();
  } catch (err) {
    alert("Camera access denied or not available.");
    console.error(err);
  }
}

startCamera();

// 📸 CAPTURE IMAGE + FAKE AI RESULT
scanBtn.addEventListener("click", () => {
  // Create canvas
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // 👉 Here is where REAL AI would go later

  // Demo AI response
  const foods = [
    { name: "Grilled Chicken", cals: 320 },
    { name: "Caesar Salad", cals: 180 },
    { name: "Cheeseburger", cals: 540 },
    { name: "Pasta Bowl", cals: 420 }
  ];

  const pick = foods[Math.floor(Math.random() * foods.length)];

  foodLabel.textContent = pick.name;
  foodCals.textContent = pick.cals;

  resultCard.classList.remove("hidden");
});

cancelBtn.addEventListener("click", () => {
  resultCard.classList.add("hidden");
});

addBtn.addEventListener("click", () => {
  const cals = Number(foodCals.textContent);
  totalCals += cals;
  totalCalsEl.textContent = totalCals;

  const percent = Math.min((totalCals / goal) * 100, 100);
  progressBar.style.width = percent + "%";

  const item = document.createElement("div");
  item.className = "log-item";
  item.innerHTML = `<span>${foodLabel.textContent}</span><span>${cals} kcal</span>`;
  logList.prepend(item);

  resultCard.classList.add("hidden");
});
