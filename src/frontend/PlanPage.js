import { useState } from "react";
import "../css/PlanPage.css";
import UploadPopup from "./UploadPopup";

const data = Array(12).fill({
  date: "5/01/2569",
  code: "GAV-000-000",
  customer: "บริษัทกำกับสินทรัพย์ เรียลเอส888 กรุ๊ป จำกัด",
  evaluator: "พี่รัก",
  checker: "พี่นุ",
  sale: "พี่ไลลา",
  location: "15/1 ต.วังทองหลาง อ.หวังทองหลาง จ.กรุงเทพ",
});

export default function PlanPage() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="plan-container">

      {/* Popup */}
      <UploadPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />

      {/* Search */}
      <div className="plan-search">
        <input type="text" placeholder="ค้นหา" />
      </div>

      {/* Table */}
      <div className="plan-table-container">
        <table className="plan-table">
          <thead>
            <tr>
              <th>วัน/เดือน/ปี</th>
              <th>รหัสงาน</th> 
              <th>ที่อยู่</th>
              <th>ลูกค้า</th>
              <th>ผู้ประเมิน</th>
              <th>ผู้ตรวจ</th>
              <th>ฝ่ายการตลาด</th>
              <th>อัพโหลดงาน</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{row.code}</td>
                <td>{row.location}</td>
                <td>{row.customer}</td>
                <td>{row.evaluator}</td>
                <td>{row.checker}</td>
                <td>{row.sale}</td>
                <td>
                  <button
                    className="download-btn"
                    onClick={() => setShowPopup(true)}
                  >
                    อัพโหลดงาน
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button>&lt;&lt;</button>
        <button>&lt;</button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>&gt;</button>
        <button>&gt;&gt;</button>
      </div>

    </div>
  );
}
