import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useSearchParams } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { HelmetProvider } from 'react-helmet-async';
import { queryClient } from './lib/queryClient';
import useAuthStore from './store/authStore';
import ErrorBoundary from './components/shared/ErrorBoundary';
import RouteLoader from './components/shared/RouteLoader';

// Layouts (loaded eagerly — they're the app shell)
import UserLayout from './components/layout/UserLayout';
import RestaurantLayout from './components/layout/RestaurantLayout';
import SuperAdminLayout from './components/layout/SuperAdminLayout';

// Auth (loaded eagerly — it's the entry point)
import Auth from './pages/auth/Auth';
import Home from './pages/Home';

// ── Lazy-loaded Pages ──────────────────────────────────────────────
// Admin
const Settings = lazy(() => import('./pages/admin/Settings'));

// Super Admin
const SADashboard = lazy(() => import('./pages/super-admin/Dashboard'));
const SASports = lazy(() => import('./pages/super-admin/Sports'));
const SAMemberships = lazy(() => import('./pages/super-admin/Memberships'));
const SASessionOvertime = lazy(() => import('./pages/super-admin/SessionOvertime'));
const SAOneTime = lazy(() => import('./pages/super-admin/OneTime'));
const SALiveSports = lazy(() => import('./pages/super-admin/LiveSports'));
const SACommunication = lazy(() => import('./pages/super-admin/Communication'));
const SABlogs = lazy(() => import('./pages/super-admin/Blogs'));
const SAOrderManagement = lazy(() => import('./pages/restaurant/RestaurantOrders'));
const SAMenuItems = lazy(() => import('./pages/restaurant/Menu'));
const SATables = lazy(() => import('./pages/restaurant/Tables'));

// User
const UserDashboard = lazy(() => import('./pages/user/Dashboard'));
const UserMembership = lazy(() => import('./pages/user/Membership'));
const OrderHistory = lazy(() => import('./pages/user/OrderHistory'));
const Profile = lazy(() => import('./pages/user/Profile'));
const UserReviews = lazy(() => import('./pages/user/Reviews'));
const ScanQR = lazy(() => import('./pages/user/ScanQR'));

// Restaurant
const RestaurantDashboard = lazy(() => import('./pages/restaurant/Dashboard'));
const LiveOrders = lazy(() => import('./pages/restaurant/Orders'));
const RestaurantOrderHistory = lazy(() => import('./pages/restaurant/RestaurantOrders'));
const RestaurantMenu = lazy(() => import('./pages/restaurant/Menu'));
const RestaurantTables = lazy(() => import('./pages/restaurant/Tables'));
const RestaurantSettings = lazy(() => import('./pages/restaurant/Settings'));

// Public
const TableOrder = lazy(() => import('./pages/table/TableOrder'));
const TablePortal = lazy(() => import('./pages/table/TablePortal'));
const OneTimeBookingPortal = lazy(() => import('./pages/OneTimeBookingPortal'));
const EntryPortal = lazy(() => import('./pages/EntryPortal'));
const MembershipPortal = lazy(() => import('./pages/MembershipPortal'));
const BookSlotsMarketplace = lazy(() => import('./pages/BookSlotsMarketplace'));
const SportDetailPage = lazy(() => import('./pages/SportDetailPage'));

// SEO Landing Pages
const SportsAcademyRohtak = lazy(() => import('./pages/seo/SportsAcademyRohtak'));
const StadiumInRohtak = lazy(() => import('./pages/seo/StadiumInRohtak'));
const SportsArenaRohtak = lazy(() => import('./pages/seo/SportsArenaRohtak'));
const SportsComplexRohtak = lazy(() => import('./pages/seo/SportsComplexRohtak'));
const AcademyInRohtak = lazy(() => import('./pages/seo/AcademyInRohtak'));
const BestSportsAcademyRohtak = lazy(() => import('./pages/seo/BestSportsAcademyRohtak'));
const BadmintonCourtRohtak = lazy(() => import('./pages/seo/BadmintonCourtRohtak'));
const PickleballCourtRohtak = lazy(() => import('./pages/seo/PickleballCourtRohtak'));
const GymInRohtak = lazy(() => import('./pages/seo/GymInRohtak'));
const PrivacyPolicy = lazy(() => import('./pages/seo/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/seo/TermsAndConditions'));

