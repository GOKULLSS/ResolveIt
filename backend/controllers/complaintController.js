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