const APIKey = "ef03fd351f5799cbdc7ebcd2f886b371";
//add local storage back to the array
//on load add to past searches from local and add back to the ul list
var pastSearches = [];


var searchHistoryList = document.getElementById('past-city-searches');
var weatherheader = document.getElementById('weather-header');
function SearchRequest ()
{
    let search = document.getElementById('city-search-bar').value;
    // pastSearches.push(search);
    let value = search.toUpperCase();
    if (pastSearches.includes(value) == true) {
        console.log('duplicate');
    }
    else {
        pastSearches.push(value);
        //add to local storage
    }
    console.log(value);
    getApiData(value);
    addToSearchHistory();
}

function getApiData(cityName) {
    let city = cityName;
    let requestURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
    clearSlate();
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid='+APIKey+'&units=imperial')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.list[1].main.temp);
            let headerCityTag = document.createElement('h1');
            headerCityTag.setAttribute('id', 'city-tag');
            headerCityTag.innerText = city;
            weatherheader.prepend(headerCityTag);
            let headertemp = document.createElement('p');
            headertemp.setAttribute('id', 'todays-temp');
            headertemp.innerText = `temperature: ${data.list[1].main.temp}F`;
            weatherheader.appendChild(headertemp);
            let headerwind = document.createElement('p');
            headerwind.setAttribute('id', 'todays-wind-speed');
            headerwind.innerText = `wind speed is: ${data.list[1].wind.speed}MPH`;
            weatherheader.appendChild(headerwind);
            let headerhumidity = document.createElement('p');
            headerhumidity.innerText = `humidity is: ${data.list[1].main.humidity}%`;
            headerhumidity.setAttribute('id', 'todays-humidity');
            weatherheader.appendChild(headerhumidity);
            for (let i = 0; i < data.list.length; i+=8)
            {
                console.log(data.list[i].main.temp);
                let weatherCard = document.createElement('div');
                weatherCard.setAttribute('id', `day-${[i]}`);
                weatherCard.classList.add('weather-cards');
                document.getElementById('dynamic-forecast-cards').appendChild(weatherCard);
                let weatherdate = document.createElement('h1');
                weatherdate.innerText = data.list[i].dt_txt;
                weatherCard.appendChild(weatherdate);
                let weathertemp = document.createElement('p');
                weathertemp.innerText = `temperature: ${data.list[i].main.temp}F`;
                weatherCard.appendChild(weathertemp);
                let weatherwind = document.createElement('p');
                weatherwind.innerText = `wind speed is: ${data.list[i].wind.speed}MPH`;
                weatherCard.appendChild(weatherwind);
                let weatherhumidity = document.createElement('p');
                weatherhumidity.innerText = `humidity is: ${data.list[i].main.humidity}%`;
                weatherCard.appendChild(weatherhumidity);
            }
        })
}

function addToSearchHistory() {
    console.log('add to search history');
    searchHistoryList.innerHTML='';
    console.log('hi');
    console.log(pastSearches.length);
    pastSearches.forEach(addToList);
}

function addToList (item, index) {
    console.log('add to list');
    let listElement = document.createElement('li');
    listElement.innerText=item;
    listElement.setAttribute('id', 'past-search-item');
    searchHistoryList.appendChild(listElement);
    console.log(pastSearches);
    // listElement.addEventListener('click', getApiData(item))
}



// function repeatSearch(city) {
//     clearSlate();
//     getApiData(city);
// }

function clearSlate() {
    // searchHistoryList.innerHTML='';
    let cardsToClear = document.getElementById('dynamic-forecast-cards');
    while (cardsToClear.firstChild) {
        cardsToClear.removeChild(cardsToClear.firstChild);
    }
    let headertoClear = document.getElementById('weather-header');
    while (headertoClear.firstChild) {
        headertoClear.removeChild(headertoClear.firstChild);
    }
}

console.log(pastSearches);

searchHistoryList.addEventListener('click', function(event) {
    if (searchHistoryList.firstChild) {
        console.log('hello');
        let search = event.target.innerHTML;
        getApiData(search);
    }
    else {
        console.log('something negative');
    }
})
