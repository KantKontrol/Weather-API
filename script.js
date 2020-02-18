loadSearch();

$(document).on("click", "#searchButton", function(){

    let city = $("#citySearch").val();

    saveSearch(city);

    getWeather(city);
});

$(document).on("click", "#currentLocation", function(){

    getLocation();
});

$(document).on("click", "#clearSearch", function(){

    clearSearches();
});

$(document).on("click", ".savedEntry", function(){

    let city = $(this).attr("id");
    getWeather(city);
});


function getWeather(city){

    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=2f13881ffe862b42e36007854de27a99&units=imperial"

    let weatherToday;
    let uvIndex;

    $.ajax({ //weather for today
        url: queryURL,
        method: "GET"
    }).then(function(response){

        console.log(response);

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
        let date = (response.date_iso).substring(0, 10);

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

        $("#weeklyForecast").empty();

        for(let i = 0;i < response.list.length;i+=8){
            createForecastCard(response.list[i]);
        }

        $("#weatherData").css("display", "block");
    });
}

function createForecastCard(forecastData){


    let card = $("<div>").attr({"class": "card cusBorder mainColor"});

    let cardBody = $("<div>").addClass("card-body");
    card.append(cardBody);

    let cardTitle = $("<div>").addClass("card-title").html((forecastData.dt_txt).substring(0, 10));
    cardBody.append(cardTitle);

    let iconId = forecastData.weather[0].icon;

    let weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + iconId + ".png");
    cardBody.append(weatherIcon);

    let tempText = $("<p>").addClass("card-text").html(forecastData.main.temp + " F");
    cardBody.append(tempText);

    let humidityText = $("<p>").addClass("card-text").html(forecastData.main.humidity + "% RH");
    cardBody.append(humidityText);

    $("#weeklyForecast").append(card);

}

function currentWeather(response, uvIndex, date){

    $("#cityTag").html(response.name + " (" + date + ")");
    let iconId = response.weather[0].icon;
    $("#iconTag").html($("<img>").attr("src", "http://openweathermap.org/img/w/" + iconId + ".png"));
    $("#tempTag").html("Temperature: " + response.main.temp + " F");
    $("#humidityTag").html("Humidity: " + response.main.humidity + " %");
    $("#windSpeed").html("Wind Speed: " + response.wind.speed + "mph");
    $("#uvIndex").html("UV Index: " + uvIndex);

}

function saveSearch(newSearch){

    let searches = loadSearch();

    searches.unshift(newSearch);

    localStorage.setItem("weatherSearches", JSON.stringify(searches));

    loadSearch();

}

function clearSearches(){
    let searches = [];
    localStorage.setItem("weatherSearches", JSON.stringify(searches));
    $("#recentSearches").empty();
}

function loadSearch(){

     let searches = JSON.parse(window.localStorage.getItem("weatherSearches"));

     if(searches == null){
        searches = [];
     }

    createSavedSearchs(searches);

    return searches;
}

function createSavedSearchs(searches){

    $("#recentSearches").empty();

    for(let i= 0; i < searches.length;i++){
        let savedItem = $("<div>").addClass("savedEntry").attr("id", searches[i]).html(searches[i]);

        $("#recentSearches").append(savedItem);
    }

}

function getLocation() {
    var queryURL = "https://freegeoip.app/json/";
  
    // Here we run our AJAX call to the GEO API
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
        saveSearch(response.city);
        getWeather(response.city);
    });
  }