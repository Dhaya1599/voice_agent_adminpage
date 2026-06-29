import "./style.css";

function KPICard({
  title,
  value,
  trend,
  color = "#7367F0", // Uses a valid fallback hex color code
  icon = "📊"
}) {
  return (
    /* Apply color safely via the style attribute */
    <div className="kpi-card" style={{ background: color }}>

      <div className="kpi-header">

        <div>
          <p className="kpi-title">
            {title}
          </p>
          <h2 className="kpi-value">
            {value}
          </h2>
        </div>

        <div className="kpi-icon">
          {icon}
        </div>

      </div>

      <div className="kpi-footer">
        <span className="trend">
          ▲ {trend}
        </span>
      </div>

    </div>
  );
}

export default KPICard;