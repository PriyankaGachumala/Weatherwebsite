console.log('client side js is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading..'
    fetch('/weather?address='+location+'').then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
                messageOne.textContent='Unable to find loaction'
            }
            else{
                messageOne.textContent= data.location
                messageTwo.textContent= data.forecast.temparature
                // console.log(data.forecast)

            }
            
        })
    })
})