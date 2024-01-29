Feature: Specify Number of Events
  Scenario: When user hasn’t specified a number, 32 events are shown by default.
    Given the user is on the events page
    When the user has not specified a number of events to view
    Then the app should display 32 events by default
  Scenario: User can change the number of events displayed.
    Given the user has events displayed
    When the user selects the option to specify the number of events to view
    Then the number of events the user typed should be equal the number of events displayed


