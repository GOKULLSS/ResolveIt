const categoryIcons = {
  Classroom: 'bi-chalkboard-fill',
  Laboratory: 'bi-cpu-fill',
  Hostel: 'bi-houses-fill',
  Library: 'bi-book-half',
  'Internet/Wi-Fi': 'bi-wifi',
  Electrical: 'bi-lightning-charge-fill',
  'Water Supply': 'bi-droplet-fill',
  Cleanliness: 'bi-trash-fill',
  Other: 'bi-question-circle-fill'
};

const statusDetails = {
  Pending: {
    class: 'pending',
    icon: 'bi-hourglass-split',
    label: 'Pending Review'
  },
  'In Progress': {
    class: 'inprogress',
    icon: 'bi-gear-wide-connected',
    label: 'In Progress'
  },
  Resolved: {
    class: 'resolved',
    icon: 'bi-check2-all',
    label: 'Resolved'
  }
};

const ComplaintCard = ({ complaint, onDelete }) => {

  const {
    _id,
    title,
    category,
    description,
    location,
    status,
    createdDate
  } = complaint;

  const statusInfo =
    statusDetails[status];

  const iconClass =
    categoryIcons[category];

  const isPending =
    status === 'Pending';

  return (
    <div
      className="card glass-panel mb-4 fade-in-up"
      style={{
        transition:
          'var(--transition-smooth)'
      }}
    >
      <div className="card-body p-4">

        <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">

          <span
            className="badge bg-secondary bg-opacity-20 text-light border border-secondary border-opacity-20 d-flex align-items-center gap-2 px-3 py-2"
            style={{
              borderRadius: '8px',
              fontSize: '0.8rem'
            }}
          >
            <i
              className={`bi ${iconClass} text-primary`}
            ></i>

            <span>{category}</span>
          </span>

          <span
            className={`status-badge ${statusInfo.class}`}
          >
            <i
              className={`bi ${statusInfo.icon}`}
            ></i>

            <span>{statusInfo.label}</span>
          </span>

        </div>

        <h4 className="fw-bold text-light mb-2">
          {title}
        </h4>

        <p
          className="text-secondary mb-3"
          style={{
            fontSize: '0.95rem',
            lineHeight: '1.6'
          }}
        >
          {description}
        </p>

        <div
          className="d-flex flex-wrap gap-3 py-3 border-top border-bottom border-opacity-10 mb-4"
        >
          <div className="d-flex align-items-center text-secondary small">
            <i className="bi bi-geo-alt-fill text-primary me-2"></i>
            {location}
          </div>

          <div className="d-flex align-items-center text-secondary small">
            <i className="bi bi-calendar3 text-primary me-2"></i>
            {createdDate}
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center">

          <div className="d-flex gap-2">

            {isPending ? (
              <>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() =>
                    alert(
                      'Frontend Demo Edit Page'
                    )
                  }
                >
                  <i className="bi bi-pencil-square me-1"></i>
                  Edit
                </button>

                <button
                  onClick={() =>
                    onDelete(_id)
                  }
                  className="btn btn-outline-danger btn-sm"
                >
                  <i className="bi bi-trash me-1"></i>
                  Delete
                </button>
              </>
            ) : (
              <button
                className="btn btn-outline-secondary btn-sm"
                disabled
              >
                Edit Locked
              </button>
            )}

          </div>

          <small className="text-muted">
            ID: {_id}
          </small>

        </div>

      </div>
    </div>
  );
};

export default ComplaintCard;