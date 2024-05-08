import React from 'react'
import { LuEye } from "react-icons/lu";
import { FiDroplet } from "react-icons/fi";
import { BsWind } from "react-icons/bs";
import { IoMdSpeedometer } from "react-icons/io";
import { LuSunrise } from "react-icons/lu";
import { FiSunset } from "react-icons/fi";

export interface information {
    visibility : string;
    humidity : string;
    windSpeed : string;
    airPressure : string;
    sunrise : string;
    sunset : string;
}

export default function WeatherDetails(props: information) {
    const {
        visibility = "25km",
        humidity = "61%",
        windSpeed = "3.1m/s",
        airPressure = "1013hPa",
        sunrise = "06:00 AM",
        sunset  = "06:00 PM",
    }= props;
  return (
    <div className=' flex items-center  justify-around w-full'>
        <SingleWeatherDetails information="visibility" icon={<LuEye/>} value={visibility}/>
        <SingleWeatherDetails information="humidity" icon={<FiDroplet/>} value={humidity}/>
        <SingleWeatherDetails information="wind Speed" icon={<BsWind/>} value={windSpeed}/>
        <SingleWeatherDetails information="air Pressure" icon={<IoMdSpeedometer/>} value={airPressure}/>
        <SingleWeatherDetails information="sunrise" icon={<LuSunrise/>} value={sunrise}/>
        <SingleWeatherDetails information="sunset" icon={<FiSunset/>} value={sunset}/>
    </div>
  )
}

export interface SingleWeatherDetailProps {
    information : string;
    icon : React.ReactNode;
    value : string;
} 
function SingleWeatherDetails (props: SingleWeatherDetailProps){
  return (
    <div className=' flex flex-col items-center gap-4 text-xs font-semibold h-full justify-between'>
      <p className=' whitespace-nowrap'> {props.information}</p>
      <div className=' text-3xl'>{props.icon}</div>
      <p>{props.value}</p>
    </div>
  )
}
