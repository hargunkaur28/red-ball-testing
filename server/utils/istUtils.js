const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

/** Current time as a Date whose UTC fields represent IST clock values */
const nowIST = () => new Date(Date.now() + IST_OFFSET_MS);

/**
 * IST day boundaries for TODAY, returned as UTC timestamps for MongoDB queries.
 * e.g. at 04:40 IST on Jun 19:
 *   startOfDay = 2026-06-18T18:30:00Z  (midnight IST)
 *   endOfDay   = 2026-06-19T18:29:59Z  (23:59:59 IST)
 */
const todayISTBoundaries = () => {
  const ist = nowIST();
  const y = ist.getUTCFullYear(), m = ist.getUTCMonth(), d = ist.getUTCDate();
  const startOfDay = new Date(Date.UTC(y, m, d, 0, 0, 0, 0) - IST_OFFSET_MS);
  const endOfDay   = new Date(Date.UTC(y, m, d, 23, 59, 59, 999) - IST_OFFSET_MS);
  return { startOfDay, endOfDay };
};

/**
 * IST day boundaries for a specific date string "YYYY-MM-DD".
 * Works correctly on both UTC and IST servers.
 */
const istDayBoundaries = (dateStr) => {
  const d = new Date(dateStr); // "YYYY-MM-DD" → UTC midnight of that date
  return {
    startOfDay: new Date(d.getTime() - IST_OFFSET_MS),               // midnight IST
    endOfDay:   new Date(d.getTime() - IST_OFFSET_MS + 86400000 - 1), // 23:59:59.999 IST
  };
};

/** "YYYY-MM-DD" string for today in IST (safe on UTC servers) */
const todayISTString = () => nowIST().toISOString().slice(0, 10);

/** Convert any UTC Date to its "YYYY-MM-DD" calendar date in IST */
const toISTDateString = (date) =>
  new Date(new Date(date).getTime() + IST_OFFSET_MS).toISOString().slice(0, 10);

/** Current IST hour (0-23) */
const currentISTHour = () => nowIST().getUTCHours();

/** Minutes since midnight IST (0-1439) — for comparing against "HH:MM" windows */
const currentISTMinutes = () => {
  const ist = nowIST();
  return ist.getUTCHours() * 60 + ist.getUTCMinutes();
};

module.exports = {
  IST_OFFSET_MS,
  nowIST,
  todayISTBoundaries,
  istDayBoundaries,
  todayISTString,
  toISTDateString,
  currentISTHour,
  currentISTMinutes,
};
