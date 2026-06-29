import "./style.css";

function ProgressBar({ title, value, color }) {

  return (

    <div className="progress-item">

      <div className="progress-header">

        <span>{title}</span>

        <strong>{value}%</strong>

      </div>

      <div className="progress-track">

        <div
          className="progress-fill"
          style={{
            width: `${value}%`,
            background: color
          }}
        ></div>

      </div>

    </div>

  );

}

export default ProgressBar;