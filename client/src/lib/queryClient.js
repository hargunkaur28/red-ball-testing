import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Query keys holding data that belongs to the signed-in user. None of them are
// scoped by user id, so a cached entry from one account would be served to the
// next one until it goes stale — drop them whenever the identity changes.
const USER_SCOPED_QUERY_KEYS = [
  'my-orders',
  'my-membership',
  'my-memberships',
  'my-passes',
  'my-reviews',
  'my-slot-bookings',
  'my-membership-slot-bookings',
  'my-attendance',
  'membership-bookings',
  'attendance',
];

// Used on sign-in. Public caches (plans, sports, menu) are left alone so the page
// the user signed in from doesn't drop back to a loading state.
export function clearUserScopedQueries() {
  USER_SCOPED_QUERY_KEYS.forEach((key) => queryClient.removeQueries({ queryKey: [key] }));
}
