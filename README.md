# WeatherAppES5

This project displays weather in your city.

## About this project

This project is created only with pure javascript.

Event click listener on show weather button fires an AJAX request to OpenWeatherMap and get's the current weather for provided city. When using AJAX the page doesn't need to reload. On ready state 4 and http status code 200 json that was obtained from api call is getting parsed and then specific parts of that json fill div, that displays weather forecast.

It's not beautiful but shows how asynchronous request work.

## Live Preview

[Click to visit the project website](https://kreattehak.github.io/WeatherAppES5)

