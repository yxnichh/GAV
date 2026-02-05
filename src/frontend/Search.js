import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "../css/Search.css";

const mockData = [
  {
    date: "5/01/2569",
    code: "GAV-000-000",
    customer: "นายอนุชา มาลอง",
    evaluator: "พี่บอย",
    inspector: "พี่กรุง",
    location: "เชียงใหม่"
  },
  {
    date: "6/01/2569",
    code: "GAV-111-222",
    customer: "บริษัทดำรงบริการ ลำพูน888",
    evaluator: "พี่จุ๋ม",
    inspector: "พี่อาร์ท",
    location: "ลำพูน"
  }
];

export default function Search() {
  const [searchText, setSearchText] = useState("");

  const filtered = mockData.filter((row) => {
    const text = searchText.toLowerCase();
    return (
      row.code.toLowerCase().includes(text) ||
      row.customer.toLowerCase().includes(text) ||
      row.location.toLowerCase().includes(text)
    );
  });

  return (
    <div className="search-container">
      {/* Header */}
      <div className="search-header">
        <h2>ค้นหางาน</h2>
        <p>ค้นหางานจาก รหัสงาน / ลูกค้า / ที่ตั้งทรัพย์สิน</p>
      </div>

      {/* Search Bar */}
      <div className="search-top">
        <div className="search-bar">
          <FiSearch />
          <input
            placeholder="พิมพ์เพื่อค้นหา..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>วันที่</th>
              <th>รหัสงาน</th>
              <th>ลูกค้า</th>
              <th>ที่ตั้งทรัพย์สิน</th>
              <th>ผู้ประเมิน</th>
              <th>ผู้ตรวจ</th>
              <th>รายละเอียด</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  ไม่พบข้อมูล
                </td>
              </tr>
            ) : (
              filtered.map((row, i) => (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td>{row.code}</td>
                  <td>{row.customer}</td>
                  <td>{row.location}</td>
                  <td>{row.evaluator}</td>
                  <td>{row.inspector}</td>
                  <td className="link">ดูรายละเอียด</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