// New SEO Facility Pages
const BadmintonAcademyRohtak = lazy(() => import('./pages/seo/BadmintonAcademyRohtak'));
const BadmintonCoachingRohtak = lazy(() => import('./pages/seo/BadmintonCoachingRohtak'));
const SportsClubRohtak = lazy(() => import('./pages/seo/SportsClubRohtak'));

// New SEO Geo Pages
const SportsComplexHaryana = lazy(() => import('./pages/seo/SportsComplexHaryana'));

// New Geo Pages — Badminton
const BadmintonCourtJhajjar = lazy(() => import('./pages/seo/BadmintonCourtJhajjar'));
const BadmintonCourtBahadurgarh = lazy(() => import('./pages/seo/BadmintonCourtBahadurgarh'));
const BadmintonCourtSonipat = lazy(() => import('./pages/seo/BadmintonCourtSonipat'));
const BadmintonCourtPanipat = lazy(() => import('./pages/seo/BadmintonCourtPanipat'));
const BadmintonCourtGurgaon = lazy(() => import('./pages/seo/BadmintonCourtGurgaon'));
const BadmintonCourtHisar = lazy(() => import('./pages/seo/BadmintonCourtHisar'));


// New Geo Pages — Gym
const GymJhajjar = lazy(() => import('./pages/seo/GymJhajjar'));
const GymBahadurgarh = lazy(() => import('./pages/seo/GymBahadurgarh'));
const GymSonipat = lazy(() => import('./pages/seo/GymSonipat'));
const GymPanipat = lazy(() => import('./pages/seo/GymPanipat'));
const GymGurgaon = lazy(() => import('./pages/seo/GymGurgaon'));
const GymHisar = lazy(() => import('./pages/seo/GymHisar'));


// New Geo Pages — Sports Complex
const SportsComplexJhajjar = lazy(() => import('./pages/seo/SportsComplexJhajjar'));
const SportsComplexBahadurgarh = lazy(() => import('./pages/seo/SportsComplexBahadurgarh'));
const SportsComplexSonipat = lazy(() => import('./pages/seo/SportsComplexSonipat'));
const SportsComplexPanipat = lazy(() => import('./pages/seo/SportsComplexPanipat'));
const SportsComplexGurgaon = lazy(() => import('./pages/seo/SportsComplexGurgaon'));
const SportsComplexHisar = lazy(() => import('./pages/seo/SportsComplexHisar'));


// New Geo Pages — Sports Academy
const SportsAcademyJhajjar = lazy(() => import('./pages/seo/SportsAcademyJhajjar'));
const SportsAcademyBahadurgarh = lazy(() => import('./pages/seo/SportsAcademyBahadurgarh'));
const SportsAcademySonipat = lazy(() => import('./pages/seo/SportsAcademySonipat'));
const SportsAcademyPanipat = lazy(() => import('./pages/seo/SportsAcademyPanipat'));
const SportsAcademyHaryana = lazy(() => import('./pages/seo/SportsAcademyHaryana'));

// New Geo Pages — Pickleball
const PickleballCourtHaryana = lazy(() => import('./pages/seo/PickleballCourtHaryana'));
const PickleballCourtGurgaon = lazy(() => import('./pages/seo/PickleballCourtGurgaon'));
const PickleballCourtSonipat = lazy(() => import('./pages/seo/PickleballCourtSonipat'));



// New SEO League & Tournament Pages
const RohtakCricketLeague = lazy(() => import('./pages/seo/RohtakCricketLeague'));
const CricketTournamentsRohtak = lazy(() => import('./pages/seo/CricketTournamentsRohtak'));
const CorporateCricketEvents = lazy(() => import('./pages/seo/CorporateCricketEvents'));
const InterCollegeCricketTournaments = lazy(() => import('./pages/seo/InterCollegeCricketTournaments'));

// Blog Pages
const BlogIndex = lazy(() => import('./pages/blog/BlogIndex'));

const About = lazy(() => import('./pages/About'));
const BlogPost = lazy(() => import('./pages/blog/BlogPost'));

// ── Auth Guard ─────────────────────────────────────────────────────
function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  if (isLoading) return (
    <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#EAEAEA] border-t-[#111111] rounded-full animate-spin" />
    </div>
  );
  if (!isAuthenticated) {
    const redirectTo = encodeURIComponent(window.location.pathname + window.location.search);
    return <Navigate to={`/login?redirectTo=${redirectTo}`} />;
  }
  if (roles && !roles.includes(user?.role)) return <Navigate to="/login" />;
  return children;
}

