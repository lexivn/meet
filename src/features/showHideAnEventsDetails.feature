Feature: Show/Hide Event Details
  Scenario: An event element is collapsed by default.
    Given there are events available in the app -> the main apge is open
    When the user navigates to the events page -> the app displays a list of events
    Then each event element should be in a collapsed state by default
    And the user should see a summary or basic information for each event

  Scenario: User can expand an event to see details.
    Given The user is on the events page
    When the user chooses to expand an event element
    Then the user should see detailed information about that event
    And the other events elements should remain collapsed

  Scenario: User can collapse an event to hide details.
    Given the user is on the events page with an event already expanded
    When the user chooses to hide the event information
    Then the event element should hide the detailed information for that event.
    And other event elements should remain collapsed