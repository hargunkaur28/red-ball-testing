const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/red-ball-new';

mongoose.connect(MONGO_URI).then(async () => {
  console.log('Connected to MongoDB.');

  const User = require('./models/User');
  const OneTimeAccess = require('./models/OneTimeAccess');
  const OneTimePlay = require('./models/OneTimePlay');
  const SlotBooking = require('./models/SlotBooking');
  const Attendance = require('./models/Attendance');

  const users = await User.find({
    $or: [
      { email: 'shineee1328@gmail.com' },
      { email: /shineee1328/i },
      { email: /shine/i },
      { name: /shine/i },
      { phone: '8699834174' },
      { phone: /8699834174/ }
    ]
  });

  if (users.length === 0) {
    console.log('No matching users found.');
    mongoose.disconnect();
    return;
  }

  console.log(`Found ${users.length} matching user(s):\n`);

  for (const user of users) {
    console.log(`==================================================`);
    console.log(`User: ${user.name} | ${user.email} | Phone: ${user.phone} | ID: ${user._id}`);
    console.log(`==================================================`);

    // Check OneTimeAccess
    const accessPasses = await OneTimeAccess.find({ userId: user._id });
    console.log(`OneTimeAccess Passes (${accessPasses.length}):`);
    accessPasses.forEach(p => {
      console.log(`- Pass ID: ${p._id}, Sport: ${p.sport}, Status: ${p.accessStatus}, CreatedAt: ${p.createdAt}`);
    });

    // Check OneTimePlay
    const plays = await OneTimePlay.find({ userId: user._id });
    console.log(`OneTimePlay bookings/passes (${plays.length}):`);
    plays.forEach(p => {
      console.log(`- Play ID: ${p._id}, Sport: ${p.sport}, Status: ${p.status}, CreatedAt: ${p.createdAt}`);
    });

    // Check SlotBooking
    const slotBookings = await SlotBooking.find({ userId: user._id });
    console.log(`SlotBooking bookings (${slotBookings.length}):`);
    slotBookings.forEach(p => {
      console.log(`- Booking ID: ${p.bookingId}, Sport: ${p.sportNameSnapshot || p.sportSlug}, Status: ${p.status}, Type: ${p.bookingType}, CreatedAt: ${p.createdAt}`);
    });

    // Check ALL Attendance records for Shine
  const Attendance = require('./models/Attendance');
  const allShineAttendance = await Attendance.find({ userId: user._id }).sort({ checkInTime: -1 });
  console.log(`\nALL ATTENDANCE RECORDS FOR SHINE (${allShineAttendance.length}):`);
  allShineAttendance.forEach(a => {
    console.log(`- Session ID: ${a._id}`);
    console.log(`  Sport: ${a.sport}`);
    console.log(`  Check-in: ${a.checkInTime}`);
    console.log(`  Check-out: ${a.checkOutTime}`);
    console.log(`  Status: ${a.status} | SessionStatus: ${a.sessionStatus}`);
    console.log(`  Entitlement Type: ${a.entitlementType}`);
    console.log(`  Allowed Duration: ${a.allowedDurationMinutes} min`);
    console.log(`  Actual Duration: ${a.actualDurationMinutes} min`);
    console.log(`  Overtime: ${a.overtimeMinutes} min`);
    console.log(`  Late Amount: ${a.lateAmount}`);
    console.log(`  Related Booking ID: ${a.relatedBookingId}`);
    console.log(`  Related Booking Type: ${a.relatedBookingType}`);
    console.log(`  Membership Plan Snapshot: ${a.membershipPlanSnapshot}`);
  });
    console.log('\n');
  }

  mongoose.disconnect();
}).catch(err => {
  console.error('Connection error:', err);
  process.exit(1);
});
