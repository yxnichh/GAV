import {
  FaImage,
  FaFileAlt,
  FaTable,
  FaBalanceScale,
  FaChartLine,
  FaClipboardCheck,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../css/map.css";


export default function LandDetailPanel({ land, onClose, currentPos }) {

  const navigate = useNavigate();
  if (!land) return null;

  console.log("OPEN IMAGEVIEWER LAND:", land);

  return (
    <div className="land-detail-panel">
      <div className="panel-header">
        <h3>ข้อมูลแปลงที่ดินเชิงลึก</h3>
        <button className="close" onClick={onClose}>✖</button>
      </div>

      {/* 🔹 ข้อมูลรูปภาพ */}
      <DetailItem
        icon={<FaImage />}
        label="ข้อมูลรูปภาพ"
        onClick={() => {
          sessionStorage.setItem("selectedLand", JSON.stringify(land));
          navigate("/images", {
            state: {
              land,
              page: "map",
              currentPos: land.position   // ⭐ ส่งพิกัดไปด้วย
            },
          });

        }}
      />

      <DetailItem icon={<FaFileAlt />} label="รายงานสำรวจ" />

      {/* 🔹 ตารางข้อมูลเปรียบเทียบ */}
      <DetailItem
        icon={<FaTable />}
        label="ตารางข้อมูลเปรียบเทียบ"
        onClick={() =>
          navigate("/compare", {
            state: {
              land,
              currentPos: currentPos,   // ⭐ ส่งตำแหน่งปัจจุบันไปด้วย
              page: "map"
            },
          })
        }
      />
      <DetailItem
        icon={<FaBalanceScale />}
        label="ตารางแสดงวิธีการเปรียบเทียบค่าและคุณภาพถ่วงน้ำหนัก (WQS.)"
        onClick={() =>
          navigate("/wqs", {
            state: {
              land,
              page: "map",
              currentPos: land.position   // ⭐ ส่ง lat/lon เข้าไปด้วย!
            }
          })

        }
      />



      <DetailItem
        icon={<FaChartLine />}
        label="แนวทางการวิเคราะห์หามูลค่าบังคับขาย"
        onClick={() => {
          navigate("/sale-valuation", {
            state: {
              land,
              page: "map",
              currentPos: land.position ?? currentPos,   // ⭐ ส่งหมุดไปด้วย
            },
          });
        }}

      />

      {/* ✅ ผลสรุปการประเมินมูลค่าทรัพย์สิน → AssetSummary */}
      <DetailItem
        icon={<FaClipboardCheck />}
        label="ผลสรุปการประเมินมูลค่าทรัพย์สิน"
        onClick={() => {
          sessionStorage.setItem("selectedLand", JSON.stringify(land));
          navigate("/asset-summary", {
            state: {
              land,
              page: "map",
              currentPos: land.position ?? currentPos,   // ⭐ ส่งหมุดไปด้วย
            },
          });
        }}
      />
    </div>
  );
}

function DetailItem({ icon, label, onClick }) {
  return (
    <div className="detail-row">
      <div className="detail-left">
        <div className="detail-icon">{icon}</div>
        <span>{label}</span>
      </div>

      <span
        className="detail-link"
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        ดูรายละเอียด
      </span>
    </div>
  );
}
