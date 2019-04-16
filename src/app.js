const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

//add port for heroku
const port = process.env.PORT || 3000

//const request = require('request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')

//Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../viewsPath/views')
const partialsPath = path.join(__dirname, '../viewsPath/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    //matching up name of the handlebar in the views folder
    res.render('index', {
        title: 'Welcome',
        name: 'Ben Kao'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Ben',
        name: 'Ben Kao'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'How am I help?',
        name: 'Ben Kao',
        question: 'Where are you?',
        answer: 'Taiwan'
    })
})

app.get('/weather', (req, res) => {
    var location = req.query.address
    
    if (!location) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(location, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
                //console.log('Error:', error)
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                    //console.log('Error:', error)
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
                //console.log(location)
                //console.log(forecastData)
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term."
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    //res.send('Help article not found.')
    res.render('404', {
        title: 404,
        name: 'Ben Kao',
        error: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    //res.send('My 404 page.')
    res.render('404', {
        title: 404,
        name: 'Ben Kao',
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Sever is up on port' + port)
})