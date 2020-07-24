const weekdayList = new Array(7);
weekdayList[0]="Sunday";
weekdayList[1]="Monday";
weekdayList[2]="Tuesday";
weekdayList[3]="Wednesday";
weekdayList[4]="Thursday";
weekdayList[5]="Friday";
weekdayList[6]="Saturday";

const apiWeatherURL = '//api.openweathermap.org/data/2.5/weather?id=3530103&units=imperial&APPID=6b9c5672320acb9a1bc5cae27fa01ef5';
fetch(apiWeatherURL)
  .then((response) => response.json())
  .then((jsObject) => {
    console.log(jsObject);
    document.getElementById('temperature').textContent = jsObject.main.temp;    
    document.getElementById('humidity').textContent = jsObject.main.humidity;
    document.getElementById('windSpeed').textContent = jsObject.wind.speed;
    document.getElementById('currently').textContent = jsObject.weather[0].main;
  });
const d = new Date();
const todayDayNumber = d.getDay();

const apiForecastURL = '//api.openweathermap.org/data/2.5/forecast?id=3530103&units=imperial&APPID=6b9c5672320acb9a1bc5cae27fa01ef5';

fetch(apiForecastURL)
  .then((response) => response.json())
  .then((weatherinfo) => {
    console.log(weatherinfo);
    let mylist = weatherinfo.list;
    let forecastDayNumber = todayDayNumber;
    for(i=0;i<mylist.length;i++){
      let time = mylist[i].dt_txt;
      if(time.includes("18:00:00")){
        forecastDayNumber+=1;
        if(forecastDayNumber===7){
          forecastDayNumber=0;
        }
        let theDayName = document.createElement("h5");
        theDayName.textContent=weekdayList[forecastDayNumber];
        let theTemp = document.createElement("p");
        theTemp.textContent=weatherinfo.list[i].main.temp + "\xB0";
        let iconcode=weatherinfo.list[i].weather[0].icon;
        let iconPath="//openweathermap.org/img/w/"+iconcode+".png";
        let theIcon=document.createElement("img")
        theIcon.src=iconPath;
        let theDay = document.createElement("div");
        theDay.appendChild(theDayName);
        theDay.appendChild(theIcon);
        theDay.appendChild(theTemp);
        document.getElementById("weatherforecast").appendChild(theDay);
      }
    }
    
  });