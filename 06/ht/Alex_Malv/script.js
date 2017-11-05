// var myMap;

// // Дождёмся загрузки API и готовности DOM.
// ymaps.ready(init);

// function init() {
//     // Создание экземпляра карты и его привязка к контейнеру с
//     // заданным id ("map").
//     myMap = new ymaps.Map('map', {
//         // При инициализации карты обязательно нужно указать
//         // её центр и коэффициент масштабирования.
//         center: [55.76, 37.64], // Москва
//         zoom: 10
//     }, {
//         searchControlProvider: 'yandex#search'
//     });

//     // document.getElementById('destroyButton').onclick = function() {
//     //     // Для уничтожения используется метод destroy.
//     //     myMap.destroy();
//     // };

// }

const API_KEY_DARK_SKY = 'ce9145bc7308a8e147f828a316847640';
let = myMap;
ymaps.ready(getMap);

function getWeather() {
    let lat = 55.76;
    let lng = 37.64;
    fetch(`http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/${API_KEY_DARK_SKY}/${lat},${lng}?lang=ru&units=eu`)
        .then(data => data.json())
        .then(r => console.log(JSON.parse(r.body)))
}

getWeather();

function getMap() {
    //Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [55.76, 37.64], // Москва
        zoom: 10
    }, {
        searchControlProvider: 'yandex#search'
    });

    // document.getElementById('destroyButton').onclick = function() {
    //     // Для уничтожения используется метод destroy.
    //     myMap.destroy();
    // };

}