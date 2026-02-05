import { FaTable } from "react-icons/fa";
import "../../css/CompareTablePanel.css";

export default function CompareTablePanel({ land, onClose }) {
  if (!land) return null;

  return (
    <div className="compare-panel">
      <div className="panel-header">
        <h3>รายละเอียด</h3>
        <button className="close" onClick={onClose}>✖</button>
      </div>

      {[1, 2, 3].map((i) => (
        <div className="compare-row" key={i}>
          <div className="compare-left">
            <div className="compare-icon">
              <FaTable />
            </div>
            <div>
              <small>ข้อมูลเปรียบเทียบ {i}</small>
              <b>????</b>
            </div>
          </div>
          <span className="detail-link">รายละเอียด</span>
        </div>
      ))}

      <button className="compare-btn">ตารางเปรียบเทียบ</button>
    </div>
  );
}
