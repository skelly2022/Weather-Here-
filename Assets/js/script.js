var userFormEl = document.querySelector("#user-form");
var languageButtonsEl = document.querySelector("#language-buttons");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var dayContainerEl = document.querySelector("#day-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function (event) {
  event.preventDefault();

  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    get5dayforecast(username);

    repoContainerEl.textContent = "";
    nameInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
};

var buttonClickHandler = function (event) {
  var language = event.target.getAttribute("data-language");

  if (language) {
    getFeaturedRepos(language);
    get5dayforecast(language);

    repoContainerEl.textContent = "";
  }
};

var getUserRepos = function (user) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    +user+
    "&units=imperial&appid=2d997b58782babf48e2d543cc353e00a";
  console.log(apiUrl);

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          console.log(user);
          displayRepos(data, user);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to GitHub");
    });
};

var get5dayforecast = function (user) {

  console.log(user)
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    +user+
    "&units=imperial&appid=2d997b58782babf48e2d543cc353e00a";
  console.log(apiUrl);

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          console.log(user);
          display5day(data, user);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to GitHub");
    });
};



var getFeaturedRepos = function (rabbit) {
  var apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  +rabbit+
  "&units=imperial&appid=2d997b58782babf48e2d543cc353e00a";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data, rabbit);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};



var displayRepos = function (repos, searchTerm) {
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }

  var currentTime = moment.unix(repos.dt).format("MM/DD/YYYY");

  repoSearchTerm.textContent = searchTerm


  var repoEl = document.createElement("div");
  var titleEl = document.createElement("h1");
  var tempEl = document.createElement("p");
  var windEl = document.createElement("p")
  var humidEl = document.createElement("p")
  var uvEl = document.createElement("p")



  tempEl.textContent = "Temp: " + repos.main.temp + "°F";
  windEl.textContent = "Wind: " + repos.wind.speed + " MPH";
  humidEl.textContent = "Humidity: " + repos.main.humidity + " %";
  uvEl.textContent = "Current Temperature: " + repos.current + " MPH";
  titleEl.textContent= searchTerm + "  " + currentTime;

  titleEl.appendChild(tempEl);
  titleEl.appendChild(windEl);
  titleEl.appendChild(humidEl);
  repoEl.appendChild(titleEl);


  repoEl.appendChild(titleEl);

  repoContainerEl.appendChild(repoEl);
};


var display5day = function (info, name) {  if (info.length === 0) {

  repoContainerEl.textContent = "No repositories found.";
  return;
}

var day5 = info.list;
console.log(day5);

for (var i=0;i<5;i++) {

var dayEl = document.createElement('div');
dayEl.classList = ' tall';

var titleEl = document.createElement('h1');
titleEl.textContent = name;

var daytemp = document.createElement('p');
daytemp.textContent = "Temp: " + day5[i].main.temp + "°F";
var dayhumid = document.createElement('p');
dayhumid.textContent = "Humidity: " + day5[i].main.humidity + " %";
var daywind = document.createElement('p');
daywind.textContent = "Wind: " + day5[i].wind.speed + " MPH";

titleEl.appendChild(daytemp);
titleEl.appendChild(daywind);
titleEl.appendChild(dayhumid);


dayEl.appendChild(titleEl);
dayContainerEl.appendChild(dayEl);}}




userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);
