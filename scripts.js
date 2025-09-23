const form = document.getElementById('myForm');
const highTemp = document.getElementById('highTemp');
const lowTemp = document.getElementById('lowTemp');
const forecast = document.getElementById('forecast');
const humidity = document.getElementById('humidity');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = document.getElementById('searchBar').value;
    console.log(city);
    const apiKey = '58316db3219bf8e7478f9e97ae244c7a'; 

    // Fetch weather info from OpenWeatherMap
    //const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    const weatherUrl = `http://api.openweathermap.org/geo/1.0/direct?q=Chicago&limit=1&appid=58316db3219bf8e7478f9e97ae244c7a`;

    console.log(weatherUrl);
    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();

        if (data.cod !== 200) {
            alert('City not found');
            return;
        }

        // Update your cards
        highTemp.textContent = `${Math.round(data.main.temp_max)}℉`;
        lowTemp.textContent = `${Math.round(data.main.temp_min)}℉`;
        forecast.textContent = data.weather[0].main;
        humidity.textContent = `${data.main.humidity}%`;

        // Update heading
        document.querySelector('h2').textContent = `${data.name}, ${data.sys.country}`;
    } catch (error) {
        console.error(error);
        alert('Error fetching weather data');
    }
});