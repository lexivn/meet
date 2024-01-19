import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(
      <NumberOfEvents setNumberOfEvents={() => {}} />
    );
  });

  test("has an element with the role textbox", () => {
    expect(NumberOfEventsComponent.queryByRole("textbox")).toBeInTheDocument();
  });

  test("default input value field is 32", () => {
    expect(NumberOfEventsComponent.queryByRole("textbox")).toHaveValue("32");
  });

  test("the value has to change when user types in the textbox", async () => {
    const numberOfEvents = NumberOfEventsComponent.queryByRole("textbox");
    const user = userEvent.setup();
    await user.type(numberOfEvents, "{backspace}{backspace}10");
  });
});

describe("<NumberOfEvents /> integration ", () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(
      <NumberOfEvents setNumberOfEvents={() => {}} />
    );
  });

  test("The numbers of events has to change when user types in the textbox", async () => {
    const numberOfEventsInput = NumberOfEventsComponent.queryByRole("textbox");
    const user = userEvent.setup();
    await user.type(numberOfEventsInput, "{backspace}{backspace}10");
    expect(numberOfEventsInput).toHaveValue("10");
  });
});
