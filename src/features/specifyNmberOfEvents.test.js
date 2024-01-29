/*
 ** Writing Acceptance Test BBD for Feature 3, using jest-cucumber
 */
import { render, waitFor, within, screen } from "@testing-library/react";
import { loadFeature, defineFeature } from "jest-cucumber";
import App from "../App";
import userEvent from "@testing-library/user-event";
import Event from "../components/Event";
import { getEvents } from "../api";
import NumberOfEvents from "../components/NumberOfEvents";
import EventList from "../components/EventList";

const feature = loadFeature("./src/features/specifyNmberOfEvents.feature");

defineFeature(feature, (test) => {
  test("When user hasn’t specified a number, 32 events are shown by default.", ({
    given,
    when,
    then,
    and,
  }) => {
    let AppComponent;
    let AppDOM;
    let EventListDOM;
    given("the user is on the events page", () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector("#event-list");
      expect(EventListDOM).toBeInTheDocument();      
    });

    when("the user has not specified a number of events to view", () => {});

    then(/^the app should display (\d+) events by default$/, async (arg0) => {
      // const NumberOfEvents = NumberOfEventsComponent.queryByRole('textbox');
      // expect(NumberOfEvents).toHaveValue('32');
      await waitFor(() => {
        const EventList = within(EventListDOM).queryAllByRole("listitem");
        expect(EventList.length).toBe(32);
      });
    });
  });

  test("User can change the number of events displayed.", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
   given("the user has events displayed", async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventDOM = AppDOM.querySelector("#event-list");
      await waitFor(() => {
        const EventList = within(EventDOM).queryAllByRole("listitem");
        expect(EventList[0]).toBeTruthy();
      });
    });
    let numberOfEventsInput;
    when(
      "the user selects the option to specify the number of events to view",
      async () => {
        numberOfEventsInput = AppComponent.queryByTestId('number-of-events-input');
        const user = userEvent.setup();
        await user.type(numberOfEventsInput, "{backspace}{backspace}10");
        //expect(numberOfEventsInput).toHaveValue("10");
      }
    );

    then(
      "the number of events the user typed should be equal the number of events displayed",
      () => {
        const AppDOM = AppComponent.container.firstChild;
        // const EventDOM = AppDOM.querySelector('#event-list');
        const EventList = within(AppDOM).queryAllByRole('listitem');
        expect(EventList.length).toEqual(10);
      }
    );
  });
});
