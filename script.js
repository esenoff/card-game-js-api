

// function getCard(){
//     fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
//                         .then(res => res.json())
//                         .then(data => console.log(data))
// }

// document.getElementById("btn").addEventListener("click", getCard)

// function log () {console.log("I finally ran out")}


// setTimeout(log, 2000);

// const people = [
//     { name: "Jack", hasPet: true },
//     { name: "Jill", hasPet: false },
//     { name: "Alice", hasPet: true },
//     { name: "Bob", hasPet: false },
// ]

// let callback = person => person.hasPet

// let haspet = people.filter(callback)

// console.log(haspet)


// const people = [
//     { name: "Jack", hasPet: true },
//     { name: "Jill", hasPet: false },
//     { name: "Alice", hasPet: true },
//     { name: "Bob", hasPet: false },
// ]

// let callback = (person, arr) => {
//     if(person.hasPet){
//         arr.push(person)
//     }
// }

// function filterArray(array, callback) {
//     const resultingArray = []
//     for(let i=0; i < array.length; i++){
//         callback(array[i], resultingArray)
//     }
//     console.log(resultingArray)
// }

// filterArray(people, callback)

// document.getElementById('new-deck').addEventListener("click", function(){
//     console.log("Clicked")
// })

// const voters = [
//     {name: "Joe", email: "joe@joe.com", voted: true},
//     {name: "Jane", email: "jane@jane.com", voted: true},
//     {name: "Bo", email: "bo@bo.com", voted: false},
//     {name: "Bane", email: "bane@bane.com", voted: false}
// ]

// const email = voters.filter(voter => voter.voted).map(voter => voter.email);
// console.log(email)

/**
 * Challenge
 * 
 * Task: Using the saved deckId, draw 2 new cards from the deck
 * 
 * Docs for original Deck of Cards API: https://deckofcardsapi.com/#draw-card
 * BaseUrl you'll use: https://apis.scrimba.com/deckofcards/api/deck/
 * (that will replace the base url of https://deckofcardsapi.com/api/deck/)
 * that you'll see in the deck of cards API docs.
 * 
 * 1. Create a new button that, when clicked, draws 2 cards from the deckId
 * you have saved
 *      Note: you'll need to get a new deck every time you refresh the page,
 *      since you're only saving your deckId in a local variable right now
 * 2. Log those 2 cards to the console
 */

let deckId
let computerValue = 0
let playerValue = 0
const cardContainer = document.getElementById("cards");
const cardBtn = document.getElementById("new-card");
const deckBtn = document.getElementById("new-deck");
const header = document.getElementById("header");
const remain = document.getElementById("remain");
const computerScore = document.getElementById("computerScore");
const playerScore = document.getElementById("playerScore");

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    if(card1ValueIndex > card2ValueIndex){
        computerValue++
        computerScore.textContent = `Score: ${computerValue}`
        return headerValue = "Computer wins!" 
    } else if(card2ValueIndex > card1ValueIndex){
        playerValue++
        playerScore.textContent = `Score: ${playerValue}`
        return  headerValue =  "You win!"
    }else{
        return headerValue = `War!`
    }
}

    async function handleClick() {
         const response =  await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
         const data = await response.json()
         deckId = data.deck_id
                        remain.innerText = `Remaining Cards: ${data.remaining}`
                        header.textContent = "Draw the card"
        
}

async function getCard(){
    const response = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
      const data = await response.json() 
           cardContainer.children[1].innerHTML = `
           <img src=${data.cards[0].image} />
           `
           cardContainer.children[2].innerHTML = `
           <img src=${data.cards[1].image} />
           `

           const winnerText = determineCardWinner(data.cards[0], data.cards[1])
           header.textContent = winnerText

           remain.innerText = `Remaining Cards: ${data.remaining}`

           if(data.remaining === 0){
            cardBtn.disabled = true;
            if(computerValue > playerValue){
                header.textContent = `The computer won the game!`
            } else if (playerValue > computerValue){
                header.textContent = `You won the game!`
            } else{
                header.textContent = `It's a tie game!`
            }
           }
}

cardBtn.addEventListener("click", getCard)

deckBtn.addEventListener("click", handleClick)