const favoriteNumber = 7;
const numbersApiUrl = "http://numbersapi.com";

$.getJSON(`${numbersApiUrl}/${favoriteNumber}?json`)
  .then(data => {
    $("#number-fact").append(`<p>${data.text}</p>`);
    console.log(data);
  });


const multipleNumbers = [3, 7, 10, 15];
$.getJSON(`${numbersApiUrl}/${multipleNumbers}?json`)
  .then(data => {
    Object.values(data).forEach(fact => {
      $("#multiple-facts").append(`<p>${fact}</p>`);
      console.log(fact);
    });
  });


const factPromises = [];
for (let i = 0; i < 4; i++) {
  factPromises.push($.getJSON(`${numbersApiUrl}/${favoriteNumber}?json`));
}

Promise.all(factPromises)
  .then(facts => {
    facts.forEach(fact => {
      $("#four-facts").append(`<p>${fact.text}</p>`);
      console.log(fact);
    });
  });
