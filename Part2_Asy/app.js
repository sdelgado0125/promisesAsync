const deckApiUrl = "https://deckofcardsapi.com/api/deck";
let deckId = null;

async function fetchNewDeck() {
    try {
        let response = await fetch(`${deckApiUrl}/new/shuffle/?deck_count=1`);
        let data = await response.json();
        deckId = data.deck_id;
        console.log("New deck created:", deckId);
    } catch (e) {
        console.error("Error fetching new deck:", e);
    }
}

async function drawTwoCards() {
    try {
        let response = await fetch(`${deckApiUrl}/${deckId}/draw/?count=2`);
        let data = await response.json();

        if (data.cards.length === 2) {
            let [card1, card2] = data.cards;

            
            let cardImg1 = document.createElement("img");
            cardImg1.src = card1.image;
            cardImg1.alt = `${card1.value} of ${card1.suit}`;

            let cardImg2 = document.createElement("img");
            cardImg2.src = card2.image;
            cardImg2.alt = `${card2.value} of ${card2.suit}`;

            document.getElementById("pile1").appendChild(cardImg1);
            document.getElementById("pile2").appendChild(cardImg2);
        } else {
            console.log("Not enough cards left to draw.");
        }
    } catch (e) {
        console.error("Error drawing two cards:", e);
    }
}

async function setupDeck() {
    await fetchNewDeck();
    document.getElementById("draw-card").addEventListener("click", drawTwoCards);
}

setupDeck();
