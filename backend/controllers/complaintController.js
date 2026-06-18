//create








// @desc    Get complaints (Student gets their own, Admin gets all)
// @route   GET /api/complaints
// @access  Private
export const getComplaints = async (req, res) => {
  try {
    let query = {};

    // If Student, restrict to their own complaints
    if (req.user.role === 'Student') {
      query.createdBy = req.user._id;
    }

    // Filter by Category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Filter by Status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by Specific Date (YYYY-MM-DD format)
    if (req.query.date) {
      const dateStr = req.query.date;
      const startOfDay = new Date(dateStr);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(dateStr);
      endOfDay.setHours(23, 59, 59, 999);
      
      query.createdDate = {
        $gte: startOfDay,
        $lte: endOfDay
      };
    }

    // Sorting options (default to newest first)
    let sortOptions = { createdDate: -1 };
    if (req.query.sort === 'oldest') {
      sortOptions = { createdDate: 1 };
    }

    const complaints = await Complaint.find(query)
      .populate('createdBy', 'name email role')
      .sort(sortOptions);

    return res.json(complaints);
  } catch (error) {
    console.error('Get Complaints Error:', error.message);
    return res.status(500).json({ message: 'Server error retrieving complaints' });
  }
};

//update
// @desc    Update complaint details (Student can update pending, Admin can update status)
// @route   PUT /api/complaints/:id
// @access  Private
export const updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.id || req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Role-specific update logic
    if (req.user.role === 'Student') {
      // 1. Ensure user is the owner
      if (complaint.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Access Denied: You cannot modify this complaint' });
      }

      // 2. Ensure status is still Pending
      if (complaint.status !== 'Pending') {
        return res.status(400).json({ message: 'Complaint cannot be edited after Admin review (must be Pending)' });
      }

      // 3. Perform fields update
      const { title, category, description, location } = req.body;
      if (title) complaint.title = title;
      if (category) complaint.category = category;
      if (description) complaint.description = description;
      if (location) complaint.location = location;

      const updatedComplaint = await complaint.save();
      const populatedComplaint = await Complaint.findById(updatedComplaint._id).populate('createdBy', 'name email role');
      return res.json(populatedComplaint);

    } else if (req.user.role === 'Admin') {
      // Admin is updating status
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ message: 'Please specify status for update' });
      }

      if (!['Pending', 'In Progress', 'Resolved'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status option (Must be Pending, In Progress, or Resolved)' });
      }

      complaint.status = status;
      const updatedComplaint = await complaint.save();
      const populatedComplaint = await Complaint.findById(updatedComplaint._id).populate('createdBy', 'name email role');
      return res.json(populatedComplaint);
    }

    return res.status(400).json({ message: 'Invalid role for update action' });
  } catch (error) {
    console.error('Update Complaint Error:', error.message);
    return res.status(500).json({ message: 'Server error updating complaint' });
  }
};

// @desc    Delete complaint (Student can only delete if status is Pending)
// @route   DELETE /api/complaints/:id
// @access  Private (Student only)
export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Ensure user is the owner
    if (complaint.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access Denied: You cannot delete this complaint' });
    }

    // Ensure status is still Pending
    if (complaint.status !== 'Pending') {
      return res.status(400).json({ message: 'Complaint cannot be deleted after Admin review (must be Pending)' });
    }

    await Complaint.deleteOne({ _id: complaint._id });
    return res.json({ message: 'Complaint deleted successfully', id: req.params.id });
  } catch (error) {
    console.error('Delete Complaint Error:', error.message);
    return res.status(500).json({ message: 'Server error deleting complaint' });
  }
};
