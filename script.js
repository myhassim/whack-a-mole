let moles = $('.mole')
let scoreCard = $('#scoreCard')
let btn = $('#btn')
let lastMole
let timeUp = false
let score = 0

const randomTime = (min, max) => {
	return Math.round(Math.random() * (max - min) + min)
}
const randomMole = (moles) => {
	let index = Math.floor(Math.random() * moles.length)
	let mole = moles[index]
	if (mole == lastMole) {
		return randomMole(moles)
	}
	lastMole = mole
	return mole
}
function up() {
	let mole = randomMole(moles)
	let time = randomTime(100, 1000)
	$(mole).addClass('up')
	$(mole).on('click', function(e) {
		wack(e)
	})
	setTimeout(function() {
		$(mole).removeClass('up')
		setTimeout(() => $(mole).off(), 350)
		if (!timeUp) {
			up()
		}
	}, time)
}
function wack(e) {
	score++
	$(e.target).removeClass('up')
	$(scoreCard).text(score)
}
function startGame() {
	$(scoreCard).text('0')
	score = 0
	$(btn).attr('disabled')
	timeUp = false
	up()
	setTimeout(() => {
		timeUp = true
		$(btn).attr('disabled')
	}, 10000)
}
