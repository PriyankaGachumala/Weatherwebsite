const request = require('request')

const forecast = (lat, long, callback)=>{
    const forecastUrl = 'https://api.darksky.net/forecast/fb0ba6e457537d1bd766963bfac4d2ec/'+lat+','+long+'?units=si'
    request({url:forecastUrl, json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect! check your connection', undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,{
                summary: body.daily.data[0].summary,
                temparature:body.currently.temperature+'degrees',
                chanceofrain:body.currently.precipProbability+'%'
            })
        }
    })
}
module.exports = forecast