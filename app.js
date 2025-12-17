'use strict';

let currentImages = [];
let totalVotes = 0;
let rounds = 25;
let resultsChart = null;
let images = [];
//const stored= localStorage.getItem('images');
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            images.push({ name: item.name, filepath: item.filepath, clicks: 0, timesShown: 0 });
        });
        renderImages();
        document.getElementById('vote-button1').addEventListener('click', () => handleVote(0));
        document.getElementById('vote-button2').addEventListener('click', () => handleVote(1));
        document.getElementById('vote-button3').addEventListener('click', () => handleVote(2));
        document.getElementById('show-results').addEventListener('click', showResults);
        document.getElementById('show-results').disabled = true;
    });

function getThreeRandomImages() { //returns an array of three random images
    const randomImages = images.slice().sort(() => Math.random() - 0.5).slice(0, 3);
    randomImages.forEach(image => image.timesShown++);
    return randomImages;
}
function renderImages() { //renders the three random images
    currentImages = getThreeRandomImages();
    document.getElementById('image-1').src = currentImages[0].filepath;
    document.getElementById('image-2').src = currentImages[1].filepath;
    document.getElementById('image-3').src = currentImages[2].filepath;
}
function disableButtons() {
    document.getElementById('vote-button1').disabled = true;
    document.getElementById('vote-button2').disabled = true;
    document.getElementById('vote-button3').disabled = true;
    document.getElementById('show-results').disabled = false;
}
function handleVote(imgId) {
    if (totalVotes >= rounds) return;
    const votedImage = currentImages[imgId];
    if (!votedImage) return;
    votedImage.clicks++;
    totalVotes++;
    if (totalVotes >= rounds) {
        disableButtons();
        localStorage.setItem('images', JSON.stringify(images));
        document.getElementById('reset-button').disabled = false;
    } else {
        renderImages();
    }
}
function showResults() {
    if (resultsChart) {
        resultsChart.destroy();
    }
    resultsChart = new Chart(document.getElementById('results-chart'), {
        type: 'bar',
        data: {
            labels: images.map(image => image.name),
            datasets: [{
                label: 'Clicks',
                data: images.map(image => image.clicks),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Votes',
                data: images.map(image => image.timesShown),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            }],
        },
    });
}
function reset() {
    totalVotes = 0;
    if (resultsChart) {
        resultsChart.destroy();
    }
    images.forEach(image => {
        image.clicks = 0;
        image.timesShown = 0;
    });
    renderImages();
    document.getElementById('show-results').disabled = true;
    document.getElementById('reset-button').disabled = true;
    document.getElementById('vote-button1').disabled = false;
    document.getElementById('vote-button2').disabled = false;
    document.getElementById('vote-button3').disabled = false;
}
document.getElementById('reset-button').addEventListener('click', reset);
