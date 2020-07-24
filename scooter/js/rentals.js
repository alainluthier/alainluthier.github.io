const requestURL = 'http://127.0.0.1:5500/project/data/scooter.json';
fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        const scooters = jsonObject['scooters'];
        for (let i = 0; i < scooters.length; i++) {
            let card = document.createElement('section');
            let title = document.createElement('h2');
            let subTitle = document.createElement('h2');
            let capacity = document.createElement('h3');
            let image = document.createElement('img');
            let divReservation = document.createElement('div');
            let titReservation = document.createElement('h3');
            let halfRes = document.createElement('p');
            let fullRes = document.createElement('p');
            let divWalkIn = document.createElement('div');
            let titWalk = document.createElement('h3');
            let halfWalk = document.createElement('p');
            let fullWalk = document.createElement('p');
            title.textContent = scooters[i].rentalType;
            subTitle.textContent = scooters[i].rentalSubType;
            capacity.textContent = "Max. Persons: "+ scooters[i].maxPersons;
            image.src = "images/"+scooters[i].image;;
            titReservation.textContent = "Reservation"
            halfRes.textContent = "Half Day (3 hrs): $" + scooters[i].reservation.halfDay;
            fullRes.textContent = "Full Day: $" + scooters[i].reservation.halfDay;
            titWalk.textContent = "Walk-in"
            halfWalk.textContent = "Half Day (3 hrs): $" + scooters[i].walkIn.halfDay;
            fullWalk.textContent = "Full Day: $" + scooters[i].walkIn.halfDay;
            divReservation.classList.add("reservation");
            divReservation.appendChild(titReservation);
            divReservation.appendChild(halfRes);
            divReservation.appendChild(fullRes);
            divWalkIn.classList.add("walkin");
            divWalkIn.appendChild(titWalk);
            divWalkIn.appendChild(halfWalk);
            divWalkIn.appendChild(fullWalk);
            card.appendChild(title);
            card.appendChild(capacity);
            card.appendChild(image);
            card.appendChild(divReservation);
            card.appendChild(divWalkIn);
            document.querySelector('div.cards').appendChild(card);  
        }
        
    });