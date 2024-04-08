const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const PORT = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '..', 'public')
const viewsPath = path.join(__dirname, '..', 'templates', 'views')
const partialsPath = path.join(__dirname, '..', 'templates', 'partials')

// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Abhishek Baghel',
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Abhishek Baghel',
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		message: 'This is some helpful text',
		name: 'Abhishek Baghel',
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Please provide the address',
		})
	}

	geocode(req.query.address, (error, { lat, lng, location } = {}) => {
		if (error) {
			return res.send({
				error,
			})
		}

		forecast(lat, lng, (error, { description, temperature, feelsLikeTemperature }) => {
			if (error) {
				return res.send({
					error,
				})
			}

			res.send({
				forecast:
					description +
                    '. It is currently ' +
                    temperature +
                    ' degrees out. It feels like ' +
                    feelsLikeTemperature +
                    ' degrees out. And the humidity is ' +
                    humidity +
                    '%.',
				location: location,
				address: req.query.address,
			})
		})
	})
})

// 404 page (catch all child routes of help)
app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Abhishek',
		errorMessage: 'Help article not found',
	})
})

// 404 page (catch all routes)
app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Abhishek',
		errorMessage: 'Page not found',
	})
})

app.listen(PORT, () => {
	console.log('Server is up on port ' + PORT)
})
