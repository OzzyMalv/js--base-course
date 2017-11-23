const API_KEY_GOOGLE = 'AIzaSyBly3r5MKIbTNExMwvRwVfX9R_CeuKhw5s';
const API_KEY_DARK_SKY = 'ce9145bc7308a8e147f828a316847640';
// let myMap;
let myWeather;
let count = 0;

class Weather {
    constructor(lat, lng) {
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
            this.getWeatherShow(arrCentr[0], arrCentr[1]);
        };
        this.myMap.events.add('actionend', showCenter);
    }

    handlerEvent() {
        document.querySelector('.searchBtnJS').addEventListener('click', () => this.getInput());
        document.querySelector('.addFavorites').addEventListener('click', () => this.setFavorites());
        document.querySelector(".historyUL").addEventListener("click", ev => this.getLatLng(ev.target.innerHTML));
    }

    getInput() {
        let country = document.querySelector('.searchJS').value;
        this.getLatLng(country);
        this.setHistory(country);
        this.renderHistory();
    }

    getLatLng(country) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${country}&key=${API_KEY_GOOGLE}`)
            .then((req) => req.json())
            .then((data) => {
                console.log(data.results[0].geometry.location);
                return data.results[0].geometry.location;
            })
            .then((objLatLng) => {
                this.getWeatherShow(objLatLng.lat, objLatLng.lng);
                this.myMap.setCenter && this.myMap.setCenter([objLatLng.lat, objLatLng.lng], 10, { //костыль
                    duration: 2000
                });
            })
    }

    //xhr
    getLatLngXhr(country) {
        let that = this;
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(
                "GET",
                `https://maps.googleapis.com/maps/api/geocode/json?address=${country}&key=${API_KEY_GOOGLE}`,
                true
            );
            xhr.send();

            xhr.onload = xhr.onerror = function() {
                if (this.status !== 200) console.log("error:  " + this.status);
                let data = JSON.parse(this.response);
                return resolve(data.results[0].geometry.location);
            };
        });
    }

    // getWeatherXhr(coordinates) {
    //         let that = this;
    //         return new Promise((resolve, reject) => {
    //                     let xhr = new XMLHttpRequest();
    //                     xhr.open("GET", `http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${coordinates.latitude ||
    //          coordinates.lat},${coordinates.longitude ||
    //       coordinates.lng}?lang=ru&units=si`, true);
    //                     xhr.send();

    //                     xhr.onload = xhr.onerror = function() {
    //                         if (this.status !== 200) console.log('error:  ' + this.status);
    //                         var data = JSON.parse(this.response);
    //                         that.renderWeather(JSON.parse(data.body).currently)
    //                     }

    //end xhr


    getWeatherShow(lat, lng) {
        fetch(`http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/${API_KEY_DARK_SKY}/${lat},${lng}?lang=ru&units=si`)
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
        // count++;
        // console.log(count);
        // }
        if (this.arrCountry[0] === country) {
            return;
        }
        if (this.arrCountry.indexOf(country) > 0) {
            this.arrCountry.splice(this.arrCountry.indexOf(country), 1); //только 1 элемент (сколько удалять)
        }
        if (this.arrCountry.length > 4) {
            this.arrCountry.pop();
        }

        this.arrCountry.unshift(country);
        console.log(this.arrCountry);
    }

    renderHistory() {
        let arrayLi = document.querySelector(".historyUL");
        arrayLi.innerHTML = " ";
        this.arrCountry.map((currentValue) => {
            arrayLi.innerHTML += `<li class="historyItem">${currentValue}</li>`;

        })

    }

    clickHistory() {

    }

    setFavorites(country) {

    }

    // if (count <= 5) {
    //     document.querySelector(".historyUL").innerHTML += "<li>\n" + country + "</li>";
    // } else {
    //     return;
    // }




}

let weather = new Weather();
weather.init();