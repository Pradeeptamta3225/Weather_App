const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";


function renderWeatherInfo(data){
let newPara = document.createElement('p');

newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`

document.body.appendChild(newPara);
}
async function fetchWeatheDetails() {

    try{
        // let lat = 17.8384;
        // let lon = 74.3435;

        let city = "Champawat";

        const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
       
        const data = await response.json();
    
        console.log("weatherAPI =>" ,data);

        renderWeatherInfo(data);
    }

    catch(err){
        console.log("Error" + err);
    }
   
}


async function getCustomWeatherDetails() {

        let lat = 17.8384;
        let lon = 74.3435;

         const result = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

         const data = await result.json();

         console.log(data);

    
}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log("No Location Found");
    }
}


function showPosition(position){
    let lat = position.coords.latitude;
    let long = position.coords.longitude;


    console.log(lat);
    console.log(long);
}