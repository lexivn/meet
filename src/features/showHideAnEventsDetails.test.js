/*
 ** Writing Acceptance Test BBD for Feature 2, using jest-cucumber
 */
import { render, screen } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Event from '../components/Event';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  // Scenario 1
  test('An event element is collapsed by default.', ({
    given,
    when,
    then,
    and,
  }) => {
    let AppComponent;
    given('there are events available in the app', () => {
      AppComponent = render(<App />);
    });

    when('the user navigates to the events page', () => {});

    then('each event element should be in a collapsed state by default', () => {
      const EventDOM = AppComponent.container.firstChild;
      const details = EventDOM.querySelector('.details');
      expect(details).not.toBeInTheDocument();
    });

    and(
      'the user should see a summary or basic information for each event',
      async () => {
        const Events = await getEvents();
        render(<Event event={Events[0]} />);
        expect(screen.getByText(Events[0].summary)).toBeInTheDocument();
        expect(screen.getByText(Events[0].location)).toBeInTheDocument();
        // Second way:
        // const allEvents = await getEvents();
        // await waitFor(() => {
        //   const EventComponent = render(<Event event={allEvents[0]} />);
        //   expect(
        //     EventComponent.queryByText(allEvents[0].summary)
        //   ).toBeInTheDocument();
        // });
      }
    );
  });

  // Scenario 2
  test('User can expand an event to see details.', ({
    given,
    when,
    then,
    and,
  }) => {
    given('The user is on the events page', () => {});

    when('the user chooses to expand an event element', async () => {
      const user = userEvent.setup();
      const Events = await getEvents();
      render(<Event event={Events[0]} />);
      expect(screen.getByText('Show Details')).toBeInTheDocument();
      const showDetailsButton = screen.queryByText('Show Details');
      await user.click(showDetailsButton);
    });

    then(
      'the user should see detailed information about that event',
      async () => {
        expect(screen.getByText('Hide Details')).toBeInTheDocument();
      }
    );
  });

  // Scenario 3
  test('User can collapse an event to hide details.', ({
    given,
    when,
    then,
    and,
  }) => {
    let EventComponent;
    let allEvents;
    given(
      'the user is on the events page with an event already expanded',
      async () => {
        allEvents = await getEvents();
        EventComponent = render(<Event event={allEvents[0]} />);
        const user = userEvent.setup();
        await user.click(EventComponent.queryByText('Show Details'));       
        expect(EventComponent.queryByText('Hide Details')).toBeInTheDocument();
      }
    );

    when('the user chooses to hide the event information', async () => {
      const hideDetails = EventComponent.queryByText('Hide Details');
      const user = userEvent.setup();
      await user.click(hideDetails);
    });

    then(
      'the event element should hide the detailed information for that event',
      () => {
        expect(
          EventComponent.container.querySelector('.details')
        ).not.toBeInTheDocument();
        expect(
          EventComponent.queryByText('Hide Details')
        ).not.toBeInTheDocument();
      }
    );
  });
});
