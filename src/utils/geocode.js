const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoia2FvYmVuIiwiYSI6ImNqdHZnMnhybzF4ZnUzem11dnR6d2xsemQifQ.YD83PpcLpsbdgGcKONJXhA&limit=1`
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the server!', '')
        } else if (body.features[0] === undefined) {
            callback('Ooops! Please try another location.','')
            //console.log(body.features)
        } else {
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]
            const location = body.features[0].place_name
            // console.log(`latitude= ${latitude},longitude= ${longitude}`)
            callback('', {
                longitude,
                latitude,
                location
            })
        }
    })
}

module.exports = geocode