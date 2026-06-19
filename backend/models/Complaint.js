import mongoose from 'mongoose';

const categories = [
  'Classroom',
  'Laboratory',
  'Hostel',
  'Library',
  'Internet/Wi-Fi',
  'Electrical',
  'Water Supply',
  'Cleanliness',
  'Other'
];

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Complaint title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Complaint category is required'],
      enum: {
        values: categories,
        message: 'Invalid category option',
      },
    },
    description: {
      type: String,
      required: [true, 'Complaint description is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Complaint location is required'],
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ['Pending', 'In Progress', 'Resolved'],
        message: 'Invalid status value',
      },
      default: 'Pending',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Also includes standard updatedAt, etc.
  }
);

const Complaint = mongoose.model('Complaint', complaintSchema);

export { categories };
export default Complaint;
