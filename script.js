

function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value;
  
    if (cityName.trim() === '') {
      alert('Please enter a city name.');
      return;
    }
  
    const apiKey = '5e46a0beb8a29253483ad29fb05f4a12';
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=5e46a0beb8a29253483ad29fb05f4a12`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.cod === '404') {
          alert('City not found. Please enter a valid city name.');
        } else {
            

          displayWeather(data);
        }
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
      });
  }
  function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const timezone = data.timezone;
    const humidity = data.main.humidity;
    const sunrise = data.sys.sunrise;
    const sunriseTime = new Date(sunrise * 1000);
    const sunriseTimeString = sunriseTime.toLocaleTimeString();
    const sunset = data.sys.sunset;
    const sunsetTime = new Date(sunset * 1000);
    const sunsetTimeString = sunsetTime.toLocaleTimeString();
    const currentTimeInUTC = new Date(); // Get current time in UTC

    // Calculate the local time by adjusting the UTC time with the time zone offset
    const localTime = new Date(currentTimeInUTC.getTime()+timezone);
    

    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
    const date = localTime.toLocaleDateString('en-US', options);
    const time = localTime.toLocaleTimeString('IST');
    
    
    

    const resultHTML =`
    <div class="weatherinfo">
    <h2 class="weatherdescription">${description}</h2>
    <h5 class="weathercityName">${cityName}</h5>
    <h5 class="weathertime">${time}</h5>
    
    
        
            <div class="weatherinfo2">         
                <h2 class="weathertemperature">${parseInt(temperature.toString().slice(0, 2), 10)}°C</h2>
                <div class="timediv">
                <h5 class="weathertime">sunrise   ${sunriseTimeString}</h5>
              <h5 class="weathertime">sunset   ${sunsetTimeString}</h5>
            </div>

            
                
                      
            <div class="weatherinfo1">  
            <h5 class="weatherdate1">humidity:${humidity}</h5>          
            <div class="Datediv">               
                <h5 class="weatherdate">${date}</h5>
                
            </div>
            
            </div>
    </div>
  `;
  
    weatherResult.innerHTML = resultHTML
    var body = document.body;
    
    var container = document.querySelector('.container');
    var weatherdate1 = document.querySelector('.weatherdate1');
    var weatherdat = document.querySelector('.weatherdate');
    if(localTime >= sunriseTime && localTime <= sunsetTime) {
      container.style.backgroundImage = "url('https://images.unsplash.com/photo-1542349314-587b18ea1c2a?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.png')";
      body.style.backgroundColor = '#D6EAF8';
    
  } 
  else{
      // Nighttime background
      container.style.backgroundImage = "url('https://img.freepik.com/free-photo/starry-night-sky_1048-11828.jpg?w=740&t=st=1700142591~exp=1700143191~hmac=c553c166f933d461b091b5ff0d528ccf5a41a836c3d88edbee71e650aade0b9d.png')";
      body.style.backgroundColor = '#808B96';
      weatherdate1.style.color = '#fff'
      weatherdat.style.color = '#fff'
  }
}
