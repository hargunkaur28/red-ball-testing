require('dotenv').config();
const validateEnv = require('./config/validateEnv');
validateEnv();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth.routes');
const admissionRoutes = require('./routes/admission.routes');
const membershipRoutes = require('./routes/membership.routes');
const paymentRoutes = require('./routes/payment.routes');
const onetimeplayRoutes = require('./routes/onetimeplay.routes');
const oneTimeAccessRoutes = require('./routes/oneTimeAccess.routes');
const slotRoutes = require('./routes/slot.routes');
const operationRoutes = require('./routes/operation.routes');
const attendanceRoutes = require('./routes/attendance.routes');
const menuRoutes = require('./routes/menu.routes');
const orderRoutes = require('./routes/order.routes');
const tableRoutes = require('./routes/table.routes');
const inventoryRoutes = require('./routes/inventory.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const serviceRoutes = require('./routes/service.routes');
const blockedScheduleRoutes = require('./routes/blockedSchedule.routes');
const bookingRoutes = require('./routes/booking.routes');
const reviewRoutes = require('./routes/review.routes');
const sportRoutes = require('./routes/sport.routes');
const superadminRoutes = require('./routes/superadmin.routes');
const kitchenRoutes = require('./routes/kitchen.routes');
const contactRoutes = require('./routes/contactRoutes');
const adminCommunicationRoutes = require('./routes/adminCommunicationRoutes');
const academySettingsRoutes = require('./routes/academySettings.routes');
const courtRoutes = require('./routes/court.routes');
const couponRoutes = require('./routes/coupon.routes');
const academyRoutes = require('./routes/academy.routes');
const sessionConfigRoutes = require('./routes/sessionConfig.routes');
const blogRoutes = require('./routes/blog.routes');

// Import cron jobs
const startExpiryReminder = require('./jobs/expiryReminder.job');
const startLowStockAlert = require('./jobs/lowStockAlert.job');
const startAutoCheckout = require('./jobs/autoCheckout.job');
const startExpireOneTimeAccess = require('./jobs/expireOneTimeAccess.job');
const startCricketSlotReminderSms = require('./jobs/cricketSlotReminderSms.job');
const startTestExpiryCheckerModule = require('./jobs/testExpiryChecker.job');
const { stopTestExpiryChecker } = startTestExpiryCheckerModule;
const startTestExpiryChecker = startTestExpiryCheckerModule;

const app = express();
const server = http.createServer(app);

const isProd = process.env.NODE_ENV === 'production';

const allowedOrigins = [
  ...(!isProd ? ['http://localhost:5173'] : []),
  'https://red-ball-delta.vercel.app',
  // Production domains
  'https://redballsportsarena.in',
  'https://www.redballsportsarena.in',
  'https://redballsportsarena.com',
  'https://www.redballsportsarena.com',
  process.env.CLIENT_URL,
].filter(Boolean);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  },
});

app.set('io', io);

// Socket.io auth middleware — attaches userId and role when a valid token is provided.
// Connections without tokens are still allowed (public portals need socket too).
io.use(async (socket, next) => {
  const token = socket.handshake.auth?.token;
  if (token) {
    try {
      const User = require('./models/User');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('role isActive');
      if (user?.isActive) {
        socket.data.userId = decoded.userId.toString();
        socket.data.role = user.role;
      }
    } catch {} // invalid/expired token — treat as unauthenticated
  }
  next();
});

