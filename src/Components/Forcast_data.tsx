import React from 'react'
import WeatherDetails, { information } from './WeatherDetails'
import Container from './Container';
import WeatherIcon from './Whether';
import { convertKelvinToCelsius } from '@/utils/KalvinToCelisius';

type Props = {}

export interface forcast extends information {
    weathericon :string ,
    date : string ,
    day : string ,
    temp : number ,
    feels_like : number ,
    temp_min: number;
    temp_max: number;
    description: string;
}

function Forcast_data(props : forcast) {
    const {
     weathericon = "02d",
     date = "19.09",
     day = "Tuesday",
     temp ,
     feels_like ,
     temp_min ,
     temp_max,
     description ,
    } = props
  return (
    <Container className=' gap-4 '>
       <section className=' px-4 flex'>
       <div className=" gap-1 flex-col items-center">
          <WeatherIcon  iconName={weathericon}/>
          <p>{date}</p>
          <p className="text-sm">{day} </p>
        </div>
        <div className='px-4 flex-col items-center'>
         <span className=' text-5xl'>{convertKelvinToCelsius(temp ?? 0)}</span>
         <p className=' text-xs space-x-1 text-nowrap'>
            <span>Feels like</span>
            <span>{convertKelvinToCelsius(feels_like ?? 0)}</span>
         </p>
         <p className="capitalize"> {description}</p>
        </div>
       </section>
       <section className=" overflow-x-auto flex justify-between gap-4 px-4  w-full pr-10">
        <WeatherDetails {...props}/>
       </section>
    </Container>
  )
}

export default Forcast_data