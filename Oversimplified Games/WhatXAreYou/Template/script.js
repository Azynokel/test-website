let currentCardIndex = 0;
const cards = document.querySelectorAll('.card');
let userChoices = {
    "A": 0,
    "B": 0,
    "C": 0,
    "D": 0,
    "E": 0,
    "F": 0,
    "G": 0,
    "H": 0,
};



cards.forEach(card => {
    card.addEventListener('click', function(event) {
        if (event.target.tagName === 'LABEL') {
            const metaInfo = event.target.getAttribute('data-meta');
            console.log("Text container pressed:", metaInfo);
            //userChoices.push(metaInfo); 

            userChoices["A"] += parseInt(metaInfo[0]);
            userChoices["B"] += parseInt(metaInfo[1]);
            userChoices["C"] += parseInt(metaInfo[2]);
            userChoices["D"] += parseInt(metaInfo[3]);
            userChoices["E"] += parseInt(metaInfo[4]);
            userChoices["F"] += parseInt(metaInfo[5]);
            userChoices["G"] += parseInt(metaInfo[6]);
            userChoices["H"] += parseInt(metaInfo[7]);

            console.log(userChoices);

            // Hide the current card
            const currentCard = cards[currentCardIndex];
            currentCard.classList.add('hidden');
            currentCardIndex++;

            // Show the next card if available
            if (currentCardIndex < cards.length - 1) {
                const nextCard = cards[currentCardIndex];
                setTimeout(() => {
                    nextCard.classList.remove('hidden');
                }, 500); // Delay to allow the fade-out to complete
            } else {
                showEndCard(userChoices);
            }
        }
    });
});

function showEndCard(choices) {
    const endCard = document.getElementById('end-card');
    const endCardImage = document.getElementById('end-card-image');
    const endCardTitle = document.getElementById('end-card-title');
    const endCardSubtext = document.getElementById('end-card-subtext');

    switch(getMaxChoice(userChoices)) {
        case "A": {
            endCardImage.src = "https://via.placeholder.com/300x150";
            endCardTitle.textContent = "You are: A!";
            endCardSubtext.textContent = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.";
            break;
        }
        case "B": {
            endCardImage.src = "https://via.placeholder.com/300x150";
            endCardTitle.textContent = "You are: B!";
            endCardSubtext.textContent = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.";
            break;
        }
        case "C": {
            endCardImage.src = "https://via.placeholder.com/300x150";
            endCardTitle.textContent = "You are: C!";
            endCardSubtext.textContent = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.";
            break;
        }
        case "D": {
            endCardImage.src = "https://via.placeholder.com/300x150";
            endCardTitle.textContent = "You are: D!";
            endCardSubtext.textContent = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.";
            break;
        }
        case "E": {
            endCardImage.src = "https://via.placeholder.com/300x150";
            endCardTitle.textContent = "You are: E!";
            endCardSubtext.textContent = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.";
            break;
        }
        case "F": {
            endCardImage.src = "https://via.placeholder.com/300x150";
            endCardTitle.textContent = "You are: F!";
            endCardSubtext.textContent = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.";
            break;
        }
        case "G": {
            endCardImage.src = "https://via.placeholder.com/300x150";
            endCardTitle.textContent = "You are: G!";
            endCardSubtext.textContent = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.";
            break;
        }
        case "H": {
            endCardImage.src = "https://via.placeholder.com/300x150";
            endCardTitle.textContent = "You are: H!";
            endCardSubtext.textContent = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.";
            break;
        }
    }

    endCard.classList.remove('hidden');
}

document.getElementById('restart-btn').addEventListener('click', function() {
    console.log("pressed")
    currentCardIndex = 0;
    userChoices = {
        "A": 0,
        "B": 0,
        "C": 0,
        "D": 0,
        "E": 0,
        "F": 0,
        "G": 0,
        "H": 0,
    };  

    document.getElementById('end-card').classList.add('hidden');
    cards.forEach(card => card.classList.add('hidden'));
    cards[0].classList.remove('hidden');  
});

function getMaxChoice(obj) {
    return Object.entries(obj).reduce((max, current) => {
        return current[1] > max[1] ? current : max;
    })[0]; // Return the key associated with the highest value
}