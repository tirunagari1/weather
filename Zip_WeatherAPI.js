const WEATHER_API_KEY = '50e82435185db8a4d0b18182eb93175c';
const API_STEM = "http://api.openweathermap.org/data/2.5/weather?";

const zipUrl = (zip) => {
    return `${API_STEM}q=${zip}&units=imperial&appId=${WEATHER_API_KEY}`;
}
const fetchForecast = (zip) => {
    return fetch(zipUrl(zip))
    .then(response => response.json())
    .then(json => {
        return {
            main: json.weather[0].main,
            description: json.weather[0].description,
            temp: json.main.temp
        }
    })
    .catch(error => {
        console.log(error)
    })

}

export default { fetchForecast: fetchForecast };
