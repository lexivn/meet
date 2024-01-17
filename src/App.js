import React, { useEffect, useState } from "react";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import { extractLocations, getEvents } from "./api";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocaltions, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  useEffect(() => {
    fetchData();
  }, [currentCity, setCurrentNOE]);

  // const fetchData = async () => {
  //   const allEvents = await getEvents();
  //   setEvents(allEvents.slice(0, currentNOE)); // Getting all the events
  //   setAllLocations(extractLocations(allEvents)); // Getting all the Locations
  // }

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  return (
    <div className="App">
      <CitySearch allLocations={allLocaltions} setCurrentCity={setCurrentCity} />
      <NumberOfEvents setNumberOfEvents={setCurrentNOE} />
      <EventList events={events} />
    </div>
  );
}

export default App;
