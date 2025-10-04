import { apiKey } from "./config.js";

const myForm = document.getElementById('myForm');

const myInput = document.getElementById('searchBar');

const cardContainer = document.querySelector('.card-container')

const getWeather = async(city) => {

    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
  
    const data = await response.json();
        console.log(data);

        const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${data[0].lat}&lon=${data[0].lon}&appid=${apiKey}`;


        const weather_response = await fetch(weatherUrl);
        const weather_data = await weather_response.json();
        console.log(weather_data);

        const weatherData = {
            city: data[0].name,
            country: data[0].country,
            highTemp: Math.round(((weather_data.daily[0].temp.max - 273.15) * 1.8) + 32),
            lowTemp: Math.round(((weather_data.daily[0].temp.min - 273.15) * 1.8) + 32),
            humidity: weather_data.daily[0].humidity,
            forecast: weather_data.daily[0].summary
        }

        return weatherData;

}

const displayWeather = (weatherData) =>{
    cardContainer.innerHTML = '';
    const myCard = document.createElement('div');
    myCard.className = 'my-card';

    myCard.innerHTML = `
    
        <h2>${weatherData.city}, ${weatherData.country}</h2>
        <div class = "card">
            <div class = "card-header high">High</div>
            <div class = "card-body">${weatherData.highTemp}</div>
        </div>
  
        <div class = "card">
            <div class = "card-header low">Low</div>
            <div class = "card-body">${weatherData.lowTemp}</div>
        </div>

       <div class = "card">
            <div class = "card-header forecast">Forecast</div>
            <div class = "card-body">${weatherData.forecast}</div>
        </div>

        <div class = "card">
            <div class = "card-header humidity">Humidity</div>
            <div class = "card-body">${weatherData.humidity}</div>
        </div>
    `
    cardContainer.appendChild(myCard)

}

myForm.addEventListener('submit', async (event) => {

    event.preventDefault();



    const city = myInput.value;
    console.log(city);
    const weatherData = await getWeather(city);
    console.log(weatherData);
    displayWeather(weatherData);

});