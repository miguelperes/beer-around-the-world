export function organizeVenues(checkins) {
  return checkins.filter(checkinHasVenue).reduce(groupByVenue, {});
}

export function concatVenues(venuesInformation, newInformation) {
  return Object.entries(newInformation).reduce(concatVenuesReducer, venuesInformation);
}

export function getSideMenuWidth() {
  const innerWidth = window.innerWidth

  const sizes = {phone: "90%", tablet: "55%", pc: "35%"}
  
  if(innerWidth <= 450) return sizes.phone
  
  if(innerWidth <= 960) return sizes.tablet

  return sizes.pc
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
    venueInfo: { ...currentCheckin.venue },
    checkins: [currentCheckin]
  };

  return venues;
}

function concatVenuesReducer(acc, [venueId, content]) {
  if (acc.hasOwnProperty(venueId)) {
    const checkins = acc[venueId].checkins;
    acc[venueId].checkins = checkins.concat(content.checkins);
    return acc;
  }

  acc[venueId] = content;
  return acc;
}

