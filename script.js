/* City

* Date

* Icon image (visual representation of weather conditions)

* Temperature

* Humidity

* Wind speed

* UV index*/

//weather api key: 2f13881ffe862b42e36007854de27a99

$(document).on("click", "#searchButton", function(){

    let city = $("#citySearch").val();

    getWeather(city);
})


function getWeather(city){

    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=2f13881ffe862b42e36007854de27a99&units=imperial"

    let weatherToday;
    let uvIndex;

    $.ajax({ //weather for today
        url: queryURL,
        method: "GET"
    }).then(function(response){

        weatherToday = response;

        let lat = response.coord.lat;
        let lon = response.coord.lon;

        getUV(weatherToday, lat, lon, city);

    });

}

function getUV(weatherToday, lat, lon, city){

    let queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=2f13881ffe862b42e36007854de27a99&lat=" + lat + "&lon=" + lon;


    $.ajax({ //weather for today
        url: queryURL,
        method: "GET"
    }).then(function(response){

        let uvIndex = response.value;
        let date = response.date_iso;

        currentWeather(weatherToday, uvIndex, date);
        getForecast(city);
    });
}

function getForecast(city){

    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=2f13881ffe862b42e36007854de27a99&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function(response){

        

        for(let i = 0;i < response.list.length;i+=8){
            console.log(response.list[i]);
            createForecastCard(response.list[i]);
        }


    });
}

function createForecastCard(forecastData){


    let card = $("<div>").attr({"class": "card"});

    let cardBody = $("<div>").addClass("card-body");
    card.append(cardBody);

    let cardTitle = $("<div>").addClass("card-title").html((forecastData.dt_txt).substring(0, 10));
    cardBody.append(cardTitle);

    let weatherIcon = $("<img>");
    cardBody.append(weatherIcon);

    let tempText = $("<p>").addClass("card-text").html(forecastData.main.temp + " F");
    cardBody.append(tempText);

    let humidityText = $("<p>").addClass("card-text").html(forecastData.main.humidity + "%");
    cardBody.append(humidityText);

    $("#weeklyForecast").append(card);

}

function currentWeather(response, uvIndex, date){

    $("#cityTag").html(response.name + " (" + date + ")");
    $("#iconTag").html();
    $("#tempTag").html("Temperature: " + response.main.temp + " F");
    $("#humidityTag").html("Humidity: " + response.main.humidity);
    $("#windSpeed").html("Wind Speed: " + response.wind.speed + "mph");
    $("#uvIndex").html("UV Index: " + uvIndex);

}