// Socket.io connection handling
io.on('connection', (socket) => {
  // Auto-join personal room so targeted io.to(`user:${id}`) events work
  if (socket.data.userId) {
    socket.join(`user:${socket.data.userId}`);
  }
  // join-managers accepts an optional inline token as a fallback for cases
  // where the socket connected before the user was authenticated (e.g. App.jsx
  // connects on mount, then the user logs in and the restaurant page emits this).
  socket.on('join-managers', async ({ token } = {}) => {
    let role = socket.data.role;

    if (!role && token) {
      try {
        const User = require('./models/User');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('role isActive');
        if (user?.isActive) {
          socket.data.userId = decoded.userId.toString();
          socket.data.role = user.role;
          role = user.role;
        }
      } catch {}
    }

    if (role === 'manager' || role === 'superadmin') {
      socket.join('restaurant-managers');
    }
  });

  socket.on('join-order', (orderId) => {
    socket.join(`order-${orderId}`);
  });

  socket.on('leave-order', (orderId) => {
    socket.leave(`order-${orderId}`);
  });

  socket.on('join-kitchen-updates', () => {
    if (socket.data.role === 'manager' || socket.data.role === 'superadmin') {
      socket.join('kitchen-updates');
    }
  });

  socket.on('order:accept', async ({ orderId }) => {
    if (socket.data.role !== 'manager' && socket.data.role !== 'superadmin') return;
    io.to('restaurant-managers').emit('order:updated', { orderId, status: 'preparing' });
    io.to(`order-${orderId}`).emit('order:status', { orderId, status: 'preparing' });
  });

  socket.on('order:ready', async ({ orderId }) => {
    if (socket.data.role !== 'manager' && socket.data.role !== 'superadmin') return;
    io.to('restaurant-managers').emit('order:updated', { orderId, status: 'ready' });
    io.to(`order-${orderId}`).emit('order:status', { orderId, status: 'ready' });
  });

  socket.on('order:delivered', async ({ orderId }) => {
    if (socket.data.role !== 'manager' && socket.data.role !== 'superadmin') return;
    io.to('restaurant-managers').emit('order:updated', { orderId, status: 'delivered' });
    io.to(`order-${orderId}`).emit('order:status', { orderId, status: 'delivered' });
  });

  socket.on('disconnect', () => {
    console.log(`🔌 Socket disconnected: ${socket.id}`);
  });
});

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://checkout.razorpay.com', 'https://accounts.google.com'],
      frameSrc: ["'self'", 'https://api.razorpay.com'],
      imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com', 'https://lh3.googleusercontent.com'],
      connectSrc: ["'self'", 'https://api.razorpay.com', ...allowedOrigins],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
  hsts: isProd ? { maxAge: 31536000, includeSubDomains: true } : false,
}));

app.set('trust proxy', 1);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(compression());
app.use(morgan(isProd ? 'combined' : 'dev'));
app.use(express.json({
  limit: '10mb',
  verify: (req, res, buf) => {
    req.rawBody = buf;
  },
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());

// ── Rate Limiting ──────────────────────────────────────────────────
const rateLimitMessage = (windowMs) => ({
  success: false,
  code: 'RATE_LIMITED',
  retryAfter: Math.ceil(windowMs / 1000),
  message: 'Too many requests. Please slow down.',
});

// Skip health checks and socket.io heartbeat paths from all rate limiters
const skipHealthAndSocket = (req) =>
  req.path === '/health' || req.path.startsWith('/socket.io');

// General API: 100 req/min for anonymous, 300 req/min for authenticated.
// No custom keyGenerator — express-rate-limit's default handles IPv6 correctly.
app.use('/api/', rateLimit({
  windowMs: 60 * 1000,
  max: (req) => (req.headers.authorization?.startsWith('Bearer ') ? 300 : 100),
  skip: skipHealthAndSocket,
  standardHeaders: true,
  legacyHeaders: false,
  message: rateLimitMessage(60 * 1000),
}));

// Login: 10 attempts per 15 minutes
app.use('/api/auth/login', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: rateLimitMessage(15 * 60 * 1000),
}));

// Forgot password: 5 requests per hour
app.use('/api/auth/forgot-password', rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: rateLimitMessage(60 * 60 * 1000),
}));

// QR entry check-in/out: 30 req/min
app.use('/api/sports/entry-check', rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: rateLimitMessage(60 * 1000),
}));

