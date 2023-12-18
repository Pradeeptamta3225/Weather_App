const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";

async function fetchWeatheDetails() {

    try{
        // let lat = 17.8384;
        // let lon = 74.3435;

        let city = "Champawat";

        const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
       
        const data = await response.json();
    
        console.log("weatherAPI =>" ,data);
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