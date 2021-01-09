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
            card.appendChild(div);
            card.appendChild(photo);          
            let divUpcoming = document.createElement('div');
            let title = document.createElement('h3');
            title.textContent = "Upcoming Events";
            divUpcoming.appendChild(title);
            for(let j=0;j<towns[i].events.length;j++){
              let event = document.createElement('p');
              event.textContent = towns[i].events[j];
              divUpcoming.appendChild(event);
            }
            card.appendChild(divUpcoming);
        }
    }
  });
