'use strict';
let storedData = JSON.parse(localStorage.getItem('odd-duck') || '{}');
function Product(name, filename, timesShown = 0, clicks = 0) {
    this.name = name;
    this.filepath = filename;
    this.timesShown = timesShown;
    this.clicks = clicks;
}
let previousImages = [];
let currentImages = [];
let totalVotes = 0;
const rounds = 25;
let resultsChart = null;
let images = [
    new Product('odd duck 1', 'image_copy_1.png'),
    new Product('odd duck 2', 'image_copy_2.png'),
    new Product('odd duck 3', 'image_copy_3.png'),
    new Product('odd duck 4', 'image_copy_4.png'),
    new Product('odd duck 5', 'image_copy_5.png'),
    new Product('odd duck 6', 'image_copy_6.png'),
    new Product('odd duck 7', 'image_copy_7.png'),
    new Product('odd duck 8', 'image_copy_8.png'),
    new Product('odd duck 9', 'image_copy_9.png'),
    new Product('odd duck 10', 'image_copy_10.png'),
    new Product('odd duck 11', 'image_copy_11.png'),
    new Product('odd duck 12', 'image_copy_12.png'),
    new Product('odd duck 13', 'image_copy_13.png'),
    new Product('odd duck 14', 'image_copy_14.png'),
    new Product('odd duck 15', 'image_copy_15.png'),
    new Product('odd duck 16', 'image_copy_16.png'),
    new Product('odd duck 17', 'image_copy_17.png'),
    new Product('odd duck 18', 'image_copy_18.png'),
];

function loadStoredData() {
    let storedData = JSON.parse(localStorage.getItem('odd-duck') || '{}');
    if (storedData.images) {
        images = storedData.images.map(image => new Product(image.name, image.filepath, image.timesShown, image.clicks));
    }
    if (storedData.totalVotes) {
        totalVotes = storedData.totalVotes;
    }
    if (totalVotes >= rounds) {
        disableButtons();
    }
}

function saveStoredData() {
    localStorage.setItem('odd-duck', JSON.stringify({ images, totalVotes }));
}

function getThreeRandomImages() { //returns an array of three unique random images
    let chosenNumbers = [];//array to store the chosen numbers
    while (chosenNumbers.length < 3) {
        let randomNum = Math.floor(Math.random() * images.length);
        if (chosenNumbers.includes(randomNum) || previousImages.includes(randomNum)) {
            continue;
        }
        chosenNumbers.push(randomNum);
    }
    previousImages = chosenNumbers.slice();//store the chosen numbers in the previous images array
    let randomImages = chosenNumbers.map(num => images[num]);
    randomImages.forEach(image => image.timesShown++);
    return randomImages;
}
function renderImages() { //renders the three random images
    currentImages = getThreeRandomImages();
    document.getElementById('image-1').src = `images/${currentImages[0].filepath}`;
    document.getElementById('image-2').src = `images/${currentImages[1].filepath}`;
    document.getElementById('image-3').src = `images/${currentImages[2].filepath}`;
}
function disableButtons() {
    document.getElementById('vote-button1').disabled = true;
    document.getElementById('vote-button2').disabled = true;
    document.getElementById('vote-button3').disabled = true;
    document.getElementById('show-results').disabled = false;
    document.getElementById('reset-button').disabled = false;
}
function handleVote(imgId) {
    if (totalVotes >= rounds) return;
    currentImages[imgId].clicks++;
    totalVotes++;
    saveStoredData();
    if (totalVotes >= rounds) {
        disableButtons();

    } else {
        renderImages();
    }

}
function showResults() {
    console.log(images);
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
                label: 'times shown',
                data: images.map(image => image.timesShown),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            }],
        },
    });
}
loadStoredData();
renderImages();
document.getElementById('vote-button1').addEventListener('click', () => handleVote(0));
document.getElementById('vote-button2').addEventListener('click', () => handleVote(1));
document.getElementById('vote-button3').addEventListener('click', () => handleVote(2));
document.getElementById('show-results').addEventListener('click', showResults);

function reset() {
    localStorage.removeItem('odd-duck');
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
