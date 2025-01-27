const userTab = document.querySelector('[data-userWeather]');
const searchTab= document.querySelector('[data-searchWeather]');
const userContainer = document.querySelector('.weather-container');
const grantLocactionAccess = document.querySelector('.grant-location-container');
const searchForm= document.querySelector('[data-searchForm]');
const loadingScreen =document.querySelector('.loading-container');
const weatherInfo = document.querySelector('.user-weather-container');
const userInfoWeather= document.querySelector('.user-weather-container');

let oldTab = userTab;
const API_KEY = "";
oldTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(clickedTab){
    if(clickedTab!=oldTab){
        oldTab.classList.remove("current-tab");
        oldTab=clickedTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
             //kya search form wala container is invisible, if yes then make it visible
            userInfoWeather.classList.remove("active");
            grantLocactionAccess.classList.remove("active");
            searchForm.classList.add("active");
        }else{
            //main pehle search wale tab pr tha, ab your weather tab visible karna h 
            searchForm.classList.remove("active");
            userInfoWeather.classList.remove("active");
            //ab main your weather tab me aagya hu, toh weather bhi display karna poadega, so let's check local storage first
            //for coordinates, if we haved saved them there.
            getfromSessionStorage();
        }
    }
}

function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("users-coordinates");
    if(!localCoordinates){
        grantLocactionAccess.classList.add("active");
    }else{
        const coordinates= JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat,lon}= coordinates;
    grantLocactionAccess.classList.remove("active");
    loadingScreen.classList.add("active");

    try {
        const Response= await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
    
        const data =await Response.json();
        loadingScreen.classList.remove("active");
    
        userInfoWeather.classList.add("active");
        renderWeatherInfo(data);
    } catch (error) {
        
    }
}

function renderWeatherInfo(weatherInfo){
    const cityName= document.querySelector("[data-cityName]");
    const countryIcon= document.querySelector('[data-FlagIcon]');
    const desc = document.querySelector('[data-Description]');
    const logo= document.querySelector('[data-logo]');
    const temp= document.querySelector('[data-tempeature]');
    const windSpeed = document.querySelector('[data-windspeed]');
    const cloudiness= document.querySelector('[data-cloudiness]');
    const humidity = document.querySelector('[data-humidity]');

    cityName.innerText=weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    logo.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windSpeed.innerText =`${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText =`${weatherInfo?.clouds?.all}%`;
}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position){
    const userCoordinates={
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

const searchInput= document.querySelector('[data-searchInput]');

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName=searchInput.value;
    if(cityName===""){
        return;
    }else{
        fetchSearchWeatherInfo(cityName);
    }
})

async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoWeather.classList.remove("active");
    grantLocactionAccess.classList.remove("active");

   try {
    const input= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await input.json();
    loadingScreen.classList.remove("active");
    userInfoWeather.classList.add("active");
    renderWeatherInfo(data);
   } catch (error) {
        console.log(error);
   }
   

}


const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

userTab.addEventListener("click",()=>{
    switchTab(userTab);
})

searchTab.addEventListener("click",()=>{
    switchTab(searchTab);
})

