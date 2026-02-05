import { FaRobot, FaRulerCombined, FaMoneyBillWave } from "react-icons/fa";
import "../../css/map.css";

export default function AIEstimatePanel({ land, onClose, onShowCompare }) {
  if (!land) return null;

  return (
    <div className="ai-panel">
      <div className="panel-header">
        <h3>รายการประเมินโดย AI</h3>
        <button className="close" onClick={onClose}>✖</button>
      </div>

      {/* Cards */}
      <div className="ai-card">
        <FaRulerCombined />
        <div>
          <small>ราคาตลาดต่อ ตร.ว</small>
          <b>566 บาท/ตร.ว.</b>
        </div>
      </div>

      <div className="ai-card">
        <FaMoneyBillWave />
        <div>
          <small>ราคาประเมิน</small>
          <b>566 บาท/ตร.ว.</b>
        </div>
      </div>

      <div className="ai-card">
        <FaRobot />
        <div>
          <small>ค่าประเมินสูงสุด (Max)</small>
          <b>548.46</b>
        </div>
      </div>

      <div className="ai-card">
        <FaRobot />
        <div>
          <small>ค่าประเมินต่ำสุด (Min)</small>
          <b>548.46</b>
        </div>
      </div>

      {/* 🔥 ปุ่มเปิด Compare */}
      <button className="compare-btn" onClick={onShowCompare}>
        ดูรายละเอียดการเปรียบเทียบ
      </button>
    </div>
  );
}
