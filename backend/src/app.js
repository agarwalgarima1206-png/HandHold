
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import studentRoutes from './routes/student.routes.js';
import mentorRoutes from './routes/mentor.routes.js';
import meetingRoutes from './routes/meeting.routes.js';
import goalRoutes from './routes/goal.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';
import notificationRoutes from './routes/notification.routes.js';

import {
  notFound,
  errorHandler
} from './middleware/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'HandHold API'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/notifications', notificationRoutes);

// Keep these at the end
app.use(notFound);
app.use(errorHandler);

export default app;
