// NEW WORK-AROUND: Scan by Image URL
scanBtn.addEventListener('click', async () => {
    // Prompt the user for a link to a food photo
    const imgUrl = prompt("Paste a link to a food photo (from Google Images):");
    
    if (!imgUrl) return;

    statusText.innerText = "⚡ Analyzing link...";

    try {
        // Sending a URL is much more stable than sending a camera file
        const response = await fetch(`https://api.spoonacular.com/food/images/analyze?apiKey=${API_KEY}&imageUrl=${encodeURIComponent(imgUrl)}`);

        const data = await response.json();

        if(data.status === "success") {
            currentItem.name = data.category.name.replace(/_/g, ' ');
            currentItem.cals = Math.round(data.nutrition.calories.value);
            
            document.getElementById('food-label').innerText = currentItem.name.toUpperCase();
            document.getElementById('food-cals').innerText = currentItem.cals;
            resultCard.classList.remove('hidden');
            statusText.innerText = "Link Analyzed!";
        } else {
            alert("AI couldn't identify that link. Try another image.");
        }
    } catch (e) {
        alert("API Error: " + e.message);
    }
});
