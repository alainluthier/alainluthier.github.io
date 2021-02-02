import {Hike} from './hike.js';
const hike = new Hike("hikes");
window.addEventListener("load", () => {
    hike.showHikeList();
});