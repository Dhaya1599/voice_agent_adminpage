import "./style.css";

function KPICard({
  title,
  value,
  subtitle = "",
  trend = "",
  trendType = "positive",
  icon = "📊",
  gradient = "linear-gradient(135deg,#7367F0,#9C8CFF)",
  onClick,
}) {
  return (
    <div
      className="kpi-card"
      style={{ background: gradient }}
      onClick={onClick}
    >
      <div className="kpi-card-overlay"></div>

      <div className="kpi-header">

        <div className="kpi-text">

          <span className="kpi-title">
            {title}
          </span>

          <h2 className="kpi-value">
            {value}
          </h2>

          {subtitle && (
            <p className="kpi-subtitle">
              {subtitle}
            </p>
          )}

        </div>

        <div className="kpi-icon">
          {icon}
        </div>

      </div>

      {trend && (
        <div className="kpi-footer">

          <span
            className={`trend ${
              trendType === "positive"
                ? "positive"
                : "negative"
            }`}
          >
            {trendType === "positive" ? "▲" : "▼"} {trend}
          </span>

        </div>
      )}

    </div>
  );
}

export default KPICard;