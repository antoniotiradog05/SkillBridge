const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', limiter);

// Mock Data
const skills = [
  { id: 1, name: 'Web Development', category: 'Technology', mentors: 124 },
  { id: 2, name: 'Digital Marketing', category: 'Business', mentors: 89 },
  { id: 3, name: 'Graphic Design', category: 'Design', mentors: 56 },
  { id: 4, name: 'Data Science', category: 'Technology', mentors: 42 },
  { id: 5, name: 'UI/UX Design', category: 'Design', mentors: 78 },
  { id: 6, name: 'Cybersecurity', category: 'Technology', mentors: 31 }
];

const roadmapRoutes = require('./routes/roadmap');
const authRoutes = require('./routes/auth');
const mentorRoutes = require('./routes/mentors');

// Routes
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/mentors', mentorRoutes);

app.get('/api/skills', (req, res) => {
  res.json(skills);
});

app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'SkillBridge Backend is online', 
    version: '1.1.0',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health Check
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`
  🚀 SkillBridge Backend Running
  ----------------------------
  Port: ${PORT}
  Mode: ${process.env.NODE_ENV || 'development'}
  Health: http://localhost:${PORT}/health
  ----------------------------
  `);
});