const deckApiUrl = "https://deckofcardsapi.com/api/deck";
let deckId = null;

async function fetchNewDeck() {
    try {
        let response = await fetch(`${deckApiUrl}/new/shuffle/?deck_count=1`);
        let data = await response.json();
        deckId = data.deck_id;
        console.log("New deck created:", deckId);
    } catch (error) {
        console.error("Error fetching new deck:", error);
    }
}

async function drawSingleCard() {
    try {
        let response = await fetch(`${deckApiUrl}/${deckId}/draw/?count=1`);
        let data = await response.json();
        
        if (data.cards.length > 0) {
            let card = data.cards[0];
            console.log(`${card.value} of ${card.suit}`);
        } else {
            console.log("No more cards left!");
        }
    } catch (error) {
        console.error("Error drawing card:", error);
    }
}

async function drawTwoCards() {
    try {
        let response = await fetch(`${deckApiUrl}/${deckId}/draw/?count=2`);
        let data = await response.json();

        if (data.cards.length === 2) {
            let [card1, card2] = data.cards;
            console.log(`${card1.value} of ${card1.suit} & ${card2.value} of ${card2.suit}`);
        } else {
            console.log("Not enough cards left to draw.");
        }
    } catch (error) {
        console.error("Error drawing two cards:", error);
    }
}

// UI Functionality
async function setupDeck() {
    await fetchNewDeck();
    $("#draw-card").on("click", async function () {
        await drawTwoCards();
    });
}

// Run on page load
setupDeck();
