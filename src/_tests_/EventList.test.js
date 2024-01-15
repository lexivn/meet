// Test that checks if EventList contains an element that has the role "list"
import { render, within, waitFor } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';
import App from '../App';

describe('<EventList /> component', () => {
  let EventListComponent;
  beforeEach(() => {
    EventListComponent = render(<EventList />);
  })

  test('has an element with "list" role', () => {
    expect(EventListComponent.queryByRole('list')).toBeInTheDocument();
  });

  test('renders correct number of events', async () => {
    const allEvents = await getEvents();
    // EventListComponent.rerender(<EventList events={    // Using rerender to make it include the new events prop.
    //   [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    // } />);
    EventListComponent.rerender(<EventList events={allEvents} />);
    expect(EventListComponent.getAllByRole('listitem')).toHaveLength(allEvents.length);
  });

  describe('<EventList /> integration', () => {

    test('renders a list of 32 events when the app is mounted and rendered', async () => {
      const AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });     
  })

});