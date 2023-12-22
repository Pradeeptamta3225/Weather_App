const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searhWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector("grant-location-container");
const searchForm = document.querySelector("[data-seachForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector("user-info-container");


let currentTab = userTab;

const API_KEY = "d1845658f92b31c64bd94f06f7188c9c"; 

currentTab.classList.add("current-tab");


function switchTab (clickedTab){
  if(currentTab != clickedTab) {
    currentTab.classList.remove("current-tab");
    currentTab = clickedTab;
    currentTab.classList.add("current-tab");
  }



  if(!searchForm.classList.contains){
    userContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    searchForm.classList.add("active");
  }

  else{
    userContainer.classList.remove("active");
    searchForm.classList.remove("active");
    getFromSessionStorage();
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
        fetchUserInfoWeather(coordinates);
    }
}


async function fetchUserInfoWeather(coordinates){

    const {lat,long} = coordinates;

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