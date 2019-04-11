import axios from "axios";

const MAX_CHECKINS = 50;

export function fetchUserCheckins(username, token) {
  return axios.get(checkinEndpoint(username, token)).then(
    response => ({
      nextPageUrl: response.data.response.pagination.next_url,
      checkins: response.data.response.checkins.items
    }),
    error => null
  );
}

export function fetchNextCheckins(nextUrl, token) {
  return axios
    .get(nextUrl + `&access_token=${token}&limit=${MAX_CHECKINS}`)
    .then(response => ({
      nextUrl: response.data.response.pagination.next_url,
      nextCheckins: response.data.response.checkins.items
    }));
}

function checkinEndpoint(username, token) {
  return `https://api.untappd.com/v4/user/checkins/${username}?access_token=${token}&limit=${MAX_CHECKINS}`;
}
