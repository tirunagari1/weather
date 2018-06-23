const rootUrl = 'http://samples.openweathermap.org/data/2.5/weather?appid=50e82435185db8a4d0b18182eb93175c&lat=-21&lon=28'

export const fetchWeather = (lat,lon) =>  {
   const url = rootUrl + '&lat=' + lat + '&lon=' + lon
   console.log(url)
  return fetch(rootUrl)
   .then(res => res.json() )
   .then(json => ({
        temp: json.main.temp,
        weather: json.weather[0].main
   } ))
}