let currentCardIndex = 0;
let pokemonList;
const cards = document.querySelectorAll('.card');

init();

cards.forEach(card => {
    card.addEventListener('click', function(event) {
        if (event.target.tagName === 'LABEL') {
            const metaInfo = event.target.getAttribute('data-meta');
            console.log("Text container pressed:", metaInfo);
            //userChoices.push(metaInfo); 

            for (i = 0; i < 150; i++) {
                pokemonList[i].value += parseInt(metaInfo[i])
            }

            console.log(pokemonList);

            // Hide the current card
            const currentCard = cards[currentCardIndex];
            currentCard.classList.add('hidden');
            currentCardIndex++;

            // Show the next card if available
            if (currentCardIndex < cards.length - 1) {
                const nextCard = cards[currentCardIndex];
                nextCard.classList.remove('hidden');
            } else {
                showEndCard(pokemonList);
            }
        }
    });
});

function showEndCard(choices) {
    const endCard = document.getElementById('end-card');
    const endCardImage = document.getElementById('end-card-image');
    const endCardTitle = document.getElementById('end-card-title');
    const endCardSubtext = document.getElementById('end-card-subtext');

    let index = getHighestValuePokemon(pokemonList);
    endCardImage.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (index + 1) + ".png";
    endCardTitle.textContent = "You are: " + pokemonList[index].name;
    endCardSubtext.textContent = pokemonList[index].description;
        

    endCard.classList.remove('hidden');
    setTimeout(() => {
        endCard.style.zIndex = 21;
    }, 500); // Delay to allow the fade-out to complete
}

document.getElementById('restart-btn').addEventListener('click', function() {
    console.log("pressed")
    init();

    document.getElementById('end-card').classList.add('hidden');
    cards.forEach(card => card.classList.add('hidden'));
    cards[0].classList.remove('hidden');  
});

function getHighestValuePokemon(pokemonList) {
    let highestIndex = 0; 

    for (i = 1; i < pokemonList.length; i++) {
        if (pokemonList[i].value > pokemonList[highestIndex].value) {
            highestIndex = i; 
        }
    }

    console.log(highestIndex);
    return highestIndex;
}

