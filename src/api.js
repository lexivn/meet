// For now, it stores the extractLocations function and getEvents function
// It will extract event locations out of an array of events and removed dupes

import mockData from './mock-data';

/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];   // Spread operator expands an iterable inside a specified receiver.
  return locations;
};

/**
 *
 * This function 
 */
const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(
      // 'YOUR_GET_ACCESS_TOKEN_ENDPOINT' + '/' + encodeCode
      'https://0sr5wjz6nc.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode
    );
    const { access_token } = await response.json();
    access_token && localStorage.setItem("access_token", access_token);

    return access_token;

  } catch (error) {
    error.json();
  }
};

/**
 *
 * This function will fetch the list of all events
 */
export const getEvents = async () => {
  // return mockData;
  if (window.location.href.startsWith('http://localhost')) {
    return mockData;
  }
  
  if (!navigator.onLine) {
    const events = localStorage.getItem("lastEvents");
    // NProgress.done();
    return events?JSON.parse(events):[];
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    // const url = "YOUR_GET_EVENTS_API_ENDPOINT" + "/" + token;
    // eslint-disable-next-line no-useless-concat
    const url = "https://0sr5wjz6nc.execute-api.eu-central-1.amazonaws.com/dev/api/get-events" + "/" + token;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      // NProgress.done();
      localStorage.setItem("lastEvents", JSON.stringify(result.events));
      return result.events;
    } else return null;
  }
};


/**
 *
 * This function to retrieve the access token
 */
export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');

  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    // window.location.search returns the query string from the current URL of the web page. 
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const response = await fetch(
        // "YOUR_SERVERLESS_GET_AUTH_URL_ENDPOINT"
        "https://0sr5wjz6nc.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
      );
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;

};
