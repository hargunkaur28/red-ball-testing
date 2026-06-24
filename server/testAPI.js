require('dotenv').config();
const mongoose = require('mongoose');
const Attendance = require('./models/Attendance');
const Slot = require('./models/Slot');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/red-ball-new').then(async () => {
  const IST_OFFSET = 5.5 * 60 * 60 * 1000;
  const activeSessions = await Attendance.find({
    checkOutTime: null,
    sessionStatus: 'Active',
  }).lean();

  for (const session of activeSessions) {
    if (session.relatedBookingType === 'membership' || !session.relatedBookingType) {
      const checkInIST = new Date(session.checkInTime.getTime() + IST_OFFSET);
      const hhmm = `${String(checkInIST.getUTCHours()).padStart(2, '0')}:${String(checkInIST.getUTCMinutes()).padStart(2, '0')}`;
      
      let slot = null;
      if (session.sportId) {
        const { startOfDay } = require('./utils/istUtils').todayISTBoundaries();
        slot = await Slot.findOne({
          sportId: session.sportId,
          date: { $gte: startOfDay },
          startTime: { $lte: hhmm },
          endTime: { $gt: hhmm }
        }).select('startTime endTime').lean();
      }

      if (slot) {
        session.slotBooking = slot;
      } else {
        const h = checkInIST.getUTCHours();
        const startH = String(h).padStart(2, '0');
        const endH = String((h + 1) % 24).padStart(2, '0');
        session.slotBooking = { startTime: `${startH}:00`, endTime: `${endH}:00` };
      }
    }
  }

  console.log(JSON.stringify(activeSessions, null, 2));
  process.exit(0);
}).catch(console.error);
