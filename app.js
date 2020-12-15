var day;

let date;
let light;
let shadow;
let moon;
let percentage;
let locatie;
let r;
let s;
let checkbox;

const API_KEY = "03600cd5836149eea44abe3390391835";

document.addEventListener("DOMContentLoaded", function () {
  day = getDate();

  date = document.querySelector(".js-date");
  light = document.querySelector(".js-light");
  shadow = document.querySelector(".js-shadow");
  moon = document.querySelector(".js-moon");
  percentage = document.querySelector(".js-percentage");
  locatie = document.querySelector(".js-locatie");
  r = document.querySelector(".js-rise");
  s = document.querySelector(".js-set");
  checkbox = document.querySelector(".js-switch__button");

  getPhase();
  getlocation();
  hidePercentage();

  date.placeholder = day;

  date.addEventListener("change", function() {
    day = this.value;
    getPhase();
    getlocation();
  });
});

const SetMoon = function(percent)
{
percentage.innerHTML = Math.round(percent * 100) + "%";

let shadowRadius        = Math.abs(50-(percent*100));
let lightMove           = (100-(percent*100))*1;
let shadowMove          = ((percent*100))*1;

if(percent > 0.5)
{
  moon.setAttribute('style',"background: linear-gradient(to bottom,rgba(10,20,30,1) 25%,rgba(20,40,60,1) 100%)");
}
else
{
  moon.setAttribute('style',"background: linear-gradient(to bottom,rgba(210,220,230,1) 25%,rgba(200,210,250,1) 100%)");
}

light.setAttribute('style', "left :"+ "calc( (50% - var(--moon-size)/2) - "+lightMove+"%); border-radius :"+ shadowRadius + "%/50%;");
shadow.setAttribute('style', "right :"+ "calc( (50% - var(--moon-size)/2) - "+shadowMove+"%); border-radius :"+ shadowRadius + "%/50%;");
};

const getPhase = async function()
{
    id = Number(new Date(day))/1000|0;
    const data = await fetch(`http://api.farmsense.net/v1/moonphases/?d=${id}`)
    .then(r => r.json())
    .catch(err => console.error('An error occured: ',err));
    SetMoon(data[0].Illumination)
}

const getlocation = async function()
{
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  function showPosition(position)
  {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    getName(lat,long);
    getTime(lat,long);
  }
}

const getName = async function(lat,long)
{
  let query = "latitude=" + lat + "&longitude=" + long + "&localityLanguage=nl";
  const data = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?${query}`)
  .then(r => r.json())
  .catch(err => console.error('An error occured: ',err));
  locatie.innerHTML = data.locality + ', ' + data.countryName;
}

const getTime = async function(lat,long)
{
  let date = getDate();
  const data = await fetch(`https://api.ipgeolocation.io/astronomy?apiKey=${API_KEY}&lat=${lat}&long=${long}&date=${day}`)
  .then(r => r.json())
  .catch(err => console.error('An error occured: ',err));
  var Rise = data.moonrise;
  var Set = data.moonset;
  r.innerHTML = Rise;
  s.innerHTML = Set;
}

const hidePercentage = function()
{
  checkbox.addEventListener( 'change', function() {
      if(this.checked) {
        percentage.classList.add("u-hidden")
      } else {
        percentage.classList.remove("u-hidden")
      }
  });
}

const getDate = function()
{
  var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
}


