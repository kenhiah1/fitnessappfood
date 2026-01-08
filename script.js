const API_KEY = 'PASTE_YOUR_SPOONACULAR_KEY_HERE';
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const scanBtn = document.getElementById('scan-btn');
const resultCard = document.getElementById('result-card');
const totalCalsDisplay = document.getElementById('total-cals');
const progressBar = document.getElementById('progress-bar');

let totalCalories = 0;
let goal = 2000;
let currentItem = { name: '', cals: 0 };

// 1. Start Camera
async function startApp() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: "environment" } 
        });
        video.srcObject = stream;
    } catch (err) {
        document.getElementById('status-text').innerText = "Camera Error: Check HTTPS";
    }
}

// 2. Scan Logic
scanBtn.addEventListener('click', async () => {
    document.getElementById('status-text').innerText = "Analyzing...";
    
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('file', blob);

        try {
            const response = await fetch(`https://api.spoonacular.com/food/images/analyze?apiKey=${f5ddd3ff3a3f4820bca54e888f215062}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if(data.status === "success") {
                currentItem.name = data.category.name.replace(/_/g, ' ');
                currentItem.cals = Math.round(data.nutrition.calories.value);
                
                document.getElementById('food-label').innerText = currentItem.name.toUpperCase();
                document.getElementById('food-cals').innerText = currentItem.cals;
                resultCard.classList.remove('hidden');
                document.getElementById('status-text').innerText = "Match Found!";
            }
        } catch (e) {
            alert("Analysis failed. Check your API key or connection.");
        }
    }, 'image/jpeg');
});

// 3. Add to Daily Total
document.getElementById('add-btn').addEventListener('click', () => {
    totalCalories += currentItem.cals;
    updateUI();
    
    // Add to Visual Log
    const item = document.createElement('div');
    item.className = 'log-item';
    item.innerHTML = `<span>${currentItem.name}</span><span>${currentItem.cals} kcal</span>`;
    document.getElementById('log-list').prepend(item);
    
    resultCard.classList.add('hidden');
    document.getElementById('status-text').innerText = "Added! Scan another?";
});

document.getElementById('cancel-btn').addEventListener('click', () => {
    resultCard.classList.add('hidden');
});

function updateUI() {
    totalCalsDisplay.innerText = totalCalories;
    const percentage = Math.min((totalCalories / goal) * 100, 100);
    progressBar.style.width = percentage + '%';
}

startApp();