# Meet App

Meet is a Progressive Web App (PWA) designed to manage events seamlessly both online and offline. Users can log in using Google's OAuth, access their Google Calendar events, and interact with a user-friendly interface. The application also includes visual representations of data through graphs and charts. Extensive testing has been implemented using technologies such as Google's Puppeteer, JEST, and Cucumber Gherkin.

## Objective

Create a serverless, progressive web application (PWA) in React following the test-driven development (TDD) approach, integrating with Google Calendar API to fetch and showcase upcoming events.

## Context

Serverless and PWAs have grown in popularity over the last few years, and they’re both considered to be the future of web development. By combining these two concepts, your app will not only work as a normal web application, but it will also reap the benefits of both serverless architecture and PWAs:

- **Serverless:** No backend maintenance, easy to scale, always available, no cost for idle time.
- **PWAs:** Instant loading, offline support, push notifications, “add to home screen” prompt,
  responsive design, and cross-platform compatibility.
  For this app, you’ll be using a TDD approach (Test Driven Development), where you write tests before writing the actual functionality for your app in code. Writing tests forces you to focus on the requirements of your application before jumping into the code. TDD relies on the repetition of a very short development cycle, allowing you to get immediate feedback and deliver high-quality code. Last but not least, you’ll add some graphs to your app, which will make it more visually appealing and allow you to more easily draw conclusions from the data. A picture is worth a thousand words, right? With a number of visualization techniques under your belt, you’ll be able to display any type of data
  you want and produce a variety of output formats. Your app will allow users to search for a city and get a list of events hosted in that city. For the data visualization component, you’ll add two charts—one that shows how many events will take place in each location (via a scatterplot), and another that visualizes the popularity of event genres (via a pie chart).

## Use of the Serverless Function in the App.

Serverless Authorization Function (AWS Lambda OAuth) will be used to provide authentication to the clients of my Meet app by using the third-party app of Google. This will allow the clients to authenticate without the need for clients to share credentials, an then an acess token or authorization code will be generated for each user, that authorizes your Meet app user to see the event data from the Google API.

## Requirements

## Key Features:

- Filter Events by City.
- Show/Hide Event Details.
- Specify Number of Events.
- Use the App When Offline.
- Add an App Shortcut to the Home Screen.
- Display Charts Visualizing Event Details.

## User Stories:

### Feature 1: Filter Events By City

- **Scenario 1:** When user hasn’t searched for a city, show upcoming events from all cities.
- **Scenario 2:** User should see a list of suggestions when they search for a city.
- **Scenario 3:** User can select a city from the suggested list.

### Feature 2: Show/Hide Event Details.

**Scenario 1:** An event element is collapsed by default.
**Scenario 2:** User can expand an event to see details.
**Scenario 3:** User can collapse an event to hide details.
**Given-When-Then Format**
**Scenario 1:** Event element is collapsed by default
Given there are events available in the app
When the user navigates to the events page
Then each event element should be in a collapsed state by default
And the user should see a summary or basic information for each event.
Scenario 2: User can expand an event to see details.
Given The user is on the events page
When the user chooses to expand an event element
Then the user should see detailed information about that event
And the other events elements should remain collapsed.
Scenario 3: User can collapse an event to hide details.
Given the user is on the events page with an event already expanded
When the user chooses to hide the event information
Then the event element should hide the detailed information for that event.
And other event elements should remain collapsed

### Feature 3: Specify Number of Events

Scenario 1: When user hasn’t specified a number, 32 events are shown by default.
Scenario 2: User can change the number of events displayed.
Given-When-Then Format
Scenario 1: When user hasn’t specified a number, 32 events are shown by default.  
When the user has not specified a number of events to view
Then the app should display 32 events by default
And the user should see a list containing information for each of the 32 events  
Scenario 2: User can change the number of events displayed.
Given the user is on the events page
When the user selects the option to specify the number of events to view
Then the app should provide a field to enter the desired number
When the user enters a valid number
And submits the form
Then the events list should display the specified number of events
And the user should see more or fewer events at once based on the input

### Feature 4: Use the App When Offline

Scenario 1: Show cached data when there’s no internet connection.
Scenario 2: Show error when user changes search settings (city, number of events).
Given-When-Then Format
Scenario 1: Show cached data when there's no internet connection
Given the user has previously viewed events while online
And the user is currently offline
When the user opens the app
Then the app should display cached events data
And the user should be able to navigate and interact with the cached events
Scenario 2: Show error when user changes search settings (city number, of events)
Given the user has previously viewed events while online
And the user is currently offline
When the user attempts to search settings (city, number of events)
Then the app should display an error message
And the user should not be able to modify the search settings while offline.

### Feature 5: Add an App Shortcut to the Home Screen

Scenario 1: User can install the meet app as a shortcut on their device home screen.
This feature does not need a development since it could be achieve by using the SO of the device where the app is running.

### Feature 6: Display Charts Visualizing Event Details

Scenario 1: Show a chart with the number of upcoming events in each city.
Given-When-Then Format
Scenario 1: Show a chart with the number of upcoming events in each city
Given there are upcoming events in multiple cities
When the user navigates to the event charts section
Then the app should display a chart
And the chart should represent the number of upcoming events in each city
And each city on the chart should be labeled
And the user should be able to visually interpret the distribution of events in different cities

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Recharts**: A composable charting library for React.
- **Google OAuth**: Authentication protocol used for user login.
- **Puppeteer**: A Node library that provides a high-level API to control headless browsers or full browsers over the DevTools Protocol.
- **JEST**: A JavaScript testing framework for React applications.
- **Cucumber Gherkin**: A behavior-driven development (BDD) tool that allows developers to write tests in a natural language style.

## Getting Started

To run Let'sMeet locally, follow these steps:

1. Clone the repository: `https://github.com/lexivn/meet.git`
2. Install dependencies: `npm install`
3. Start the application: `npm start`

## Features

- **OAuth Login**: Users can securely log in using Google's OAuth for authentication.
- **Google Calendar Integration**: Access and display events from the user's Google Calendar.
- **Offline Capability**: The PWA is designed to work seamlessly even when the user is offline.
- **Graphs and Charts**: Visual representation of data through graphs and charts.
- **Testing**: Extensive testing using JEST, Puppeteer, and Cucumber Gherkin.

## Scripts

- `npm start`: Start the development server.
- `npm build`: Build the application for production.
- `npm test`: Run tests using JEST.
- `npm run eject`: Eject from Create React App configuration.
- `npm run predeploy`: Build script for deployment.
- `npm run deploy`: Deploy the application to GitHub Pages.

## Deployment

The application is deployed on GitHub Pages at [Here](https://lexivn.github.io/meet).

## Author

- **Alex Soto**
<div id="badges">
  <a href="https://www.linkedin.com/in/alexisedson/">
    <img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
  </a>
</div>

## License

This project is open-source and available under the [MIT License](LICENSE).
