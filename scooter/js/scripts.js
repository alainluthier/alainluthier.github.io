const currentDate = new Date();
const formatterMonth = new Intl.DateTimeFormat('en', { month: 'long' });
const formatterWeekday = new Intl.DateTimeFormat('en', { weekday: 'long' });
const month = formatterMonth.format(currentDate);
const weekday = formatterWeekday.format(currentDate);
document.getElementById("currentDate").textContent = weekday+ ", "+currentDate.getDate()+" "+month + " "+currentDate.getFullYear();
function toogleButton(){
    document.getElementById("primaryNav").classList.toggle("hide");
}