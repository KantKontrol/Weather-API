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

    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=2f13881ffe862b42e36007854de27a99";

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function(response){

        

        for(let i = 0;i < response.list.length;i+=8){
            console.log(response.list[i]);
        }


    });
}

function createForecastCard(forecastData){

 
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>


    let card = $("<div>").attr({"class": "card", "style": "width: 18rem;"})

    let cardBody = $("<div>").addClass("card-body");
    cardBody.appenedTo(card);

    let cardTitle = $("<div>").addClass("card-title").html((forecastData.dt_txt).substring(0, 9));
    cardTitle.appenedTo(cardBody);

    let weatherIcon = $("<img>");
    weatherIcon.appenedTo(cardBody);

    let tempText = $("<p>").addClass("card-text").html(forecastData.main.temp + "F");
    tempText.appenedTo(cardBody);

    let humidityText = $("<p>").addClass("card-text").html(forecastData.main.humidity + "%");
    humidityText.appenedTo(cardBody);



}

function currentWeather(response, uvIndex, date){

    $("#cityTag").html(response.name + " (" + date + ")");
    $("#iconTag").html();
    $("#tempTag").html("Temperature: " + response.main.temp + " F");
    $("#humidityTag").html("Humidity: " + response.main.humidity);
    $("#windSpeed").html("Wind Speed: " + response.wind.speed + "mph");
    $("#uvIndex").html("UV Index: " + uvIndex);

}