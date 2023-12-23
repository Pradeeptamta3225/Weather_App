const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searhWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
const grantAccessButton = document.querySelector("[data-grantAccess]");
const searchInput = documnet.querySelector("[dataSearchInput]");



let currentTab = userTab;

const API_KEY = "d1845658f92b31c64bd94f06f7188c9c"; 

currentTab.classList.add("current-tab");
getFromSessionStorage();

function switchTab (clickedTab){
  if(currentTab != clickedTab) {
    currentTab.classList.remove("current-tab");
    currentTab = clickedTab;
    currentTab.classList.add("current-tab");
    

  if(!searchForm.classList.contains("active")) {
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    searchForm.classList.add("active");
  }

  else{
    userInfoContainer.classList.remove("active");
    searchForm.classList.remove("active");
    getFromSessionStorage();
  }

}

}


userTab.addEventListener("click", () =>{

    switchTab(userTab);
});

searchTab.addEventListener("click", () =>{

    switchTab(searchTab);
});


function getFromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");

    if(!localCoordinates){

        grantAccessContainer.classList.add("active");

    }
    else{

        const coordinates = JSON.parse(localCoordinates);
       fetchUserWeatherInfo(coordinates);
    }
}


async function fetchUserWeatherInfo(coordinates){

    const {lat,lon} = coordinates;

    grantAccessContainer.classList.remove("active");
    loadingScreen.classList.add("active");


    try{

        const result = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await result.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);

        
    }
    catch(err)
{
  loadingScreen.classList.remove("active");
}  

   
}


function renderWeatherInfo(weatherInfo){

  const cityName = document.querySelector("[data-cityName]");
  const countryImg = document.querySelector("[data-countryImage]");
  const desc = document.querySelector("[data-weatherInfo]");
  const weatherImg = document.querySelector("[data-weatherImage]");
  const temp = document.querySelector("[data-weatherTemp]");
  const windspeed = document.querySelector("[data-windSpeed]");
  const humidity = document.querySelector("[data-humidity]");
  const cloudiness = document.querySelector("[data-cloud]");

  cityName.innerText = weatherInfo?.name;
  countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
  desc.innerText = weatherInfo?.weather?.[0]?.description;
  weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
  temp.innerText = weatherInfo?.main?.temp;
  windspeed.innertext = weatherInfo?.wind?.speed;
  humidity.innertext = weatherInfo?.main?.humidity;
  cloudiness.innerText = weatherInfo?.clouds?.all;



}

function getLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  else{
    alert("Please Enter a Valid City");
  }
}

function showPosition(position){

  const userCoordinates = {
  lat: position.coords.latitute,
  lon: position.coords.longitute,}


  sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
 fetchUserWeatherInfo(userCoordinates);
}

grantAccessButton.addEventListener("click", getLocation);

searchInput.addEventListener("submit", (e) =>{
  e.preventDefault();
  let cityName = searchInput.value;

  if(cityName === "")
  return;
else
fetchUserWeatherInfo(cityName);

})


async function fetchUserWeatherInfo(city){
  loadingScreen.classList.add("active");
  userInfoContainer.classList.remove("active");
  grantAccessContainer.classList.remove("active");
  
    try{

        const result = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await result.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);

        
    }
    catch(err)
{
  alert("Error Found");
}  

}


