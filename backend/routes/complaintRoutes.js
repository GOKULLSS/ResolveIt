import express from 'express';
import {
  createComplaint,
  getComplaints,
  updateComplaint,
  deleteComplaint,
} from '../controllers/complaintController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get complaints (Admin gets all, Student gets their own)
router.get('/', protect, getComplaints);

// Submit a new complaint (Student only)
router.post('/', protect, authorize('Student'), createComplaint);

// Update a complaint (Student edit or Admin status update)
router.put('/:id', protect, updateComplaint);

// Delete a complaint (Student only)
router.delete('/:id', protect, authorize('Student'), deleteComplaint);

export default router;