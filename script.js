async function getWeatherData(location){
    try{
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=30542738397b4dbdac7163537241305&q=${location}`, {mode: "cors"});
        let weatherData =  await response.json();
        return {
            "location": {
                "name" : weatherData.location.name,
                "region" : weatherData.location.region,
                "country" : weatherData.location.country,
                "localtime" : weatherData.location.localtime
            },
            "current": {
                "temp_c" : weatherData.current.temp_c,
                "condition" : {
                    "text" : weatherData.current.condition.text,
                    "icon" : weatherData.current.condition.icon
                },

            }
        
        };
    }
    catch(error){
        console.log(error);
    }
}

const form = document.getElementById('requestForm');
const formInput = document.getElementById('inputLocation');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    let data = getWeatherData(formInput.value);
    data.then((result) =>
        {
            displayData(result);
        })
});



function displayData(data){
    const displayCard = document.createElement("div");
    displayCard.classList.add("card");

    const displayLocation = document.createElement("h1");
    displayLocation.classList.add("card");
    displayLocation.textContent = data.location.name;
    displayCard.appendChild(displayLocation);

    const displayRegion = document.createElement("p");
    displayRegion.classList.add("card");
    displayRegion.textContent = data.location.region;
    displayCard.appendChild(displayRegion);

    const displayCountry = document.createElement("p");
    displayCountry.classList.add("card");
    displayCountry.textContent = data.location.country;
    displayCard.appendChild(displayCountry);

    const displayLocalTime = document.createElement("p");
    displayLocalTime.classList.add("card");
    displayLocalTime.textContent = data.location.localtime;
    displayCard.appendChild(displayLocalTime);

    const displayIcon = document.createElement("img");
    displayIcon.classList.add("card");
    displayIcon.src = data.current.condition.icon;
    displayCard.appendChild(displayIcon);

    const displayTemp = document.createElement("h2");
    displayTemp.classList.add("card");
    displayTemp.textContent = data.current.temp_c;
    displayCard.appendChild(displayTemp);

    const displayCondition = document.createElement("p");
    displayCondition.classList.add("card");
    displayCondition.textContent = data.current.condition.text;
    displayCard.appendChild(displayCondition);

    document.body.appendChild(displayCard);
    console.log(data);
}

