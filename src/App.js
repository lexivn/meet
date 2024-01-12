import React, { useState } from 'react';
// import logo from './logo.svg';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import './App.css';
import NumberOfEvents from './components/NumberOfEvents';

function App() {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  
  return (
    <div className="App">
      {/* <div id="event-list" ></div> */}
      <CitySearch />
      <EventList />
      <NumberOfEvents setNumberOfEvents={setCurrentNOE}/>      
    </div>
  );
}

export default App;
