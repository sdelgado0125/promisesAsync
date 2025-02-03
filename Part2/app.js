let deckId = null;
let pile1Count = 0;  
let pile2Count = 0; 

$.getJSON("https://deckofcardsapi.com/api/deck/new/shuffle/").then(data => {
    deckId = data.deck_id;
});

$("#draw-card").on("click", function () {
    if (!deckId) return alert("Deck is not loaded yet!");

    $.getJSON(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`).then(data => {
        if (data.remaining === 0) {
            alert("No more cards left in the deck!");
            $("#draw-card").prop("disabled", true);
            return;
        }

        let [card1, card2] = data.cards;
        let rotation1 = Math.floor(Math.random() * 20) - 10;
        let rotation2 = Math.floor(Math.random() * 20) - 10; 

        let cardImage1 = $(`<img src="${card1.image}" alt="${card1.value} of ${card1.suit}" class="card">`);
        let cardImage2 = $(`<img src="${card2.image}" alt="${card2.value} of ${card2.suit}" class="card">`);

        cardImage1.css({
            "top": `${pile1Count * 2}px`,  
            "left": `${pile1Count * 2}px`, 
            "transform": `rotate(${rotation1}deg)`,
            "z-index": pile1Count 
        });
        $("#pile1").append(cardImage1);
        pile1Count++;

        cardImage2.css({
            "top": `${pile2Count * 2}px`,  
            "left": `${pile2Count * 2}px`, 
            "transform": `rotate(${rotation2}deg)`,
            "z-index": pile2Count 
        });
        $("#pile2").append(cardImage2);
        pile2Count++;
    });
});
