const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.opencagedata.com/geocode/v1/json?q=' + encodeURIComponent(address) + '&key=79d6c7c596c7492f83845ca7a3aa39f2&limit=1&abbrv=1'

    request(url, { json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geocoding service!', undefined)
        } else if (body.results.length < 1) {
            callback('Unable to find address', undefined)
        } else {
            const lat = body.results[0].geometry.lat
            const lng = body.results[0].geometry.lng
            const location = body.results[0].formatted
            callback(undefined, { lat, lng, location })
        }

    })
}

module.exports = geocode