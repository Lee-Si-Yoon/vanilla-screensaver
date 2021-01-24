const weather = document.querySelector(".js-weather")
const clouds = document.querySelector(".js-place")


//https://openweathermap.org/
const API_KEY = '24e2db31ed5e6b94821e59f429067c5a'
const COORDS = 'coords'

function getWeather(lat, lng) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      const temp = json.main.temp
      const humid = json.main.humidity
      const place = json.clouds.all
      const feel = json.main.feels_like
      //console.log(temp)
      //console.log(json)
      weather.innerText = `${temp}°C (feels:${feel}°C)`
      clouds.innerText = `Cloud: ${place} 
      Humidity: ${humid}%`
    })
}

function saveCoordss(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  }
  saveCoordss(coordsObj)
  getWeather(latitude, longitude)
}

function handleGeoError() {

}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}


function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS)
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords)
    getWeather(parseCoords.latitude, parseCoords.longitude)
  }
}




function init() {
  loadCoords()
}

init()