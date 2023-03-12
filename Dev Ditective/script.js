const input= document.getElementById("input");
const userNotFound= document.getElementById("notFound");
const searchBtn = document.querySelector('[data-search]');
const url= 'https://api.github.com/users/';
const photo= document.getElementById('avatar');
const profileName= document.querySelector('.name');
const joningDate= document.querySelector('.joined-date');
const username= document.querySelector('.username');

const bio= document.querySelector('.user-bio');
const repository = document.querySelector('.repos');
const follower = document.querySelector('.follower');
const following = document.querySelector('.following');

const page= document.getElementById('page');
const twitter = document.getElementById('twitter');
const company = document.getElementById('company');

const city = document.querySelector('#city');

const months =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const noresults=document.querySelector('.error');
const modeBtn= document.querySelector('.mode-btn');
const modetext= document.querySelector('#mode');
const modeicon = document.querySelector('#mode-img');
const root = document.documentElement.style;
let darkMode=false;


async function getdata(gitUrl){
    fetch(gitUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      updateProfile(data);
    })
    .catch((error) => {
      throw error;
    });
};

searchBtn.addEventListener("click",(e)=>{
   if(input.value!==""){
    getdata(url+input.value);
   }
});

input.addEventListener(
    "keydown",
    function (e) {
      if (!e) {
        var e = window.event;
      }
      if (e.key == "Enter") {
        if (input.value !== "") {
          getdata(url + input.value);
        }
      }
    },
    false
  );

  modeBtn.addEventListener("click",(e)=>{
    if(darkMode==false){
      console.log("dark mode start")
      darkModeProperties();
      darkMode = true;
    }else{
      lightModeProperties();
      darkMode = false;
    }
  });

  function checkNull(param1, param2) {
    if (param1 === "" || param1 === null) {
      param2.style.opacity = 0.5;
      param2.previousElementSibling.style.opacity = 0.5;
      return false;
    } else {
      return true;
    }
  }

function updateProfile(data){
   if(data.message!=="Not Found"){
    photo.src=`${data.avatar_url}`;
    profileName.innerText=data.name===null ? data.login: data.name;
    dateObj= new Date(`${data.created_at}`);
    // console.log(dateObj.getFullYear());
    // console.log(dateObj.getMonth() + 1); // JavaScript months are zero-based, so we add 1
    // console.log(dateObj.getDate());
    // console.log(dateObj.getHours());
    // console.log(dateObj.getMinutes());
    // console.log(dateObj.getSeconds());
    joningDate.innerText=`${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    username.innerText=`@${data.login}`;
    username.href=`${data.html_url}`;
    bio.innerText=data.bio===null?"This profile no bio":`${data.bio}`;
    repository.innerText=data.public_repos;
    follower.innerText=data.followers;
    following.innerText=data.following;
    city.innerText = data.location!==null ? data.location : "Not Available";
    page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
    twitter.innerText= checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not available";
    twitter.href= checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}`: `#`;
    company.innerText =checkNull(data.company, company) ? data.company : "Not Available";
   }else{
    alert("Please Enter correct username");
   }
};



function darkModeProperties() {
  root.setProperty("--lm-bg", "#141D2F");
  root.setProperty("--lm-bg-content", "#1E2A47");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  modetext.innerText = "LIGHT";
  modeicon.src = "./assets/images/sun-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(1000%)");
  
  // localStorage.setItem("dark-mode", true);
}
function lightModeProperties() {
  root.setProperty("--lm-bg", "#F6F8FF");
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  modetext.innerText = "DARK";
  modeicon.src = "./assets/images/moon-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  
  // localStorage.setItem("dark-mode", false);
}

getdata(url+"Aniketbobade");

