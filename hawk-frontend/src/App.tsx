import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import {RechartsDevtools} from '@recharts/devtools'



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
    </Routes>
    </BrowserRouter>
  );
}

export default App;
