// Whether a membership plan involves booking a slot at all.
//
// Gym is walk-in — a member shows their QR at the door, there are no courts to
// reserve. Court sports (badminton, pickleball) and coaching do need
// a slot. Combos are mixed: "Gym + Badminton" books badminton slots, and the
// sport picker drops gym from the options.
//
// Shared by /user/membership and /buy-memberships so both pages agree on which
// memberships get a "Book Slot" button. Change the rule here, both follow.
import { isWalkInSportKey } from './walkInSports';

export function planHasNoSlots(p) {
  if (!p) return false;
  if (p.requiresSlotBooking === false) return true;
  if (p.requiresSlotBooking === true) return false;

  const sports = p.sportsIncluded || [];

  // If sportsIncluded lists any sport other than gym, it requires slot booking
  if (sports.length > 0) {
    const hasSlotSport = sports.some((s) => !isWalkInSportKey(s));
    if (hasSlotSport) return false;
  }

  const name = (p.name || '').trim().toLowerCase();

  // If plan name contains combo (+), coaching, or any court sport, it needs slot booking
  if (
    name.includes('+') ||
    name.includes('coaching') ||
    name.includes('pickleball') ||
    name.includes('badminton') ||
    name.includes('tennis') ||
    name.includes('squash')
  ) {
    return false;
  }

  // Pure standalone Gym plan has no slot booking
  if (name === 'gym' || name.startsWith('gym ') || name.endsWith(' gym')) return true;

  return false;
}
