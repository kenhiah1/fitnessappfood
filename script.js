/* ======================
   FOOD DATABASE
====================== */

const foodDB = {
  "white rice": 130,
  "brown rice": 112,
  "pasta": 131,
  "quinoa": 120,
  "oatmeal": 62,
  "corn": 96,

  "chicken breast": 165,
  "chicken thigh": 209,
  "ground beef": 250,
  "salmon": 206,
  "tuna": 86,
  "egg": 78,
  "tofu": 144,

  "cucumber": 15,
  "spinach": 23,
  "broccoli": 35,
  "carrot": 41,
  "apple": 52,
  "banana": 89,
  "potato": 93,
  "avocado": 160,

  "whole milk": 61,
  "greek yogurt": 59,
  "cheddar cheese": 403,
  "butter": 717,
  "almond milk": 13,

  "white bread": 265,
  "french fries": 312,
  "pizza": 298,
  "chocolate": 535,
  "potato chips": 536,
  "peanut butter": 588,
  "almonds": 579
};

/* ======================
   ELEMENTS
====================== */

const video = document.getElementById("video");
const foodInput = document.getElementById("food-input");
const micBtn = document.getElementById("mic-btn");
const addFoodBtn = document.getElementById("add-food-btn");

const resultCard = document.getElementById("result-card");
const foodLabel = document.getElementById("food-label");
const foodCals = document.getElementById("food-cals");
const confirmAdd = document.getElementById("confirm-add");

const logList = document.getElementById("log-list");
const totalCalsEl = document.getElementById("total-cals");
const progressBar = document.getElementById("progress-bar");

let totalCals = 0;
const goal = 2000;
let currentFood = null;

/* ======================
   CAMERA
====================== */
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => video.srcObject = stream)
  .catch(() => console.log("Camera disabled"));

/* ======================
   FOOD LOOKUP FUNCTION
====================== */
function lookupFood(name) {
  return foodDB[name.toLowerCase().trim()] || null;
}

/* ======================
   ADD FOOD BUTTON
====================== */
addFoodBtn.onclick = () => {
  const food = foodInput.value;
  if (!food) return alert("Please type or say a food.");

  const calories = lookupFood(food);
  if (!calories) return alert(`Food "${food}" not found.`);

  currentFood = { name: food, calories };

  // Show result card (optional)
  foodLabel.textContent = currentFood.name;
  foodCals.textContent = currentFood.calories;
  resultCard.classList.remove("hidden");
};

/* ======================
   CONFIRM ADD
====================== */
confirmAdd.onclick = () => {
  if (!currentFood) return;

  // Add to total
  totalCals += currentFood.calories;
  totalCalsEl.textContent = totalCals;

  // Update progress bar
  const percent = Math.min((totalCals / goal) * 100, 100);
  progressBar.style.width = percent + "%";

  // Add to log
  const item = document.createElement("div");
  item.className = "log-item";
  item.innerHTML = `<span>${currentFood.name}</span><span>${currentFood.calories} kcal</span>`;
  logList.prepend(item);

  // Reset
  currentFood = null;
  foodInput.value = "";
  resultCard.classList.add("hidden");
};

/* ======================
   VOICE INPUT
====================== */
if ("webkitSpeechRecognition" in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";

  micBtn.onclick = () => recognition.start();

  recognition.onresult = (event) => {
    foodInput.value = event.results[0][0].transcript;
  };
} else {
  micBtn.disabled = true;
  micBtn.textContent = "❌";
}
