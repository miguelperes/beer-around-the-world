import axios from "axios";

export function fetchUserCheckins(username, token) {
  return axios
    .get(checkinEndpoint(username, token))
    .then(response => response.data.response.checkins.items, error => null);
}

function checkinEndpoint(username, token) {
  return `https://api.untappd.com/v4/user/checkins/${username}?access_token=${token}&limit=50`;
}
