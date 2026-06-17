import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';
// import seedDatabase from './utils/seedData.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Auto-seed database if empty
// seedDatabase();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Campus Complaint Management System (CCMS) API is running' });
});

// 404 Route handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'API Endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || 'An internal server error occurred',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
