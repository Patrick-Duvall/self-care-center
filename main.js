
var mantras = [
  'Breathing in, I send myself love.Breathing out, I send love to someone else who needs it.',
  'Don’t let yesterday take up too much of today.',
  // 'Every day is a second chance.',
  // 'Tell the truth and love everyone.',
  // 'I am free from sadness.',
  // 'I am enough.',
  // 'In the beginning it is you, in the middle it is you and in the end it is you.',
  // 'I love myself.',
  // 'I am present now.',
  // 'Inhale the future, exhale the past.',
  // 'This too shall pass.',
  // 'Yesterday is not today.',
  // 'The only constant is change.',
  // 'Onward and upward.',
  // 'I am the sky, the rest is weather.'
]

var affirmations = [
  'I forgive myself and set myself free.',
  'I believe I can be all that I want to be.'
  // 'I am in the process of becoming the best version of myself.',
  // 'I have the freedom & power to create the life I desire.',
  // 'I choose to be kind to myself and love myself unconditionally.',
  // 'My possibilities are endless.',
  // 'I am worthy of my dreams.',
  // 'I am enough.',
  // 'I deserve to be healthy and feel good.',
  // 'I am full of energy and vitality and my mind is calm and peaceful.',
  // 'Every day I am getting healthier and stronger.',
  // 'I honor my body by trusting the signals that it sends me.',
  // 'I manifest perfect health by making smart choices.',
]

var remainingAffirmations = affirmations
var remainingMantras = mantras


var displayedMessage = document.querySelector('.displayed-message')
var seenAllMessage = document.querySelector('.seen-all-message')
var messageButton = document.querySelector('.receive-message')
var bell = document.querySelector('.bell')
var mantraRadio = document.querySelector('#mantra-radio')
var affirmationRadio = document.querySelector('#affirmation-radio')
var messageDelivery = document.querySelector('.message-delivery')

messageButton.addEventListener('click', displayMessage)

function displayMessage() {
  bell.classList.add('hidden')
  displayedMessage.classList.remove('hidden')
  if( mantraRadio.checked ) {
    displayMantra()
  } else if(affirmationRadio.checked) {
    displayAffirmation()
  } else {
    displayedMessage.innerText = 'To not decide is still a decision'
  }
}

function displayMantra() {
  mantra = randomElement(remainingMantras)
  if (remainingMantras.length === affirmations.length) hideSeenAllMessage()
  remainingMantras = remainingMantras.filter(mant => mant !== mantra)
  displayedMessage.innerText = mantra
  if (!remainingMantras.length) {
    displayAllSeen('mantras')
    resetMantras()
  }
}

function displayAffirmation(){
  affirmation = randomElement(remainingAffirmations)
  if (remainingAffirmations.length === affirmations.length) hideSeenAllMessage()
  remainingAffirmations = remainingAffirmations.filter(aff => aff !== affirmation)
  displayedMessage.innerText = affirmation
  if (!remainingAffirmations.length) {
    displayAllSeen('affirmations')
    resetAffirmations()
  }
}

function resetAffirmations() { remainingAffirmations = affirmations }
function resetMantras() { remainingMantras = mantras }

function displayAllSeen(type) {
  seenAllMessage.classList.remove('hidden')
  let otherType = type === 'mantras' ? 'affirmations' : 'mantras';
  seenAllMessage.innerText = `You have seen all available ${type}, view some ${otherType},\n` +
    `or continue receiving previously seen ${type}`
}

function hideSeenAllMessage() {
  seenAllMessage.classList.add('hidden')
}

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}