
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

