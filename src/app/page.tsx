'use client'

import { useEffect, useState } from "react"
import styles  from "./pag.module.css"


function getData():string{
  const currentDate:any =new Date();
const option = {month:"long"}


 const currentMonth = currentDate.toLocaleDateString("en-US",option)
 const date=new Date().getDate()+" "+currentMonth
return date
}




export default function Home() {
  let date:any = getData()
  const [weatherData, setWeatherData]=useState<any>([])
  const [city, setCity]=useState("Lahore")

  async function fetachDataApi(cityName:string) {

      try {
        const response = await fetch(
          "http://localhost:3000/api/weather?address=" + cityName
        );
        const jsonData = (await response.json()).data;
        setWeatherData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    
  }
  useEffect(()=>{
    fetachDataApi("Lahore")
  },[])
  return (
  
    <main className={styles.main}>
    <article className={styles.widget}>
      <form
        className={styles.weatherLocation}
        onSubmit={(e) => {
          e.preventDefault();
          fetachDataApi(city);
        }}
      >
        <input
          className={styles.input_field}
          placeholder="Enter city name"
          type="text"
          id="city"
          name="city"
          onChange={(e) => setCity(e.target.value)}
        />
        <button className={styles.search_button} type="submit">
          Seach
        </button>
      </form>
      {weatherData && weatherData.weather && weatherData.weather[0] ? (
        <>
          <div className={styles.icon_and_weatherInfo}>
            <div className={styles.weatherIcon}>
              {weatherData?.weather[0]?.description === "rain" ||
              weatherData?.weather[0]?.description === "fog" ? (
                <i
                  className={`wi wi-day-${weatherData?.weather[0]?.description}`}
                ></i>
              ) : (
                <i className="wi wi-day-cloudy"></i>
              )}
            </div>
            <div className={styles.weatherInfo}>
              <div className={styles.temperature}>
                <span>
                  {(weatherData?.main?.temp - 273.5).toFixed(2) +
                    String.fromCharCode(176)}
                </span>
              </div>
              <div className={styles.weatherCondition}>
                {weatherData?.weather[0]?.description?.toUpperCase()}
              </div>
            </div>
          </div>
          <div className={styles.place}>{weatherData?.name}</div>
          <div className={styles.date}>{date}</div>
        </>
      ) : (
        <div className={styles.place}>Loading...</div>
      )}
    </article>
  </main>
 
  );
}