// ── Guest Guard (Redirects logged-in users away from /login) ────────
function GuestRoute({ children }) {
  const { isAuthenticated, user, isLoading, getRedirectPath } = useAuthStore();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-[#C5DB3B] rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthenticated && user) {
    const target = (redirectTo && !redirectTo.startsWith('/login'))
      ? decodeURIComponent(redirectTo)
      : getRedirectPath();
    return <Navigate to={target} replace />;
  }

  return children;
}

import { connectSocket } from './lib/socket';

// ── App ────────────────────────────────────────────────────────────
export default function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();

    // Keep server warm — ping every 10 min to prevent cold starts on free hosting tiers
    const apiBase = import.meta.env.VITE_API_URL || '/api';
    const ping = () => fetch(`${apiBase}/health`).catch(() => {});
    ping();
    const keepAlive = setInterval(ping, 10 * 60 * 1000);

    // Connect socket on app load. Individual pages register their own targeted
    // socket listeners and invalidate only the queries they own. A blanket
    // onAny → invalidateQueries() here caused every event to cascade into
    // mass refetches, which in turn triggered more socket events (loop).
    connectSocket();

    return () => {
      clearInterval(keepAlive);
    };
  }, []);

  return (
    <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <ErrorBoundary>
          <Suspense fallback={<RouteLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<GuestRoute><Auth /></GuestRoute>} />
              <Route path="/table-portal" element={<TablePortal />} />
              <Route path="/table/:tableId" element={<TableOrder />} />
              <Route path="/one-time-booking" element={<OneTimeBookingPortal />} />
              <Route path="/book-slots" element={<BookSlotsMarketplace />} />
              <Route path="/sports/:slug" element={<SportDetailPage />} />
              <Route path="/buy-membership" element={<MembershipPortal />} />
              <Route path="/entry/:qrSlug" element={<EntryPortal />} />
              <Route path="/memberships" element={<Navigate to="/user/membership" replace />} />

              {/* Super Admin Panel */}
              <Route path="/super-admin" element={
                <ProtectedRoute roles={['superadmin']}><SuperAdminLayout /></ProtectedRoute>
              }>
                <Route index element={<SADashboard />} />
                <Route path="sports" element={<SASports />} />
                <Route path="memberships" element={<SAMemberships />} />
                <Route path="session-overtime" element={<SASessionOvertime />} />
                <Route path="one-time" element={<SAOneTime />} />
                <Route path="live-sports" element={<SALiveSports />} />
                <Route path="communication" element={<SACommunication />} />
                <Route path="orders" element={<SAOrderManagement />} />
                <Route path="menu" element={<SAMenuItems />} />
                <Route path="settings" element={<Settings />} />
                <Route path="blogs" element={<SABlogs />} />
                <Route path="tables" element={<SATables />} />
              </Route>

              {/* User/Student Panel */}
              <Route path="/user" element={
                <ProtectedRoute roles={['user']}><UserLayout /></ProtectedRoute>
              }>
                <Route index element={<UserDashboard />} />
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="scan" element={<ScanQR />} />
                <Route path="membership" element={<UserMembership />} />
                <Route path="book-slots" element={<BookSlotsMarketplace embedded />} />
                <Route path="one-time-booking" element={<OneTimeBookingPortal embedded />} />
                <Route path="sports/:slug" element={<SportDetailPage embedded />} />
                <Route path="buy-memberships" element={<MembershipPortal embedded />} />
                <Route path="table-portal" element={<TablePortal embedded />} />
                <Route path="orders" element={<OrderHistory />} />
                <Route path="reviews" element={<UserReviews />} />
                <Route path="profile" element={<Profile />} />
              </Route>

              {/* Restaurant Manager Panel */}
              <Route path="/restaurant" element={
                <ProtectedRoute roles={['manager', 'superadmin']}><RestaurantLayout /></ProtectedRoute>
              }>
                <Route index element={<RestaurantDashboard />} />
                <Route path="orders" element={<LiveOrders />} />
                <Route path="history" element={<RestaurantOrderHistory />} />
                <Route path="menu" element={<RestaurantMenu />} />
                <Route path="tables" element={<RestaurantTables />} />
                <Route path="settings" element={<RestaurantSettings />} />
              </Route>

              {/* SEO Landing Pages */}
              <Route path="/sports-academy-rohtak" element={<SportsAcademyRohtak />} />
              <Route path="/stadium-in-rohtak" element={<StadiumInRohtak />} />
              <Route path="/sports-arena-rohtak" element={<SportsArenaRohtak />} />
              <Route path="/sports-complex-rohtak" element={<SportsComplexRohtak />} />
              <Route path="/academy-in-rohtak" element={<AcademyInRohtak />} />
              <Route path="/best-sports-academy-rohtak" element={<BestSportsAcademyRohtak />} />
              <Route path="/badminton-court-rohtak" element={<BadmintonCourtRohtak />} />
              <Route path="/pickleball-court-rohtak" element={<PickleballCourtRohtak />} />
              <Route path="/gym-in-rohtak" element={<GymInRohtak />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

              {/* New SEO Facility Pages */}
              <Route path="/badminton-academy-rohtak" element={<BadmintonAcademyRohtak />} />
              <Route path="/badminton-coaching-rohtak" element={<BadmintonCoachingRohtak />} />

              <Route path="/sports-club-rohtak" element={<SportsClubRohtak />} />

              {/* New SEO Geo Pages */}
              <Route path="/sports-complex-haryana" element={<SportsComplexHaryana />} />

              {/* Geo Pages — Badminton */}
              <Route path="/badminton-court-jhajjar" element={<BadmintonCourtJhajjar />} />
              <Route path="/badminton-court-bahadurgarh" element={<BadmintonCourtBahadurgarh />} />
              <Route path="/badminton-court-sonipat" element={<BadmintonCourtSonipat />} />
              <Route path="/badminton-court-panipat" element={<BadmintonCourtPanipat />} />
              <Route path="/badminton-court-gurgaon" element={<BadmintonCourtGurgaon />} />
              <Route path="/badminton-court-hisar" element={<BadmintonCourtHisar />} />


              {/* Geo Pages — Gym */}
              <Route path="/gym-jhajjar" element={<GymJhajjar />} />
              <Route path="/gym-bahadurgarh" element={<GymBahadurgarh />} />
              <Route path="/gym-sonipat" element={<GymSonipat />} />
              <Route path="/gym-panipat" element={<GymPanipat />} />
              <Route path="/gym-gurgaon" element={<GymGurgaon />} />
              <Route path="/gym-hisar" element={<GymHisar />} />


              {/* Geo Pages — Sports Complex */}
              <Route path="/sports-complex-jhajjar" element={<SportsComplexJhajjar />} />
              <Route path="/sports-complex-bahadurgarh" element={<SportsComplexBahadurgarh />} />
              <Route path="/sports-complex-sonipat" element={<SportsComplexSonipat />} />
              <Route path="/sports-complex-panipat" element={<SportsComplexPanipat />} />
              <Route path="/sports-complex-gurgaon" element={<SportsComplexGurgaon />} />
              <Route path="/sports-complex-hisar" element={<SportsComplexHisar />} />


              {/* Geo Pages — Sports Academy */}
              <Route path="/sports-academy-jhajjar" element={<SportsAcademyJhajjar />} />
              <Route path="/sports-academy-bahadurgarh" element={<SportsAcademyBahadurgarh />} />
              <Route path="/sports-academy-sonipat" element={<SportsAcademySonipat />} />
              <Route path="/sports-academy-panipat" element={<SportsAcademyPanipat />} />
              <Route path="/sports-academy-haryana" element={<SportsAcademyHaryana />} />

              {/* Geo Pages — Pickleball */}
              <Route path="/pickleball-court-haryana" element={<PickleballCourtHaryana />} />
              <Route path="/pickleball-court-gurgaon" element={<PickleballCourtGurgaon />} />
              <Route path="/pickleball-court-sonipat" element={<PickleballCourtSonipat />} />



              {/* New SEO League & Tournament Pages */}
              <Route path="/rohtak-cricket-league" element={<RohtakCricketLeague />} />
              <Route path="/cricket-tournaments-rohtak" element={<CricketTournamentsRohtak />} />
              <Route path="/corporate-cricket-events" element={<CorporateCricketEvents />} />
              <Route path="/inter-college-cricket-tournaments" element={<InterCollegeCricketTournaments />} />

              {/* Blog */}
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog/:slug" element={<BlogPost />} />

              {/* Redirect root */}
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#FFFFFF',
            border: '1px solid #EAEAEA',
            color: '#111111',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          },
        }}
      />
    </QueryClientProvider>
    </HelmetProvider>
  );
}
