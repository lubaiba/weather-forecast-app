const apiKey = "2566505f14a3812323cacd6d821b8aec";
//const apiUrl="https://api.openweathermap.org/data/2.5/forecast?q=";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")
const weekday = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

var city = "delhi";
var date = new Date();
var current_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
var current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
var date_time = current_date + " " + current_time;

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}&days=6`);
    var data = await response.json();
    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".descrip").innerHTML = data.weather[0].main;
    // document.querySelector(".descrip").innerHTML=data.list[0].weather[0].icon;
    //document.querySelector(".temp").innerHTML=Math.floor(data.main.temp) + "°C";
    document.querySelector(".temp").innerHTML = Math.floor(data.main.temp) + "°C";
    document.querySelector(".feels-like").innerHTML = "Feels like " + data.main.feels_like + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    document.querySelector(".date").innerHTML = `Date & Time: ${(date_time)}`

    weatherIconChange(data, weatherIcon, true);
    document.querySelector(".weather").style.display = "block";

    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=2566505f14a3812323cacd6d821b8aec')
        .then(response => response.json())
        .then(data => {

            //Getting the min and max values for each day
            let curr = new Date(data.list[0].dt_txt);
            let j = 0;
            for (let i = 0; i < 6; i++) {
                console.log(i + 'a' + j)
                var parts = data.list[j].dt_txt.split(' ');
                var date = parts[0].split('-');
                var partsj = data.list[j + 1].dt_txt.split(' ');
                var datej = partsj[0].split('-');
                console.log(date)
                console.log(parts)


                console.log(i + '' + j + ' ' + weekday[new Date(data.list[j + 1].dt_txt).getDay()])
                document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min: " + Number(data.list[j + 1].main.temp_min - 273.15).toFixed(1) + "°C";

                document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max: " + Number(data.list[j + 1].main.temp_max - 273.15).toFixed(2) + "°C";
                weatherIconChange(data.list[j + 1], document.querySelector(".w-icon" + (i + 1)), false);
                document.getElementById("day" + (i + 1)).innerHTML = weekday[new Date(data.list[j + 1].dt_txt).getDay()];
                j++;
                if (date[2] == datej[2]) {

                    if (i > 0) {
                        --i;
                    }
                }

                //Number(1.3450001).toFixed(2); // 1.35
            }

            //------------------------------------------------------------
            //------------------------------------------------------------
            console.log(data);
        });

    //Getting and displaying the text for the upcoming five days of the week
    // var d = new Date();
    // var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

    // //Function to get the correct integer for the index of the days array
    // function CheckDay(day){
    //     if(day + d.getDay() > 6){
    //         return day + d.getDay() - 7;
    //     }
    //     else{
    //         return day + d.getDay();
    //     }
    // }

    //     for(i = 0; i<5; i++){
    //         document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
    //     }


}



searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})



function weatherIconChange(data, weatherIcon1, isBGChanged) {
    if (data.weather[0].main == "Clouds") {
        weatherIcon1.src = "images/clouds.png";
        if (isBGChanged) {
            document.body.style.background = "url(img/weather-cloudy.jpg)";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
        }
    }
    else if (data.weather[0].main == "Clear") {
        weatherIcon1.src = "images/clear.png";
        if (isBGChanged) {
            document.body.style.background = "url(img/weather-clear-sky.jpg)";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
        }
    }
    else if (data.weather[0].main == "Rain") {
        weatherIcon1.src = "images/rain.png";
        if (isBGChanged) {
            document.body.style.background = "url(img/weather-rain.jpg)";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
        }
    }
    else if (data.weather[0].main == "Drizzle") {
        weatherIcon1.src = "images/drizzle.png";
        if (isBGChanged) {
            document.body.style.background = "url(img/drizzle.jpg)";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
        }
    }
    else if (data.weather[0].main == "Mist") {
        weatherIcon1.src = "images/mist.png";
        if (isBGChanged) {
            document.body.style.background = "url(img/weather-mist.jpg)";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
        }
    }
    else if (data.weather[0].main == "Haze") {
        weatherIcon1.src = "images/haze.png";
        if (isBGChanged) {
            document.body.style.background = "url(img/haze.jpg)";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
        }
    }
}



function getlocation() {
    if (navigator.geolocation) {
        // city =   navigator.geolocation.getCurrentPosition;
        // checkWeather(navigator.geolocation.getCurrentPosition.toString);
        city = "delhi";
        getCoordintes();
    }
    else {
        city = "delhi";
        checkWeather(city);
    }
}

// Step 1: Get user coordinates
function getCoordintes() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;
        var lat = crd.latitude.toString();
        var lng = crd.longitude.toString();
        var coordinates = [lat, lng];
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        getCity(coordinates);
        return;

    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}

// Step 2: Get city name
function getCity(coordinates) {
    var xhr = new XMLHttpRequest();
    var lat = coordinates[0];
    var lng = coordinates[1];

    // Paste your LocationIQ token below.
    xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.38986897d817d470ecc3c484627f555c&lat=" +
        lat + "&lon=" + lng + "&format=json", true);
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            var city = response.address.city;
            console.log(city);
            checkWeather(city);
            return;
        }
    }
}

getCoordintes();


