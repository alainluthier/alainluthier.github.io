const currentDate = new Date();
const lastUpdated = new Date(document.lastModified);
document.getElementById("year").textContent = currentDate.getFullYear();
document.getElementById("lastUpdated").textContent = lastUpdated.toLocaleDateString()+' '+lastUpdated.toTimeString();