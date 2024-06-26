const form = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

form.addEventListener('submit', event => {
	event.preventDefault()

	const location = searchInput.value

	messageOne.textContent = 'Loading...'
	messageTwo.textContent = ''

	fetch('/weather?address=' + location)
		.then(response => {
			return response.json()
		})
		.then(data => {
			if (data.error) {
				messageOne.textContent = data.error
			} else {
				messageOne.textContent = data.location
				messageTwo.textContent = data.forecast
			}
		})
})
