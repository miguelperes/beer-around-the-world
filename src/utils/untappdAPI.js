import axios from "axios";

const MAX_CHECKINS = 50;
const BASE_ENDPOINT = "https://api.untappd.com/v4";
const UNTAPPD_ID = process.env.REACT_APP_UNTAPPD_ID;
// const CALLBACK_URL = "https://batw.herokuapp.com/"
const CALLBACK_URL = "https://miguelperes.github.io/beer-around-the-world/"
 
export const AUTH_URL = `https://untappd.com/oauth/authenticate/?client_id=${UNTAPPD_ID}&response_type=token&redirect_url=${CALLBACK_URL}`;

export function getCheckins(username, token, nextPageUrl = null) {
  const endpoint = nextPageUrl
    ? checkinPageEndpoint(nextPageUrl, token)
    : checkinEndpoint(username, token);

  return axios.get(endpoint).then(
    response => ({
      nextPageUrl: response.data.response.pagination.next_url,
      checkins: response.data.response.checkins.items
    }),
    error => {
      console.error(error)
    }
  );
}

export function getUserInfo(token) {
  return axios.get(BASE_ENDPOINT + `/user/info?access_token=${token}`).then(
    response => response.data.response.user,
    error => error
  )
}

function checkinEndpoint(username, token) {
  return `${BASE_ENDPOINT}/user/checkins/${username}?access_token=${token}&limit=${MAX_CHECKINS}`;
}

function checkinPageEndpoint(pageUrl, token) {
  return pageUrl + `&access_token=${token}&limit=${MAX_CHECKINS}`;
}
