import "./style.css";

function KPICard({
  title,
  value,
  trend,
  color = "purple",
  icon = "📊"
}) {
  return (
    <div className={`kpi-card ${color}`}>

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