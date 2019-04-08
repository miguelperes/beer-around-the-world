export function organizeVenues(checkins) {
  return checkins
    .filter(checkinHasVenue)
    .reduce(groupByVenue, {});
}

function checkinHasVenue(checkin) {
  return checkin.venue !== [] && checkin.venue.location;
}

function groupByVenue(venues, currentCheckin) {
  const venueId = currentCheckin.venue.venue_id;
  if (venues.hasOwnProperty(venueId)) {
    const venue = venues[venueId];
    venue.checkins = venue.checkins.concat(currentCheckin);
    return venues;
  }

  venues[venueId] = {
    venue_info: { ...currentCheckin.venue },
    checkins: [currentCheckin]
  };

  return venues;
}
