import express from 'express';
const router = express.Router();

// Placeholder route so the app doesn't crash
router.get('/', (req, res) => {
  res.send('authRoutes  placeholder active');
});

export default router;