let myMap;
let myWeather;
let count = 0;

class Weather {
    constructor(lat, lng) {
        this.API_KEY_DARK_SKY = 'ce9145bc7308a8e147f828a316847640';
        this.API_KEY_GOOGLE = 'AIzaSyBly3r5MKIbTNExMwvRwVfX9R_CeuKhw5s';
        this.lat = lat;
        this.lng = lng;
        this.arrCountry = [];
        this.myMap = {};
    }

    init() {
        this.handlerEvent();
        this.getLatLng("Minsk");
        ymaps.ready(this.getMap.bind(this));
    }

    getMap(lat, lng) {
        this.myMap = new ymaps.Map('map', {
            center: [53.90, 27.56], // Минск
            zoom: 10
        }, {
            searchControlProvider: 'yandex#search'
        });

        var showCenter = () => {
            let arrCentr = this.myMap.getCenter();
            this.getWeather(arrCentr[0], arrCentr[1]);
        };
        this.myMap.events.add('actionend', showCenter);
    }

    handlerEvent() {
        document.querySelector('.searchBtnJS').addEventListener('click', () => this.getInput());
    }

    getInput() {
        let country = document.querySelector('.searchJS').value;
        this.getLatLng(country);
        this.setHistory(country);
    }

    getLatLng(country) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${country}&key=${this.API_KEY_GOOGLE}`)
            .then((req) => req.json())
            .then((data) => {
                console.log(data.results[0].geometry.location);
                return data.results[0].geometry.location;
            })
            .then((objLatLng) => {
                this.getWeather(objLatLng.lat, objLatLng.lng);
                this.myMap.setCenter && this.myMap.setCenter([objLatLng.lat, objLatLng.lng], 10, { //костыль
                    duration: 2000
                });
            })
    }

    getWeather(lat, lng) {
        fetch(`http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/${this.API_KEY_DARK_SKY}/${lat},${lng}?lang=ru&units=si`)
            .then((req) => req.json())
            .then((data) => {
                let dataW = JSON.parse(data.body);
                console.log(dataW);
                let divW = document.querySelector(".weather");
                divW.innerHTML = `${((dataW.currently.temperature  - 32 ) * (5 / 9)).toFixed(2)} C&ordm;`; //Цельсия
                divW.innerHTML += `<br> ${dataW.currently.summary}`;

            })

    }

    setHistory(country) {
        count++;
        console.log(count);
        if (count <= 5) {
            document.querySelector(".historyUL").innerHTML += "<li>\n" + country + "</li>";
        } else {
            return;
        }
    }



}

let weather = new Weather();
weather.init();