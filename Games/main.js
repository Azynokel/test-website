var iframeSources = [
    './Oversimplified Games/2048/index.html',
    //'./Oversimplified Games/FlappYBird',
    './Oversimplified Games/FlappYBirdRemastered/index.html',
    './Oversimplified Games/CadirrBird/index.html',
    //'./Oversimplified Games/GeometryDash',
    './Oversimplified Games/LockCracker/index.html',
    './Oversimplified Games/Snake/index.html',
    './Oversimplified Games/SpaceInvaders/index.html',
    './Oversimplified Games/StackIt/index.html',
    //'./Oversimplified Games/Tennis',
    './Oversimplified Games/TikTakToe/index.html',
    //'./Oversimplified Games',
    './Games/Blue/index.html',
    './Oversimplified Games/DogeGame/index.html',
    //'./Games/Goblin',
    './Games/Green/index.html',
    //'./Games/Pokemon',
    './Games/Red/index.html',
    './Oversimplified Games/WhatXAreYou/Pokemon/index.html'
    //'./Games/Test',
];

var iframe = document.getElementById('userGame');
var sidebar = document.getElementById('sidebar');
var touchstartX = 0;
var touchendX = 0;

sidebar.addEventListener('touchstart', function(event) {
    touchstartX = event.touches[0].clientX;
});

sidebar.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].clientX;
    handleSwipe();
});

window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        changeIframeSource(); 
    }
});

function handleSwipe() {
    if (touchendX - touchstartX < 100) {
        changeIframeSource();
    }
} 

function changeIframeSource() {
    var randomIndex = Math.floor(Math.random() * iframeSources.length);
    iframe.src = iframeSources[randomIndex];
}
