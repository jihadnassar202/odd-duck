'use strict';

function Product(name, filename) {
    this.name = name;
    this.filepath = `images/${filename}`;
    this.timesShown = 0;
    this.clicks = 0;
}
let currentImages = [];
let totalVotes = 0;
const rounds = 25;
let images = [
    new Product('odd duck 1', 'image copy 1.png'),
    new Product('odd duck 2', 'image copy 2.png'),
    new Product('odd duck 3', 'image copy 3.png'),
    new Product('odd duck 4', 'image copy 4.png'),
    new Product('odd duck 5', 'image copy 5.png'),
    new Product('odd duck 6', 'image copy 6.png'),
    new Product('odd duck 7', 'image copy 7.png'),
    new Product('odd duck 8', 'image copy 8.png'),
    new Product('odd duck 9', 'image copy 9.png'),
    new Product('odd duck 10', 'image copy 10.png'),
    new Product('odd duck 11', 'image copy 11.png'),
    new Product('odd duck 12', 'image copy 12.png'),
    new Product('odd duck 13', 'image copy 13.png'),
    new Product('odd duck 14', 'image copy 14.png'),
    new Product('odd duck 15', 'image copy 15.png'),
    new Product('odd duck 16', 'image copy 16.png'),
    new Product('odd duck 17', 'image copy 17.png'),
    new Product('odd duck 18', 'image copy 18.png'),
];

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

    } else {
        renderImages();
    }
}
function showResults() {
    const results = images.map(image => {
        const rate = image.timesShown ? (image.clicks / totalVotes) * 100 : 0;
        return `<div>${image.name}:${image.clicks} clicks, shown ${image.timesShown} times, rate ${rate.toFixed(2)}%</div>`;
    }).join('');
    document.getElementById('results-list').innerHTML = results;
}
renderImages();
document.getElementById('vote-button1').addEventListener('click', () => handleVote(0));
document.getElementById('vote-button2').addEventListener('click', () => handleVote(1));
document.getElementById('vote-button3').addEventListener('click', () => handleVote(2));
document.getElementById('show-results').addEventListener('click', showResults);
document.getElementById('show-results').disabled = true;

function reset() {
    totalVotes = 0;
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
