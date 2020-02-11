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

    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=2f13881ffe862b42e36007854de27a99&untis=imperial"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        console.log(response);

        currentWeather(response);

    });


}

function currentWeather(response){

    $("#cityTag").html(response.name);
    $("#dateTag").html();
    $("#iconTag").html();
    $("#tempTag").html("Temperature: " + response.main.temp + " F");
    $("#humidityTag").html("Humidity: " + response.main.humidity);
    $("#windSpeed").html("Wind Speed: " + response.wind.speed + "mph");
    $("#uvIndex").html("UV Index: ");

}