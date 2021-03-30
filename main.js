
var mantras = [
  'Breathing in, I send myself love.Breathing out, I send love to someone else who needs it.',
  'Don’t let yesterday take up too much of today.',
  'Every day is a second chance.',
  'Tell the truth and love everyone.',
  'I am free from sadness.',
  'I am enough.',
  'In the beginning it is you, in the middle it is you and in the end it is you.',
  'I love myself.',
  'I am present now.',
  'Inhale the future, exhale the past.',
  'This too shall pass.',
  'Yesterday is not today.',
  'The only constant is change.',
  'Onward and upward.',
  'I am the sky, the rest is weather.'
]

var affirmations = [
  'I forgive myself and set myself free.',
  'I believe I can be all that I want to be.',
  'I am in the process of becoming the best version of myself.',
  'I have the freedom & power to create the life I desire.',
  'I choose to be kind to myself and love myself unconditionally.',
  'My possibilities are endless.',
  'I am worthy of my dreams.',
  'I am enough.',
  'I deserve to be healthy and feel good.',
  'I am full of energy and vitality and my mind is calm and peaceful.',
  'Every day I am getting healthier and stronger.',
  'I honor my body by trusting the signals that it sends me.',
  'I manifest perfect health by making smart choices.',
]

var remainingAffirmations = affirmations
var remainingMantras = mantras
var favoriteMessages = []
var messageDisplayGrid = document.querySelector('.message-display-grid')


var displayedMessage = document.querySelector('.displayed-message')
var seenAllMessage = document.querySelector('.seen-all-message')
var messageButton = document.querySelector('.receive-message')
var messageAndButton = document.querySelector('.message-and-button')
var favoriteButton = document.querySelector('.favorite-button')
var showFavoritesButton = document.querySelector('.show-favorites')
var backButton = document.querySelector('.back-to-main')
var bell = document.querySelector('.bell')
var mantraRadio = document.querySelector('#mantra-radio')
var affirmationRadio = document.querySelector('#affirmation-radio')
var messageDelivery = document.querySelector('.message-delivery')

var mainPage = document.querySelector('.main-page')
var favoritesIndex = document.querySelector('.favorites-index')

messageButton.addEventListener('click', displayMessage)
favoriteButton.addEventListener('click', favoriteMessage)
showFavoritesButton.addEventListener('click', showFavoritesPage)
backButton.addEventListener('click', showMainPage)

function favoriteMessage() {
  messageType = document.querySelector("#mantra-radio").checked === true ? "Mantra" : "Affirmation"
  message = new Message(displayedMessage.innerText, messageType) 
  favoriteMessages.push(message)
  favoriteButton.classList.add('hidden')
}

function showFavoritesPage() {
  mainPage.classList.add('hidden')
  addFavoriteMessages()
  favoritesIndex.classList.remove('hidden')
}

function showMainPage() {
  mainPage.classList.remove('hidden')
  favoritesIndex.classList.add('hidden')
}

function displayMessage() {
  bell.classList.add('hidden')
  displayedMessage.classList.remove('hidden')
  if( mantraRadio.checked ) {
    showFavoriteButtons()
    displayMantra()
  } else if(affirmationRadio.checked) {
    showFavoriteButtons()
    displayAffirmation()
  } else {
    displayedMessage.innerText = 'To not decide is still a decision'
  }
}

function showFavoriteButtons() {
  showFavoritesButton.classList.remove('hidden')
  favoriteButton.classList.remove('hidden')
}

function displayMantra() {
  mantra = randomElement(remainingMantras)
  if (remainingMantras.length) seenAllMessage.classList.add('hidden')
  markMantraAsSeen(mantra)
  displayedMessage.innerText = mantra
  if (!remainingMantras.length) {
    displayAllSeenMessage('mantras')
    resetMantras()
  }
}

function displayAffirmation(){
  affirmation = randomElement(remainingAffirmations)
  if (remainingAffirmations.length) seenAllMessage.classList.add('hidden')
  markAffirmationAsSeen(affirmation)
  displayedMessage.innerText = affirmation
  if (!remainingAffirmations.length) {
    displayAllSeenMessage('affirmations')
    resetAffirmations()
  }
}

function displayAllSeenMessage(type) {
  seenAllMessage.classList.remove('hidden')
  let otherType = type === 'mantras' ? 'affirmations' : 'mantras';
  seenAllMessage.innerText = `You have seen all available ${type}, view some ${otherType},\n` +
  `or continue receiving previously seen ${type}`
}

function resetAffirmations() { remainingAffirmations = affirmations }
function resetMantras() { remainingMantras = mantras }

function markAffirmationAsSeen(affirmation) {
  remainingAffirmations = remainingAffirmations.filter(remaining => remaining !== affirmation)
}

function markMantraAsSeen(mantra) {
  remainingMantras = remainingMantras.filter(remaining => remaining !== mantra)
}

function addFavoriteMessages() {
  html = ''
  for(let i = 0; i < favoriteMessages.length; i++){
    message = favoriteMessages[i]
    html += `
    <div class="favorited-message ${message.type}" id="${message.id}">
      <h3>${message.type}</h3>
      <p>${favoriteMessages[i].message}</p>
      <button class="delete">🗑️</button>
      </div>
    `
  }
  messageDisplayGrid.innerHTML = html
  addDeleteButtons()
}

function addDeleteButtons() {
  deleteButtons = document.querySelectorAll(".delete")
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', function () {
      deleteMessage(favoriteMessages[i].id)
      addFavoriteMessages()
    })
  }
}

function deleteMessage(messageId) {
  favoriteMessages = favoriteMessages.filter(message => message.id !== messageId)
}

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}