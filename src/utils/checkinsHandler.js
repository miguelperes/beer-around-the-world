export function organizeByVenues(checkins) {
  return checkins.filter(checkinHasVenue).reduce(groupByVenueReducer, {});
}

export function organizeByBreweries(checkins) {
  return checkins.filter(breweryHasCorrectLocation).reduce(groupByBreweryReducer, {})
}

export function concatVenues(venuesInformation, newInformation) {
  return Object.entries(newInformation).reduce(concatVenuesReducer, venuesInformation);
}

export function concatBreweries(breweriesInformation, newInformation) {
  return Object.entries(newInformation).reduce(concatBreweriesReducer, breweriesInformation);
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

function breweryHasCorrectLocation(checkin) {
  const hasLocation = checkin.brewery.location.lat !== 0 || checkin.brewery.location.lng !== 0
  return checkin.brewery && hasLocation
}

function groupByVenueReducer(venues, currentCheckin) {
  const venueId = currentCheckin.venue.venue_id;
  if (venues.hasOwnProperty(venueId)) {
    const venue = venues[venueId];
    venue.checkins = venue.checkins.concat(currentCheckin);
    return venues;
  }

  venues[venueId] = {
    info: { ...currentCheckin.venue },
    checkins: [currentCheckin]
  };

  return venues;
}

function groupByBreweryReducer(breweries, currentCheckin) {
    const breweryId = currentCheckin.brewery.brewery_id
    if(breweries.hasOwnProperty(breweryId)) {
      const brewery = breweries[breweryId]
      brewery.checkins = brewery.checkins.concat(currentCheckin)
      return breweries
    }

    breweries[breweryId] = {
      info: { ...currentCheckin.brewery },
      checkins: [currentCheckin]
    }

    return breweries
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

function concatBreweriesReducer(acc, [breweryId, content]) {
  if (acc.hasOwnProperty(breweryId)) {
    const checkins = acc[breweryId].checkins;
    acc[breweryId].checkins = checkins.concat(content.checkins);
    return acc;
  }

  acc[breweryId] = content;
  return acc;
}