function init() {
    currentCardIndex = 0;
    pokemonList = [
        { name: "Bulbasaur", value: 0, description: "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon." },
        { name: "Ivysaur", value: 0, description: "When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs." },
        { name: "Venusaur", value: 0, description: "The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight." },
        { name: "Charmander", value: 0, description: "Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail." },
        { name: "Charmeleon", value: 0, description: "When it swings its burning tail, it elevates the temperature to unbearably high levels." },
        { name: "Charizard", value: 0, description: "Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally." },
        { name: "Squirtle", value: 0, description: "After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth." },
        { name: "Wartortle", value: 0, description: "Often hides in water to stalk unwary prey. For swimming fast, it moves its ears to maintain balance." },
        { name: "Blastoise", value: 0, description: "A brutal Pokémon with pressurized water jets on its shell. They are used for high-speed tackles." },
        { name: "Caterpie", value: 0, description: "Its short feet are tipped with suction pads that enable it to tirelessly climb slopes and walls." },
        { name: "Metapod", value: 0, description: "This Pokémon is vulnerable to attack while its shell is soft, exposing its weak and tender body." },
        { name: "Butterfree", value: 0, description: "In battle, it flaps its wings at great speed to release highly toxic dust into the air." },
        { name: "Weedle", value: 0, description: "Often found in forests, eating leaves. It has a sharp venomous stinger on its head." },
        { name: "Kakuna", value: 0, description: "Almost incapable of moving, this Pokémon can only harden its shell to protect itself from predators." },
        { name: "Beedrill", value: 0, description: "Flies at high speed and attacks using the large venomous stingers on its forelegs and tail." },
        { name: "Pidgey", value: 0, description: "A common sight in forests and woods. It flaps its wings at ground level to kick up blinding sand." },
        { name: "Pidgeotto", value: 0, description: "Very protective of its sprawling territorial area, this Pokémon will fiercely peck at any intruder." },
        { name: "Pidgeot", value: 0, description: "When hunting, it skims the surface of water at high speed to pick off unwary prey such as Magikarp." },
        { name: "Rattata", value: 0, description: "Bites anything when it attacks. Small and very quick, it is a common sight in many places." },
        { name: "Raticate", value: 0, description: "It uses its whiskers to maintain its balance. It apparently slows down if they are cut off." },
        { name: "Spearow", value: 0, description: "Inept at flying high. However, it can fly around very fast to protect its territory." },
        { name: "Fearow", value: 0, description: "A Pokémon that dates back many years. If it senses danger, it flies high and away, instantly." },
        { name: "Ekans", value: 0, description: "It sneaks through grass without making a sound and strikes unsuspecting prey from behind." },
        { name: "Arbok", value: 0, description: "The frightening patterns on its belly have been studied. Six variations have been confirmed." },
        { name: "Pikachu", value: 0, description: "It keeps its tail raised to monitor its surroundings. If you yank its tail, it will try to bite you." },
        { name: "Raichu", value: 0, description: "If its electric pouches run empty, it raises its tail to gather electricity from the atmosphere." },
        { name: "Sandshrew", value: 0, description: "It burrows into the ground to create its nest. It can roll while curled up to defend itself." },
        { name: "Sandslash", value: 0, description: "Curls up into a spiny ball when threatened. It can roll while curled up to attack or escape." },
        { name: "Nidoran♀", value: 0, description: "Although small, its venomous barbs render this Pokémon dangerous. The female has smaller horns." },
        { name: "Nidorina", value: 0, description: "When feeding its young, it first chews the food into a paste, then spits it out for them." },
        { name: "Nidoqueen", value: 0, description: "Its body is covered with needle-like scales. It never shows its ferocious tendencies to its children." },
        { name: "Nidoran♂", value: 0, description: "Its large ears are flapped like wings when it is listening to distant sounds. It extends toxic spikes when angry." },
        { name: "Nidorino", value: 0, description: "It has a violent disposition and stabs foes with its horn, which oozes poison upon impact." },
        { name: "Nidoking", value: 0, description: "It uses its thick tail to smash down its foes. It then finishes them off with a light punch." },
        { name: "Clefairy", value: 0, description: "Its adorable appearance makes it popular as a pet. However, it is rare and difficult to find." },
        { name: "Clefable", value: 0, description: "A timid fairy Pokémon that is rarely seen. It will run and hide the moment it senses people." },
        { name: "Vulpix", value: 0, description: "At the time of birth, it has just one tail. The tail splits from its tip as it grows older." },
        { name: "Ninetales", value: 0, description: "It is said to live for 1,000 years, and each of its tails is loaded with supernatural powers." },
        { name: "Jigglypuff", value: 0, description: "When it wavers its big, round eyes, it begins singing a lullaby that makes everyone drowsy." },
        { name: "Wigglytuff", value: 0, description: "Its fur is extremely fine, dense, and supple. The exquisitely pleasant fur conveys an air of luxury." },
        { name: "Zubat", value: 0, description: "Forms colonies in perpetually dark places. Uses ultrasonic waves to identify and approach targets." },
        { name: "Golbat", value: 0, description: "Once it bites, it will not stop draining energy from the victim even if it gets too heavy to fly." },
        { name: "Oddish", value: 0, description: "During the day, it stays in the cold underground to avoid the sun. It grows by bathing in moonlight." },
        { name: "Gloom", value: 0, description: "The honey it drools from its mouth smells so atrocious, it can curl noses more than a mile away." },
        { name: "Vileplume", value: 0, description: "It has the world's largest petals. With every step, the petals shake out heavy clouds of toxic pollen." },        
        { name: "Paras", value: 0, description: "Burrows under the ground to gnaw on tree roots. The mushrooms on its back grow by drawing nutrients from the bug host." },
        { name: "Parasect", value: 0, description: "A host-parasite pair in which the parasite mushroom has taken over the bug host. Prefers damp places." },
        { name: "Venonat", value: 0, description: "Its large eyes act as radar. In a bright place, you can see that they are clusters of many tiny eyes." },
        { name: "Venomoth", value: 0, description: "The scales it scatters will paralyze anyone who touches them, making that person unable to stand." },
        { name: "Diglett", value: 0, description: "Lives about one yard underground where it feeds on plant roots. It sometimes appears above ground." },
        { name: "Dugtrio", value: 0, description: "A team of triplets that can burrow over 60 miles per hour. Due to this, some people think it’s an earthquake." },
        { name: "Meowth", value: 0, description: "Adores circular objects. Wanders the streets on a nightly basis to look for dropped loose change." },
        { name: "Persian", value: 0, description: "Although its fur has many admirers, it is tough to raise as a pet because of its fickle meanness." },
        { name: "Psyduck", value: 0, description: "While lulling its enemies with its vacant look, this wily Pokémon will use psychokinetic powers." },
        { name: "Golduck", value: 0, description: "Often seen swimming elegantly by lakeshores. It is often mistaken for the Japanese monster, Kappa." },
        { name: "Mankey", value: 0, description: "An agile Pokémon that lives in trees. It angers easily and will not hesitate to attack anything." },
        { name: "Primeape", value: 0, description: "Always furious and tenacious to boot. It will not abandon chasing its quarry until it is caught." },
        { name: "Growlithe", value: 0, description: "Very protective of its territory. It will bark and bite to repel intruders from its space." },
        { name: "Arcanine", value: 0, description: "A Pokémon that has long been admired for its beauty. It runs agilely as if on wings." },
        { name: "Poliwag", value: 0, description: "Its newly grown legs prevent it from walking well. It appears to prefer swimming over walking." },
        { name: "Poliwhirl", value: 0, description: "Capable of living in or out of water. When out of water, it sweats to keep its body slimy." },
        { name: "Poliwrath", value: 0, description: "A swimmer adept at both the front crawl and breaststroke. Easily overtakes the best human swimmers." },
        { name: "Abra", value: 0, description: "Sleeps 18 hours a day. If it senses danger, it will teleport itself to safety even as it sleeps." },
        { name: "Kadabra", value: 0, description: "It emits special alpha waves from its body that induce headaches just by being close by." },
        { name: "Alakazam", value: 0, description: "Its brain can outperform a supercomputer. Its intelligence quotient is said to be 5,000." },
        { name: "Machop", value: 0, description: "Loves to build its muscles. It trains in all styles of martial arts to become even stronger." },
        { name: "Machoke", value: 0, description: "Its muscular body is so powerful, it must wear a power-save belt to be able to regulate its motions." },
        { name: "Machamp", value: 0, description: "Using its heavy muscles, it throws powerful punches that can send the victim clear over the horizon." },
        { name: "Bellsprout", value: 0, description: "A carnivorous Pokémon that traps and eats bugs. It uses its roots to soak up needed moisture." },
        { name: "Weepinbell", value: 0, description: "It spits out poison powder to immobilize the enemy and then finishes it with a spray of acid." },
        { name: "Victreebel", value: 0, description: "Said to live in huge colonies deep in jungles, although no one has ever returned from there." },
        { name: "Tentacool", value: 0, description: "Drifts in shallow seas. Anglers who hook them by accident are often punished by their stingers." },
        { name: "Tentacruel", value: 0, description: "The tentacles are normally kept short. On hunts, they are extended to ensnare and immobilize prey." },
        { name: "Geodude", value: 0, description: "Found in fields and mountains. Mistaking them for boulders, people often step or trip on them." },
        { name: "Graveler", value: 0, description: "Rolls down slopes to move. It rolls over any obstacle without slowing or changing its direction." },
        { name: "Golem", value: 0, description: "It sheds its hide once a year. Its boulderlike body is so tough, even dynamite can’t scratch it." },        
        { name: "Ponyta", value: 0, description: "Its hooves are 10 times harder than diamonds. It can trample anything completely flat in little time." },
        { name: "Rapidash", value: 0, description: "Very competitive, this Pokémon will chase anything that moves fast in the hopes of racing it." },
        { name: "Slowpoke", value: 0, description: "Incredibly slow and dopey. It takes 5 seconds for it to feel pain when under attack." },
        { name: "Slowbro", value: 0, description: "The Shellder that is latched onto Slowpoke’s tail is said to feed on the host’s leftover scraps." },
        { name: "Magnemite", value: 0, description: "Uses anti-gravity to stay suspended. Appears without warning and uses Thunder Wave and similar moves." },
        { name: "Magneton", value: 0, description: "Formed by several Magnemites linked together. They frequently appear when sunspots flare up." },
        { name: "Farfetch'd", value: 0, description: "The plant stalk it holds is its weapon. The stalk is used like a sword to cut all sorts of things." },
        { name: "Doduo", value: 0, description: "A bird that makes up for its poor flying with its fast foot speed. Leaves giant footprints." },
        { name: "Dodrio", value: 0, description: "Uses its three brains to execute complex plans. While two heads sleep, one head stays awake." },
        { name: "Seel", value: 0, description: "The protruding horn on its head is very hard. It is used for bashing through thick ice." },
        { name: "Dewgong", value: 0, description: "Stores thermal energy in its body. Swims at a steady 8 knots even in intensely cold waters." },
        { name: "Grimer", value: 0, description: "Appears in filthy areas. It thrives by sucking up polluted sludge that is pumped out of factories." },
        { name: "Muk", value: 0, description: "Thickly covered with a filthy, vile sludge. It is so toxic, even its footprints contain poison." },
        { name: "Shellder", value: 0, description: "Its hard shell repels any kind of attack. It is vulnerable only when its shell is open." },
        { name: "Cloyster", value: 0, description: "Its shell is extremely hard. It cannot be shattered, even with a bomb." },
        { name: "Gastly", value: 0, description: "Almost invisible, this gaseous Pokémon cloaks the target and puts it to sleep without notice." },
        { name: "Haunter", value: 0, description: "Because of its ability to slip through block walls, it is said to be from another dimension." },
        { name: "Gengar", value: 0, description: "Under a full moon, this Pokémon likes to mimic the shadows of people and laugh at their fright." },
        { name: "Onix", value: 0, description: "As it grows, the stone portions of its body harden to become similar to black-colored diamonds." },
        { name: "Drowzee", value: 0, description: "Puts enemies to sleep, then eats their dreams. Occasionally gets sick from eating bad dreams." },
        { name: "Hypno", value: 0, description: "When it locks eyes with an enemy, it uses a mix of PSI moves such as Hypnosis and Confusion." },
        { name: "Krabby", value: 0, description: "Its pincers are not only powerful weapons, they are used for balance when walking sideways." },
        { name: "Kingler", value: 0, description: "The large pincer has 10,000-horsepower strength. However, it is so heavy, it is difficult to aim." },
        { name: "Voltorb", value: 0, description: "Usually found in power plants. Easily mistaken for a Poké Ball, it has zapped many people." },
        { name: "Electrode", value: 0, description: "It stores electric energy under very high pressure. It often explodes with little or no provocation." },
        { name: "Exeggcute", value: 0, description: "Though it may look like a cluster of eggs, it is actually six individual Pokémon sharing one body." },
        { name: "Exeggutor", value: 0, description: "Legend has it that on rare occasions, one of its heads will drop off and continue on as an Exeggcute." },
        { name: "Cubone", value: 0, description: "Wears the skull of its deceased mother. Its cries echo inside the skull and come out as a sad melody." },
        { name: "Marowak", value: 0, description: "The bone it holds is its key weapon. It throws the bone skillfully like a boomerang to KO targets." },
        { name: "Hitmonlee", value: 0, description: "When in a hurry, its legs lengthen progressively. It runs smoothly with extra-long, loping strides." },
        { name: "Hitmonchan", value: 0, description: "While apparently doing nothing, it fires punches in lightning-fast volleys that are impossible to see." },
        { name: "Lickitung", value: 0, description: "Its tongue can be extended like a chameleon's. It leaves a tingling sensation when it licks enemies." },
        { name: "Koffing", value: 0, description: "Because it stores several kinds of toxic gases in its body, it is prone to exploding without warning." },
        { name: "Weezing", value: 0, description: "Where two kinds of poison gases meet, two Koffing can fuse into a Weezing over many years." },
        { name: "Rhyhorn", value: 0, description: "Its massive bones are 1,000 times harder than human bones. It can easily knock a trailer flying." },        
        { name: "Rhydon", value: 0, description: "Protected by an armor-like hide, it is capable of living in molten lava of 3,600 degrees Fahrenheit." },
        { name: "Chansey", value: 0, description: "A kindhearted Pokémon that shares its nutritious eggs if it sees an injured Pokémon." },
        { name: "Tangela", value: 0, description: "The vines that cloak its entire body are always jiggling. They effectively unnerve its foes." },
        { name: "Kangaskhan", value: 0, description: "The infant rarely ventures out of its mother's protective pouch until it is 3 years old." },
        { name: "Horsea", value: 0, description: "Known to shoot down flying bugs with precision blasts of ink from the surface of the water." },
        { name: "Seadra", value: 0, description: "Capable of swimming backwards by rapidly flapping its wing-like pectoral fins and stout tail." },
        { name: "Goldeen", value: 0, description: "Its tail fin billows like an elegant ballroom dress, giving it the nickname of the Water Queen." },
        { name: "Seaking", value: 0, description: "In the autumn, its body becomes more fatty in preparing to propose to a mate." },
        { name: "Staryu", value: 0, description: "An enigmatic Pokémon that can effortlessly regenerate any appendage it loses in battle." },
        { name: "Starmie", value: 0, description: "Its central core glows with the seven colors of the rainbow. Some people value the core as a gem." },
        { name: "Mr. Mime", value: 0, description: "If interrupted while it is miming, it will slap around the offender with its broad hands." },
        { name: "Scyther", value: 0, description: "With ninja-like agility and speed, it can create the illusion that there are more than one of it." },
        { name: "Jynx", value: 0, description: "It seductively wiggles its hips as it walks. It can cause people to dance in unison with it." },
        { name: "Electabuzz", value: 0, description: "Normally found near power plants, they can wander away and cause major blackouts in cities." },
        { name: "Magmar", value: 0, description: "Its body always burns with an orange glow that enables it to hide perfectly among flames." },
        { name: "Pinsir", value: 0, description: "If it fails to crush the foe in its pincers, it will swing it around and toss it hard." },
        { name: "Tauros", value: 0, description: "When it targets an enemy, it charges furiously while whipping its body with its long tails." },
        { name: "Magikarp", value: 0, description: "In the distant past, it was somewhat stronger than the horribly weak descendants that exist today." },
        { name: "Gyarados", value: 0, description: "Rarely seen in the wild. Huge and vicious, it is capable of destroying entire cities in a rage." },
        { name: "Lapras", value: 0, description: "A gentle soul that can ferry people across the sea. It loves singing with others of its kind." },        
        { name: "Ditto", value: 0, description: "Capable of copying an opponent's genetic code to instantly transform itself into a duplicate of the enemy." },
        { name: "Eevee", value: 0, description: "Its genetic code is irregular. It may mutate if it is exposed to radiation from element stones." },
        { name: "Vaporeon", value: 0, description: "Lives close to water. Its long tail is ridged with a fin which is often mistaken for a mermaid’s." },
        { name: "Jolteon", value: 0, description: "It accumulates negative ions in the atmosphere to blast out 10,000-volt lightning bolts." },
        { name: "Flareon", value: 0, description: "When storing thermal energy in its body, its temperature can soar to over 1,600 degrees Fahrenheit." },
        { name: "Porygon", value: 0, description: "A man-made Pokémon that consists entirely of programming code. It is capable of moving freely in cyberspace." },
        { name: "Omanyte", value: 0, description: "An ancient Pokémon that was recovered from a fossil. It swam by cleverly twisting its 10 tentacles about." },
        { name: "Omastar", value: 0, description: "Its sharp beak rings its mouth. Its shell was too big for it to move freely, so it became extinct." },
        { name: "Kabuto", value: 0, description: "A Pokémon that was recovered from a fossil. It uses the eyes on its back while hiding on the seafloor." },
        { name: "Kabutops", value: 0, description: "Its sleek shape is perfect for swimming. It slashes prey with its claws and drains the body fluids." },
        { name: "Aerodactyl", value: 0, description: "A ferocious, prehistoric Pokémon that goes for the enemy's throat with its serrated saw-like fangs." },
        { name: "Snorlax", value: 0, description: "Very lazy. Just eats and sleeps. As its rotund bulk builds, it becomes steadily more slothful." },
        { name: "Articuno", value: 0, description: "A legendary bird Pokémon that is said to appear to doomed people who are lost in icy mountains." },
        { name: "Zapdos", value: 0, description: "This legendary bird Pokémon causes savage thunderstorms by flapping its glittering wings." },
        { name: "Moltres", value: 0, description: "Known as the legendary bird of fire. Every flap of its wings creates a dazzling flash of flames." },
        { name: "Dratini", value: 0, description: "Long considered a mythical Pokémon until recently when a small colony was found living underwater." },
        { name: "Dragonair", value: 0, description: "A mystical Pokémon that exudes a gentle aura. It is said to have the ability to change the weather." },
        { name: "Dragonite", value: 0, description: "An extremely rare, multi-talented dragon Pokémon that can fly faster than the speed of sound." },
        { name: "Mewtwo", value: 0, description: "It was created by a scientist after years of horrific gene-splicing and DNA engineering experiments." },
        { name: "Mew", value: 0, description: "So rare that it is still said to be a mirage by many experts. Only a few people have seen it worldwide." }        
    ];
    const endCard = document.getElementById('end-card');
    setTimeout(() => {
        endCard.style.zIndex = 0;
    }, 500); // Delay to allow the fade-out to complete
}


document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const cardId = parseInt(card.id.split('-')[1], 10);
        card.style.zIndex = 20 - cardId;
    });
})