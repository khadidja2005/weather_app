"use client";
import Navbar from "@/Components/Navbar";
import axios from "axios";
import { fromUnixTime, parseISO } from "date-fns";
import Image from "next/image";
import { compareAsc, format } from "date-fns";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Container from "@/Components/Container";
import { convertKelvinToCelsius } from "@/utils/KalvinToCelisius";
import WeatherDetails from "@/Components/WeatherDetails";
import Forcast_data from "@/Components/Forcast_data";
interface WeatherDetail {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetail[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>('repoData', async () => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=algiers&appid=fb3bb56d26bba696d51dd3a9f60a0162&cnt=56`);
    return data;
  });

  if (isLoading) return (
    <div className="flex items-center min-h-screen justify-center">
      <p className="animate-bounce">Loading...</p>
    </div>);

  const firstdate = data?.list[0];
  console.log("data", data);
  console.log("process", process.env.MY_API_KEY);
  const Uniquedate = [
    ...new Set(data?.list.map((item) => 
    new Date(item.dt *1000).toISOString().split('T')[0]))
  ]
  const firstDataForEachDate = Uniquedate.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  return (
    <div className=" bg-gray-100 min-h-screen flex flex-col gap-4 ">
      <Navbar />
      <main className=" px-3 mx-auto max-w-7xl flex flex-col w-full gap-9 pb-10 pt-4">
        <section className=" space-y-4">
          <div className=" space-y-2">
            <h2 className=" flex text-2xl items-end gap-1">
              <p className="text-2xl">{format(parseISO(firstdate?.dt_txt ?? ""), 'EEEE')}</p>
              <p className=" text-lg">({format(parseISO(firstdate?.dt_txt ?? ""), 'dd.MM.yyyy')})</p>
            </h2>
            <Container className=" gap-10 px-6 items-center">
              <div className=" flex flex-col px-4 ">
                <span className=" text-3xl">
                  {convertKelvinToCelsius(firstdate?.main.temp ?? 293.67)}°C
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span> Feels like</span>
                  <span>
                    {convertKelvinToCelsius(firstdate?.main.feels_like ?? 293.67)}°C
                  </span>
                </p>
                <p className="text-xs space-x-2">
                  <span>
                    {convertKelvinToCelsius(firstdate?.main.temp_min ?? 0)}
                    °↓{" "}
                  </span>
                  <span>
                    {" "}
                    {convertKelvinToCelsius(firstdate?.main.temp_max ?? 0)}
                    °↑
                  </span>
                </p>
              </div>
              <div className=" flex justify-between  w-full overflow-x-auto gap-10 sm:gap-16 pr-3 ">
                {data?.list.map((item, index) =>
                (
                  <div
                    key={index}
                    className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
                    <p className="whitespace-nowrap">
                      {format(parseISO(item.dt_txt), "h:mm a")}
                    </p>
                    <Image
                      width={50}
                      height={50}
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt="weather-icon" />
                    <p>{convertKelvinToCelsius(item?.main.temp ?? 293.67)}°C</p>
                  </div>
                )
                )}
              </div>
            </Container>
          </div>
          <div className=" flex gap-4 ">
            <Container className=" w-fit items-center flex-col justify-center px-4 py-6">
              <p className=" capitalize text-center"> {firstdate?.weather[0].description}</p>
              <Image
                width={50}
                height={50}
                src={`https://openweathermap.org/img/wn/${firstdate?.weather[0].icon}.png`}
                alt="weather-icon" />

            </Container>
            <Container className=" w-full items-center flex-col justify-center px-4 py-6 bg-yellow-300/80 ">
              <WeatherDetails visibility={`${firstdate?.visibility} %` ?? "NAN"} airPressure={`${firstdate?.main.pressure} Pha` ?? "NAN"} windSpeed={`${firstdate?.wind.speed} km/h` ?? "NAN"} humidity={`${firstdate?.main.humidity} %` ?? "NAN"} sunrise={format(data?.city.sunrise ?? 1702949452, "H:mm")} sunset={format(data?.city.sunset ?? 1702517657, "H:mm")} />
            </Container>
          </div>
        </section>
        <section className="flex flex-col gap-4 w-full">
          <p className=" text-2xl">Forcast(7 Days)</p>
       {firstDataForEachDate.map((d, index) => (
        <Forcast_data 
        key={index}
        description={d?.weather[0].description ?? ""}
        weathericon={d?.weather[0].icon ?? "01d"}
        date={d ? format(parseISO(d.dt_txt), "dd.MM") : ""}
        day={d ? format(parseISO(d.dt_txt), "dd.MM") : "EEEE"}
        feels_like={d?.main.feels_like ?? 0}
        temp={d?.main.temp ?? 0}
        temp_max={d?.main.temp_max ?? 0}
        temp_min={d?.main.temp_min ?? 0}
        airPressure={`${d?.main.pressure} hPa `}
        humidity={`${d?.main.humidity}% `}
        sunrise={format(
          fromUnixTime(data?.city.sunrise ?? 1702517657),
          "H:mm"
        )}
        sunset={format(
          fromUnixTime(data?.city.sunset ?? 1702517657),
          "H:mm"
        )}
        visibility ={`${d?.visibility ?? 50000} `}
        windSpeed={`${d?.wind.speed ?? 1.64} `}/>
       ))}

        </section>
      </main>
    </div>
  );
}
