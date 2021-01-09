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

