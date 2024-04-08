const request = require('postman-request')

const forecast = (lat, lng, callback) => {

    const url = 'https://api.weatherapi.com/v1/current.json?q=' + lat + ',' + lng + '&key=38bb347d1c414840ad5195434240404'

    request(url, { json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                description: body.current.condition.text,
                temperature: body.current.temp_c,
                feelsLikeTemperature: body.current.feelslike_c
            })
        }
    })
}

module.exports = forecast