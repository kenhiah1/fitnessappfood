const API_KEY = 'f5ddd3ff3a3f4820bca54e888f215062'; 

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const scanBtn = document.getElementById('scan-btn');
const resultCard = document.getElementById('result-card');
const totalCalsDisplay = document.getElementById('total-cals');
const progressBar = document.getElementById('progress-bar');

let totalCalories = 0;
let currentItem = { name: '', cals: 0 };

// START APP
async function startApp() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: "environment" } 
        });
        video.srcObject = stream;
        video.setAttribute("playsinline", true);
        await video.play();
        console.log("Camera started successfully");
    } catch (err) {
        alert("Camera Error: " + err.message);
    }
}

// SCANNING LOGIC
scanBtn.addEventListener('click', async () => {
    // 1. Capture the image
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 2. Convert to blob and send
    canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('file', blob);

        try {
            const url = `https://api.spoonacular.com/food/images/analyze?apiKey=${f5ddd3ff3a3f4820bca54e888f215062}`;
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.status === "success") {
                currentItem.name = data.category.name.replace(/_/g, ' ');
                currentItem.cals = Math.round(data.nutrition.calories.value);
                
                document.getElementById('food-label').innerText = currentItem.name.toUpperCase();
                document.getElementById('food-cals').innerText = currentItem.cals;
                resultCard.classList.remove('hidden');
            } else {
                alert("AI couldn't find food. Try moving closer!");
            }
        } catch (error) {
            alert("Connection Error. Check your API Key.");
        }
    }, 'image/jpeg');
});

// ADD CALORIES
document.getElementById('add-btn').addEventListener('click', () => {
    totalCalories += currentItem.cals;
    totalCalsDisplay.innerText = totalCalories;
    
    const percentage = Math.min((totalCalories / 2000) * 100, 100);
    progressBar.style.width = percentage + '%';
    
    resultCard.classList.add('hidden');
});

document.getElementById('cancel-btn').addEventListener('click', () => {
    resultCard.classList.add('hidden');
});

// Launch
startApp();
