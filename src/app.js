const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast =require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//paths for express config
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//handlebars location 
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//static directory to serve
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Priyanka'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Priyanka'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        helpText: 'This page is for help',
        name: 'Priyanka'
    })
})

app.get('/weather',(req, res)=>{
    const address= req.query.address
    if(!address){
        return res.send({
            error: 'Address is required to get forecast'
        })
    }
    else{
        geocode.geocoded(address,(error,{latitude, longitude, location} = {})=>{
            if(error){
                return res.send({error})
            }
            forecast(latitude,longitude,(error,forecastData)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location: location
                })  
            })
        })

    }
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must give search term'
            })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: '404 Error',
        text: 'help article not found',
        name: 'priyanka'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title: '404 error',
        text: 'Page not found',
        name: 'priyanka'
    })

})
app.listen(port,()=>{
    console.log('server is up on port' +port)
})