import { useState } from "react";


const NumberOfEvents = ({ setNumberOfEvents, setErrorAlert }) => {

  const [eventNumber, setEventNumber] = useState('32');
  const handleInputChange = (event) => {
    const value = event.target.value;
    setEventNumber(value);
    setNumberOfEvents(value);

    let errorText
    if( isNaN(value) || value <= 0) {
      errorText = 'The value is not a number, please enter a number';
    }
    else {
      errorText = '';
      setNumberOfEvents(value);
    }
    setErrorAlert(errorText);    
  }

  return (
    <div >
      <input id="number-of-events"
        type="text"        
        value={eventNumber}
        onChange={handleInputChange}
        data-testid="number-of-events-input"        
      />
    </div>
  )

}

export default NumberOfEvents;