// Payment endpoints: 20 requests per 10 minutes
app.use('/api/payments/create-order', rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: rateLimitMessage(10 * 60 * 1000),
}));
app.use('/api/payments/verify', rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: rateLimitMessage(10 * 60 * 1000),
}));

// Slot order creation + verification: 30 per 10 minutes
const slotOrderLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: rateLimitMessage(10 * 60 * 1000),
});
app.use('/api/slots/public/slot-order', slotOrderLimiter);
app.use('/api/slots/public/slot-verify', slotOrderLimiter);
app.use('/api/slots/public-booking/order', slotOrderLimiter);
app.use('/api/slots/public-booking', slotOrderLimiter);

// Coupon validation: 60 per 10 minutes (UI calls on every keypress, so be generous)
app.use('/api/coupons/validate', rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: rateLimitMessage(10 * 60 * 1000),
}));

// Restaurant order creation: 20 per 10 minutes
const restaurantOrderLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: rateLimitMessage(10 * 60 * 1000),
});
app.use('/api/orders/direct', restaurantOrderLimiter);
app.use('/api/orders/table-order', restaurantOrderLimiter);
app.use('/api/orders/create-razorpay-order', restaurantOrderLimiter);

// Static Files
app.use('/uploads', express.static(require('path').join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api', membershipRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/onetimeplay', onetimeplayRoutes);
app.use('/api/onetimeaccess', oneTimeAccessRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/operations', operationRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/blocked-schedules', blockedScheduleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/sports', sportRoutes);
app.use('/api/super-admin', superadminRoutes);
app.use('/api/kitchen', kitchenRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/super-admin/communication', adminCommunicationRoutes);
app.use('/api/academy-settings', academySettingsRoutes);
app.use('/api/courts', courtRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/academy', academyRoutes);
app.use('/api/session-config', sessionConfigRoutes);
app.use('/api/blog', blogRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start server
const PORT = process.env.PORT || 5000;

const { startCricketReminderCron } = require('./utils/cricketReminderCron');

const startServer = async () => {
  await connectDB();
  startCricketReminderCron();

  const User = require('./models/User');

  const existingAdmin = await User.findOne({ role: 'superadmin' });
  if (!existingAdmin) {
    await User.create({
      name: process.env.SUPER_ADMIN_NAME || 'Super Admin',
      email: process.env.SUPER_ADMIN_EMAIL,
      phone: '9999999999',
      password: process.env.SUPER_ADMIN_PASSWORD,
      role: 'superadmin',
    });
    console.log(`🔐 Superadmin seeded: ${process.env.SUPER_ADMIN_EMAIL}`);
  }

  const existingManager = await User.findOne({ role: 'manager' });
  if (!existingManager) {
    await User.create({
      name: process.env.MANAGER_NAME || 'Restaurant Manager',
      email: process.env.MANAGER_EMAIL,
      phone: '8888888888',
      password: process.env.MANAGER_PASSWORD,
      role: 'manager',
    });
    console.log(`👨‍🍳 Manager seeded: ${process.env.MANAGER_EMAIL}`);
  }


  // Seed test plans
  const seedTestPlans = require('./jobs/seedTestPlans');
  await seedTestPlans(existingAdmin?._id);

  // Seed sports
  const seedSports = require('./jobs/seedSports');
  await seedSports();

  // Start cron jobs
  startExpiryReminder();
  startLowStockAlert();
  startAutoCheckout(io);
  startExpireOneTimeAccess(io);
  startCricketSlotReminderSms();
  startTestExpiryChecker(io);

  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 Socket.io ready`);
  });

  process.on('SIGTERM', () => {
    console.log('⏹️ SIGTERM received, shutting down gracefully...');
    stopTestExpiryChecker();
    server.close(() => {
      console.log('🛑 Server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('⏹️ SIGINT received, shutting down gracefully...');
    stopTestExpiryChecker();
    server.close(() => {
      console.log('🛑 Server closed');
      process.exit(0);
    });
  });
};

startServer().catch(console.error);
