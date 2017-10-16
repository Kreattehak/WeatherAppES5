"use strict";
(function WeatherApp() {
    var searchButton, searchCity, loadingText, weatherBox, helper,
        weatherCity, weatherDescription, weatherTemperature, weatherData;
    collectDOMElements();

    searchButton.addEventListener('click', searchWeather);
    weatherTemperature.addEventListener('click', convertUnits);

    function convertUnits() {
        var data = weatherTemperature.textContent;
        if (data.charAt(data.length - 1) === 'F') {
            weatherTemperature.textContent = weatherData.celsiusTemperature;
        } else {
            weatherTemperature.textContent = weatherData.fahrenheitTemperature;
        }
    }

    function Weather(cityName, description) {
        this.cityName = cityName;
        this.description = description;
        this._temperature = '';
    }

    Object.defineProperty(Weather.prototype, 'fahrenheitTemperature', {
        //convert Celsius from ajax request to Fahrenheit
        get: function () {
            return (this._temperature* 1.8 + 32).toFixed(1) + '°F';
        }
    });

    Object.defineProperty(Weather.prototype, 'celsiusTemperature', {
        //convert Celsius from ajax request to Fahrenheit
        get: function () {
            return this._temperature + '°C';
        }
    });

    function searchWeather() {
        hideWeather();
        var cityName = searchCity.value.charAt(0).toUpperCase() + searchCity.value.slice(1);
        if (cityName.trim().length === 0) {
            return alert('Please enter a City Name to show weather');
        }
        var http = new XMLHttpRequest();
        var apiKey = '75c8e6c6b3515f3a5c299a5dfc269ffb';
        var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + apiKey;
        var method = 'GET';

        http.open(method, url);
        http.onreadystatechange = function () {
            if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
                var data = JSON.parse(http.responseText);
                weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
                weatherData._temperature = data.main.temp.toFixed(1);
                updateWeather(weatherData);
            } else if (http.readyState === XMLHttpRequest.DONE) {
                alert('Some problems occurred!');
            }
        };
        http.send();
    }

    function updateWeather(weatherData) {
        weatherCity.textContent = weatherData.cityName;
        weatherDescription.textContent = weatherData.description;
        weatherTemperature.textContent = weatherData.celsiusTemperature;

        showWeather();
    }

    function showWeather() {
        loadingText.style.display = 'none';
        weatherBox.style.display = 'block';
        helper.style.display = 'block';
    }

    function hideWeather() {
        loadingText.style.display = 'block';
        weatherBox.style.display = 'none';
        helper.style.display = 'none';
    }

    function collectDOMElements() {
        searchButton = document.querySelector('button');
        searchCity = document.querySelector('#city');

        loadingText = document.querySelector('#load');
        weatherBox = document.querySelector('#weather');
        helper = document.querySelector('#helper');

        weatherCity = weatherBox.firstElementChild;
        weatherDescription = document.querySelector('#weatherDescription');
        weatherTemperature = weatherBox.lastElementChild;
    }
})();