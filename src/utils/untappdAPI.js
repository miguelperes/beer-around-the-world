import axios from "axios";

const MAX_CHECKINS = 50;
const BASE_ENDPOINT = 'https://api.untappd.com/v4'

export function getCheckins(username, token, nextPageUrl = null) {
  const endpoint = nextPageUrl ? checkinPageEndpoint(nextPageUrl, token) : checkinEndpoint(username, token)

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
  return pageUrl + `&access_token=${token}&limit=${MAX_CHECKINS}`
}
