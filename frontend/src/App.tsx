import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import {RechartsDevtools} from '@recharts/devtools'
import {useState, useContext, createContext, useEffect} from 'react'



function DropDown(props:any){

  const [country, setCountry] = useState('')

  const countries = ['Sweden', 'Denmark', 'Norway', 'Finland']

  const changeCountry = (event: any) => { setCountry(event.target.value)}


    async function getYieldCurve(countryName: any){
      let apiPromise = await fetch('localhost:8000/getYieldCurve', {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(countryName)
      })

      console.log(apiPromise.json())
    }

  return(
    <div className='App'>
      <select value = {country} onChange= {changeCountry}>
        {countries.map((c) => <option value={c}> {c} </option> )}
      </select>
      <h1>
        Currently selecting: {country}
      </h1>
      <button onClick={getYieldCurve}>
        Fetch yield curve
      </button>
    </div>
  )
}


function Home(props: any){

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

  return(
    <div className='App'>
      <br/>
      <h1>
        Welcome to the Bond market
      </h1>
      <br/>
      <Link to = '/DropDown'>
        Enter Dropdown!
      </Link>
      <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 800, margin: 'auto'}} responsive data={data}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        <XAxis dataKey="x" type="number"/>
        <YAxis width="auto"/>
        <Line type="monotone" dataKey="uv" stroke="#8884d8"/>
        <Line type="monotone" dataKey="pv" stroke="#e20f08ff"/>
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
      <Route
        path='/DropDown'
        element= <DropDown/>
      />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
