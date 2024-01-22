/*
 ** Writing Acceptance Test BBD, using jest-cucumber
 */
import { render, waitFor, within } from "@testing-library/react";
import { loadFeature, defineFeature } from "jest-cucumber";
import App from "../App";
import EventList from "../components/EventList";

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
    given("there are events available in the app -> the main apge is open", () => {
      AppComponent = render(<App />);      
    });

    when(
      "the user navigates to the events page -> the app displays a list of events",
      async () => {
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector("#event-list");
        await waitFor(() => {
          const EventListItems =
            within(EventListDOM).queryAllByRole("listitem");
          expect(EventListItems.length).toBe(32);
        });
      }
    );

    then(
      "each event element should be in a collapsed state by default",
      () => {}
    );

    and(
      "the user should see a summary or basic information for each event",
      () => {}
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
