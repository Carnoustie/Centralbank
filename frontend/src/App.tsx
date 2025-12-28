import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import {RechartsDevtools} from '@recharts/devtools'
import {useState, useContext, createContext, useEffect} from 'react'




function Home(props: any){

  const [country, setCountry] = useState('')

  const [yields, setYields] = useState<yieldSample[]>([])

  const countries = ['Sweden', 'Denmark', 'Norway', 'Finland', "United States", "Great Britain", "Germany", "France", "Japan", "Netherlands", "Europe"]

  const changeCountry = (event: any) => { setCountry(event.target.value)}


  const countryCodes: Record<string, string> = {
    "Finland":"FI",
    "Denmark":"DK",
    "Sweden":"SE",
    "Norway": "NO",
    "United States":"US",
    "Great Britain":"GB",
    "Germany":"DE",
    "France":"FR",
    "Japan":"JP",
    "Netherlands":"NL",
    "Europe":"EM"
  }


  type yieldSample = {
    value: number;
    date: number;
  }

  async function getYieldCurve(countryName: any){

    console.log("Hit here")

    const code = countryCodes[country]

    console.log(country)

    const response = await fetch(`http://localhost:8000/getYieldCurve?countrycode=${encodeURIComponent(code)}`)

    const result = await response.json();

    const formattedData = result.map((item: any) => ({
      ...item,
      date: new Date(item.date).getTime()
    }));



    setYields(formattedData)
    console.log(formattedData)
    // console.log(result.map( (yieldTuple: any) => yieldTuple.value))
  
  }

  const data = [
    {
      x: 1,
      pv: 5
    },
    {
      x:3,
      pv:9
    }
  ];

  const selectedTicks = yields.filter((_,i)=> i%1500 ===0 ).map(d => d.date);

  console.log("Selected ticks:    ", selectedTicks)

  return(
    <div className='App'>
      <br/>
      <h1>
        Welcome to the Bond market
      </h1>
      <br/>
      <select value = {country} onChange= {changeCountry}>
        {countries.map((c) => <option value={c}> {c} </option> )}
      </select>
      <h1>
        Currently selecting: {country}
      </h1>
      <button onClick={getYieldCurve}>
        Fetch historical 10-year yields
      </button>
      <br/>
      <br/>

      <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 800, margin: 'auto'}} responsive data={yields}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        <XAxis dataKey="date" type="number" scale= "time" tickFormatter ={ (unixTime)=> new Date(unixTime).getFullYear().toString() } ticks={selectedTicks}/>
        <YAxis width = {40}/>
        <Line type="monotone" dataKey="value" stroke="#d64444ff" dot={false}/>
        <RechartsDevtools/>
      </LineChart>
    </div>
  )
}


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route
        path='/'
        element= <Home/>
      />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
