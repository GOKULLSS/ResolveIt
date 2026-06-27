import React from "react";
const categoryIcons = {
  Classroom: "bi-chalkboard-fill",
  Laboratory: "bi-cpu-fill",
  Hostel: "bi-houses-fill",
  Library: "bi-book-half",
  "Internet/Wi-Fi": "bi-wifi",
  Electrical: "bi-lightning-charge-fill",
  "Water Supply": "bi-droplet-fill",
  Cleanliness: "bi-trash-fill",
  Other: "bi-question-circle-fill",
};
const categoryColors = {
  Classroom: "#6366f1", // Indigo
  Laboratory: "#8b5cf6", // Purple
  Hostel: "#ec4899", // Pink
  Library: "#3b82f6", // Blue
  "Internet/Wi-Fi": "#77d406ff", // Cyan
  Electrical: "#1dc9b2ff", // Yellow
  "Water Supply": "#3b82f6", // Sky
  Cleanliness: "#10b981", // Emerald
  Other: "#6b7280", // Grey
};
const CategoryChart = ({ complaints }) => {
  const counts = {
    Classroom: 0,
    Laboratory: 0,
    Hostel: 0,
    Library: 0,
    "Internet/Wi-Fi": 0,
    Electrical: 0,
    "Water Supply": 0,
    Cleanliness: 0,
    Other: 0,
  };
  complaints.forEach((complaint) => {
    if (counts[complaint.category] != undefined) {
      counts[complaint.category]++;
    } else {
      counts["Other"]++;
    }
  });
  const totalComplaints = complaints.length;
  const maxCount = Math.max(...Object.values(counts), 1);
  return (
    <div className="card glass-panel">
      <div className="card-body p-4">
        <h5 className="card-title fw-bold mb-4 d-flex align-items-center text-white">
          <i className="bi bi-bar-chart mx-2 text-primary"></i>
          Category Wise Breakdown
        </h5>
        {totalComplaints === 0 ? (
          <div>
            <i className="bi bi-graph-up text-muted fs-1 mb-3"></i>
            <p className="text-white">No data available for chart analysis</p>
          </div>
        ) : (
          <div>
            {Object.entries(counts).map(([category, count]) => {
              const percentage =
                totalComplaints > 0
                  ? Math.round((count / totalComplaints) * 100)
                  : 0;
              const barWidth = `${(count / maxCount) * 100}%`;
              const color = categoryColors[category] || "#6366f1";
              const icon = categoryIcons[category] || `bi-question-circle-fill`;
              return (
                <div key={category}>
                  <div className="d-flex justify-content-between mb-3 p-2">
                    <div className="d-flex gap-2">
                      <div
                        className="d-flex justify-content-center align-items-center rounded-2"
                        style={{
                          width: "28px",
                          height: "28px",
                          backgroundColor: `${color}15`,
                          color: color,
                        }}
                      >
                        <i className={`bi ${icon} fs-6`}></i>
                      </div>
                      <span className="fw-medium text-white">{category}</span>
                    </div>
                    <div>
                      <span
                        className="fw-bold me-2 text-white"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {count}
                      </span>
                      <span className="text-primary small">
                        ({percentage}%)
                      </span>
                    </div>
                  </div>
                  <div
                    className="progress"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      height: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="progress-bar animated-progress"
                      role="progressbar"
                      style={{
                        "--target-width": barWidth,
                        background: `linear-gradient(90deg,
        ${color},
        ${color}dd,
        #ffffff,
        ${color})`,
                      }}
                      aria-valuenow={count}
                      aria-valuemin="0"
                      aria-valuemax={maxCount}
                    >
                      <span className="sparkle"></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryChart;
