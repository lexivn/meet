/*
 ** Writing Acceptance Test BBD, using jest-cucumber
 */
import { render, screen, waitFor } from "@testing-library/react";
import { loadFeature, defineFeature } from "jest-cucumber";
import App from "../App";
import Event from "../components/Event";
import EventList from "../components/EventList";
import { getEvents } from "../api";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  // Scenario 1
  test("An event element is collapsed by default.", ({
    given,
    when,
    then,
    and,
  }) => {
    let AppComponent;
    given("there are events available in the app", () => {
      AppComponent = render(<App />);
    });

    when("the user navigates to the events page", () => {});

    then("each event element should be in a collapsed state by default", () => {
      const EventDOM = AppComponent.container.firstChild;
      const details = EventDOM.querySelector('.details');
      expect(details).not.toBeInTheDocument();
    });

    and(
      "the user should see a summary or basic information for each event",
      async () => {
        const Events = await getEvents();
        render(<Event event={Events[0]} />);
        expect(screen.getByText(Events[0].summary)).toBeInTheDocument();
        expect(screen.getByText(Events[0].location)).toBeInTheDocument();
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

  test("User can expand an event to see details.", ({
    given,
    when,
    then,
    and,
  }) => {
    given("The user is on the events page", () => {});

    when("the user chooses to expand an event element", () => {});

    then("the user should see detailed information about that event", () => {});

    and("the other events elements should remain collapsed", () => {});
  });

  test("User can collapse an event to hide details.", ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      "the user is on the events page with an event already expanded",
      () => {}
    );

    when("the user chooses to hide the event information", () => {});

    then(
      "the event element should hide the detailed information for that event.",
      () => {}
    );

    and("other event elements should remain collapsed", () => {});
  });
});
