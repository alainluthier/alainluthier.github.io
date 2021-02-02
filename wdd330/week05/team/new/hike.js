//create an array of hikes
const hikeList = [{
        name: "Bechler Falls",
        imgSrc: "falls.jpg",
        imgAlt: "Image of Bechler Falls",
        distance: "3 miles",
        difficulty: "Easy",
        description: "Beautiful short hike along the Bechler river to Bechler Falls",
        directions: "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead."
    },
    {
        name: "Teton Canyon",
        imgSrc: "falls.jpg",
        imgAlt: "Image of Bechler Falls",
        distance: "3 miles",
        difficulty: "Easy",
        description: "Beautiful short (or long) hike through Teton Canyon.",
        directions: "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
    },
    {
        name: "Denanda Falls",
        imgSrc: "falls.jpg",
        imgAlt: "Image of Bechler Falls",
        distance: "7 miles",
        difficulty: "Moderate",
        description: "Beautiful hike through Bechler meadows river to Denanda Falls",
        directions: "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
    }
];
const imgBasePath = "//byui-cit.github.io/cit261/examples/";
//on load grab the array and insert it into the page
export class Hike {
    constructor(id) {
        this.parentElement = document.getElementById(id);
        this.backButton = this.createBackButton();
    }
    getAllHikes() {
        return hikeList;
    }
    getHikeByName(name) {
        return hikeList.find(hike => hike.name === name);
    }
    showHikeList() {
        this.parentElement.innerHTML='';
        renderHikeList(this.getAllHikes(),this.parentElement);
        this.addHikeListener();
        this.backButton.classList.add('hidden');
    }
    createBackButton(){
        const backButton = document.createElement('button');
        backButton.innerHTML='&lt- Return';
        backButton.addEventListener('click',()=>{this.showHikeList();});
        this.parentElement.before(backButton);
        return backButton;
    }
    showOneHike(name){
        this.parentElement.innerHTML='';
        this.parentElement.appendChild(renderOneHikeFull(this.getHikeByName(name)));
        this.backButton.classList.remove('hidden');
    }
    addHikeListener(){
        const array = Array.from(this.parentElement.children);
        array.forEach( hike => {
            hike.addEventListener('click',e=>{
                this.showOneHike(e.currentTarget.children[0].innerHTML);
                //console.log(e.currentTarget.children[0].innerHTML);
            })
        }
        );
    }
}

function renderHikeList(hikes, parent) {
    hikes.forEach(hike => {
        parent.appendChild(renderOneHike(hike));
    });
}

function renderOneHike(hike) {
    const item = document.createElement("li");
    item.innerHTML = ` <h2>${hike.name}</h2>
          <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
          <div>
                  <div>
                      <h3>Distance</h3>
                      <p>${hike.distance}</p>
                  </div>
                  <div>
                      <h3>Difficulty</h3>
                      <p>${hike.difficulty}</p>
                  </div>
          </div>`;

    return item;
}
function renderOneHikeFull(hike) {
    const item = document.createElement("li");
    item.innerHTML = ` <h2>${hike.name}</h2>
          <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
          <div>
                  <div>
                      <h3>Distance</h3>
                      <p>${hike.distance}</p>
                  </div>
                  <div>
                      <h3>Difficulty</h3>
                      <p>${hike.difficulty}</p>
                  </div>
                  <div>
                  <h3>Distance</h3>
                        <p>${hike.description}</p>
                    </div>
                    <div>
                        <h3>Difficulty</h3>
                        <p>${hike.directions}</p>
                    </div>
          </div>`;

    return item;
}