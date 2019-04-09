import { organizeVenues } from "./utils";
import { sampleCheckins, checkinsByVenue } from "./sampleCheckins";

test("Organize venues", () => {
  expect(organizeVenues(sampleCheckins).toEqualw(checkinsByVenue));
});
