const currentDate = new Date();
const lastUpdated = document.lastModified;
document.getElementById("year").textContent = currentDate.getFullYear();
document.getElementById("lastUpdated").textContent = lastUpdated;