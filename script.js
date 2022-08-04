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
