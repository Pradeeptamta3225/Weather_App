const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";



function renderWeatherInfo(data){
    let newPara = document.createElement('p');
    
    newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`
    
    document.body.appendChild(newPara);
}

async function fetchWeatheDetails(){


    try{
        let city = "Dehradun";

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        let data = await response.json();
        console.log("Current Weather",data);


        renderWeatherInfo(data);

    }
    catch{
        console.log("City Not Found");
    }    

}


async function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log("Wrong Location");
    }
}


function showPosition(position){

    let lat = position.coords.latitude;
    let long = position.coords.longitude;



    console.log(lat);
    console.log(long);
}