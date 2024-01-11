import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { extractLocations, getEvents } from '../api';

describe('<CitySearch /> component', () => {
  let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = render(<CitySearch />);
  });

  test('renders text input', () => {
    // const CitySearchComponent = render(<CitySearch />);
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  // Testing User Interacctions
  // ═══════════════════════════

  test('Suggestion List is hiden by default', () => {
    // const CitySearchComponent = render(<CitySearch />);
    const SuggestionList = CitySearchComponent.queryByRole('list');
    expect(SuggestionList).not.toBeInTheDocument();
  });

  test('renders a list of suggestions when city textbox gains focus', async () => {
    // const CitySearchComponent = render(<CitySearch />);
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.click(cityTextBox);
    const SuggestionList = CitySearchComponent.queryByRole('list');
    expect(SuggestionList).toBeInTheDocument();
    expect(SuggestionList).toHaveClass('suggestions');
  })

  // Test to verify the suggestions is correctly rendered according to the query typed by the user in the city input field.
  test('update list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />)


    // User types "Berlin" in city textbox
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    // Filter allLocaltions to locations matching "Berlin"
    const suggestions = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
    }) : [];

    // Get all <li> elements inside the suggestion list
    const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    // the suggestion's textContent look like this: "Berlin, Germany"
    const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];

    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });


});
