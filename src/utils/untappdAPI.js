import axios from "axios";

const MAX_CHECKINS = 50;
const BASE_ENDPOINT = "https://api.untappd.com/v4";
const UNTAPPD_ID = process.env.REACT_APP_UNTAPPD_ID;

export const AUTH_URL = `https://untappd.com/oauth/authenticate/?client_id=${UNTAPPD_ID}&response_type=token&redirect_url=https://beer-around-the-world.herokuapp.com/`;

export function getCheckins(username, token, nextPageUrl = null) {
  const endpoint = nextPageUrl
    ? checkinPageEndpoint(nextPageUrl, token)
    : checkinEndpoint(username, token);

  return axios.get(endpoint).then(
    response => ({
      nextPageUrl: response.data.response.pagination.next_url,
      checkins: response.data.response.checkins.items
    }),
    error => null
  );
}

function checkinEndpoint(username, token) {
  return `${BASE_ENDPOINT}/user/checkins/${username}?access_token=${token}&limit=${MAX_CHECKINS}`;
}

function checkinPageEndpoint(pageUrl, token) {
  return pageUrl + `&access_token=${token}&limit=${MAX_CHECKINS}`;
}
