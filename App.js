import React, { Component } from 'react';
import Forecast from './ios/Forecast';
import Zip_WeatherAPI from './Zip_WeatherAPI';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  View,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchWeather } from './WeatherAPI';
import Highlight from 'react-native-highlight-words';

const iconNames = {
  Clear: 'md-sunny',
  Rain: 'md-rainy',
  Thunderstorm: 'md-thunderstorm',
  Clouds: 'md-cloudy',
  Snow: 'md-snow',
  Drizzle: 'md-umbrella',

}
const phrases = {
  Clear: {
    title: "Today its Clear",
    subtitle: "Rock it!!" ,
  },
  Rain: {
    title: "Rain Go Away" ,
    subtitle: "Stay inside" ,
  },
  Thunderstorm: {
    title: "Boom Thunderstorm" ,
    subtitle: "Unplug your electronic devices" ,
  },
  Clouds:{
    title: "Cloud IBM" ,
    subtitle: "I-cloud ",
  },
  Snow: {
    title: "freezing cold" ,
    subtitle: "full of snow" ,
  },
  Drizzle: {
    title: "nice drizzle" ,
    subtitle: "dont ask much",
  },




}

export default class App extends Component {
  componentWillMount(){
    this.state = {
      temp:0,
      zip: "",
      forecast: null,
      weather:'Clear'
    }
  }
 
  componentDidMount() {
    this.getLocation()
  }
  getLocation(){
    navigator.geolocation.getCurrentPosition(
      (posData) => fetchWeather(posData.coords.latitude, posData.coords.longitude)
      .then(res => this.setState({
        temp: res.temp,
        weather: res.weather
      })) ,
      (error) => alert(error),
      {timeout: 10000}
    )
  }
  _handleTextChange = event => {
    let zip = event.nativeEvent.text;
    Zip_WeatherAPI.fetchForecast(zip)
    .then(forecast => {
      this.setState({ forecast:forecast });
    });
  };

   render() {
     let content = null;
     if(this.state.forecast !==null) {
     content = (
       <Forecast 
        main={this.state.forecast.main}
        description={this.state.forecast.description}
        temp={this.state.forecast.temp}
       />
     )}
     console.log("The Component is rendering")
    return (
      <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.header}>       
      <Icon name={iconNames[this.state.weather]} size={80} color={'white'}></Icon>
       <Text style={styles.temp}>{this.state.temp}°F</Text>
      </View>
      <View style={styles.z}>
      <TextInput 
        onSubmitEditing={this._handleTextChange}
        style={styles.input} />
      </View>
      <View style={styles.body}>
         <Text style={styles.content1}> {content}  </Text>   
        <Text style={styles.subtitle} >by srujan</Text>
      </View>
      </View>
    );
  }
}
 const styles = StyleSheet.create({
   z: {
     padding: 20
   },
   input: {
      height: 40,
      backgroundColor: '#1e90ff',
      fontSize: 30,
      textAlign: 'center'
      
   },
  container: {
    flex: 1,
    backgroundColor: '#74b9ff'
  },
  header: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#87CEFA'

  },
  temp: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 45,
    color: 'white'
  },
  body: {
    flex: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0984e3',
    margin: 10,
    opacity: 1
    
  },
  title: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 78,
    color: 'white',
    marginBottom: 5
  },
  subtitle: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 16,
    color: 'white'
  },
  content1: {
    fontSize: 78,
    fontWeight: 'bold'
  }
 
});
