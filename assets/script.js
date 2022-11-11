const API_URL = 'https://api.worldweatheronline.com/premium/v1/marine.ashx'
const API_KEY = '64449662739848e395f30029220411'

const SEARCH_API = 'https://api.openweathermap.org/geo/1.0/direct';
const SEARCH_API_KEY = 'c557c62e75b66b19afd499c178c60c24';



$(document).ready(function() {

    var today = moment();
    
    $("#currentDay").text(today.format("[Current Date:] dddd MMM Do, YYYY"));
    $("#currentTime").text(today.format("[Current Time:] h:mm a [PST]"));

    
    function getSearchHistory() {
        const searchHistory = localStorage.getItem('search-history')
          ? JSON.parse(localStorage.getItem('search-history'))
          : [];
        const dedupedSearchHistory = [...new Set(searchHistory)];
        return dedupedSearchHistory;
      }
    
    function clearHistory() {
      localStorage.removeItem('search-history');
    }

      function setSearchHistory(cityName) {
        const searchHistory = getSearchHistory();
        searchHistory.push(cityName);
        localStorage.setItem('search-history', JSON.stringify(searchHistory));
        console.log(searchHistory);
      }

      function buildSearchAndMountHistory() {
        const searchHistory = getSearchHistory();
        const searchHistoryList = document.getElementById('search-history');
        searchHistoryList.innerHTML = '';
        searchHistory.forEach((city) => {
          const li = document.createElement('li');
          li.className = 'list list-group-item col-sm-10 col-md-10 col-lg-10 col-xl-10';
          li.innerHTML = city;
          searchHistoryList.appendChild(li);
        });
      }
      buildSearchAndMountHistory();

    async function searchForCity(cityName) {
        try {
          const request = await fetch(
            `${SEARCH_API}?q=${cityName}&appid=${SEARCH_API_KEY}`,);
          if (request.ok) {
            const response = await request.json();
            const { lat, lon } = response[0];
            return {lat,lon};
          }
        } catch (error) {
          return { error: 'City not found' };
        }
      }

      async function getForecast(lat,lon) {
        const request = await fetch(
          `${API_URL}?key=${API_KEY}&q=${lat},${lon}&format=json`,
        );
        const response = await request.json();
        return response;
      }

  
    

  async function performSearch(cityName) {
    // const cityName = $('#search-input').val();
    const latlon = await searchForCity(cityName);
    
    if (latlon.error) return;
    setSearchHistory(cityName);
    buildSearchAndMountHistory();

    const forecastResult = await getForecast(latlon.lat , latlon.lon);
    const waveHeight = "Height: "+forecastResult.data.weather[0].hourly[2].swellHeight_ft + " Ft"
    $('#wave-height').text(waveHeight);
    const windspeed = "Speed: "+forecastResult.data.weather[0].hourly[2].windspeedMiles + " MPH"
    $('#wind-speed').text(windspeed);
    const windDir = "Direction: "+forecastResult.data.weather[0].hourly[2].swellDir16Point
    $('#windDir').text(windDir);
    const temp = "Temperature: "+forecastResult.data.weather[0].hourly[2].tempF + " °F"
    $('#temp').text(temp);
    const sunrise = forecastResult.data.weather[0].astronomy[0].sunrise
    $('#sunrise').text(sunrise);
    const sunset = forecastResult.data.weather[0].astronomy[0].sunset 
    $('#sunset').text(sunset);
    console.log(forecastResult);
  }
    $('#clear-history').on('click', async function (e) {
    clearHistory();
    buildSearchAndMountHistory();
  });

      $('#search-history').on('click', async function (e) {
        const cityName = e.target.innerText;
        performSearch(cityName);
      });

      $('#search-button').on('click', async function () {
        const cityName = $('#search-input').val();
      performSearch(cityName);
      });
      
    });

    document.addEventListener("DOMContentLoaded", function() {
 

      const image_array = [
        '1.jpg',
        '2.jpg',
        '3.jpg',
        '4.jpg',
        '5.jpg',
        '6.jpg',
        '7.jpg',
        '8.jpg',
        '9.jpg',
        '10.jpg',
        '11.jpg'
      ]
      
      function get_random_image(){
        // Get a random index
        const random_index = Math.floor(Math.random() * image_array.length);
      
        // Get an image at the random_index
        const selected_image = image_array[random_index]
      
        // Display the image
        document.getElementById('image_shower').src = `./assets/POTD_images/${selected_image}`
      }
      
      get_random_image();
      });
