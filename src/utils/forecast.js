const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/0cc5d87d53ac677f531f5eb0e2f05252/${latitude},${longitude}?units=si&lang=zh-tw`
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!','')
        } else if (body.error) {
            callback(body.error,'')
        } else if (body.currently === undefined) {
            callback('Oops! There seem a problem getting weather data.','')
        } else {
            const temp = body.currently.temperature
            const rain = body.currently.precipProbability
            const summary = body.daily.data[0].summary
            //console.log(`It is currently ${temp} degrees C out. There is a ${rain}% chance of rain.`)
            callback('',`${summary}現在室外溫度${temp}度C。降雨機率為${rain}%。`)
        }
    })
}

module.exports = forecast