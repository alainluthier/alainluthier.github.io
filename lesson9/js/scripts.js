/*FORM*/ 
function adjustRating(rating) {
    document.getElementById("stormValue").innerHTML = rating;
}

WebFont.load({
    google: {
      families: ["Nunito","Ubuntu"]
    }
  });
function toogleButton(){
    document.getElementById("primaryNav").classList.toggle("hide");
}
const currentDate = new Date();
//console.log(currentDate)
const formatterMonth = new Intl.DateTimeFormat('en', { month: 'long' });
const formatterWeekday = new Intl.DateTimeFormat('en', { weekday: 'long' });
const month = formatterMonth.format(currentDate);
const weekday = formatterWeekday.format(currentDate);
document.getElementById("currentDate").textContent = weekday+ ", "+currentDate.getDate()+" "+month + " "+currentDate.getFullYear();
//console.log(currentDate.getDay())
if(currentDate.getDay()==6){
    document.getElementById("message").classList.add("showme");
}else{
    document.getElementById("message").classList.add("hideme");
}
try {
    const t = parseFloat(document.getElementById("temperature").textContent);
    //console.log(t);
    const s = parseFloat(document.getElementById("windSpeed").textContent);
    //console.log(s);
    let chill = 35.74 + 0.6215*t - 35.75*Math.pow(s,0.16) + 0.4275*t*Math.pow(s,0.16);
    //console.log(chill);
    if (t<=50 && s > 3){
        document.getElementById("chill").textContent = Math.round(chill)+'°F';
    }else{
        document.getElementById("chill").textContent = "No today";
    }
 }
 catch (e) {
    
 }

/*==MAIN==*/
const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) { 
    const towns = jsonObject['towns'];
    for (let i = 0; i < towns.length; i++ ) {
        if(towns[i].name == 'Preston' || towns[i].name == 'Fish Haven' || towns[i].name == 'Soda Springs'){
            let card = document.createElement('section');
            let div = document.createElement('div');
            let name = document.createElement('h2');
            let motto = document.createElement('h4');
            let yearFounded = document.createElement('p');
            let currentPopulation = document.createElement('p');
            let averageRainfall = document.createElement('p');
            let photo = document.createElement('img');
            document.querySelector('div.cards').appendChild(card);       
            name.textContent = towns[i].name;
            motto.textContent = towns[i].motto;
            yearFounded.textContent = 'Year Founded: '+towns[i].yearFounded;
            currentPopulation.textContent = 'Population: '+towns[i].currentPopulation;
            averageRainfall.textContent = 'Annual Rain Fall: '+towns[i].averageRainfall;
            photo.setAttribute('src', 'images/'+towns[i].photo);
            photo.setAttribute('alt', towns[i].name);
            div.className += "data";
            div.appendChild(name);
            div.appendChild(motto);
            div.appendChild(yearFounded);
            div.appendChild(currentPopulation);
            div.appendChild(averageRainfall);
            card.appendChild(div)
            card.appendChild(photo);          
            
        }
    }
  });
