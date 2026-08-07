// Gym is a walk-in facility: there are no courts to reserve, so a member or a
// one-time buyer just turns up, scans the QR, and gets their allowed duration
// (60 min) counted from the moment of check-in.
//
// The server agrees — sport.controller.js gates check-in on
// `slotBookingRequired = sport.slug !== 'gym'` — so keep the two in sync if this
// ever grows beyond gym.

// For a bare slug/name string, e.g. an entry of plan.sportsIncluded.
export function isWalkInSportKey(key) {
  return (key || '').trim().toLowerCase() === 'gym';
}

// For a sport document from /sports/public.
export function isWalkInSport(sport) {
  if (!sport) return false;
  return isWalkInSportKey(sport.slug) || isWalkInSportKey(sport.name);
}
