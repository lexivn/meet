import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import { getEvents } from '../api'

describe('<Event /> component', () => {
  let EventComponent;
  let allEvents;

  beforeEach(async () => {
    allEvents = await getEvents();
    EventComponent = render(<Event event={allEvents[0]} />);
  })

  test('Has Summary', () => {
    expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
  });

  test('Add start date', () => {
    expect(EventComponent.queryByText(allEvents[0].start.dateTime)).toBeInTheDocument();
  });

  test('Has location', () => {
    expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
  });

  test('has button show details', () => {
    expect(EventComponent.queryByText('Show Details')).toBeInTheDocument();
  });

  test('by default, event\'s detail section should be hidden', () => {
    const details = EventComponent.container.querySelector('.details');
    expect(details).not.toBeInTheDocument();

  });

  test('shows details section, when user clicks show details button', async() => {
    const user = userEvent.setup();
    const button = EventComponent.queryByText('Show Details');
    await user.click(button);
    const details = EventComponent.container.querySelector('.details');
    expect(details).toBeInTheDocument();
  });

  test('hide details section, when user clicks hide details button', async() => {
    const user = userEvent.setup();
    const showButton = EventComponent.queryByText('Show Details');
    const hideButton = EventComponent.queryByText('Hide Details');
    user.click(hideButton);
    expect(showButton).toBeInTheDocument();
    expect(hideButton).not.toBeInTheDocument();

  });

  

})