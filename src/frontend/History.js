import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../css/History.css";

export default function HistoryPage() {
  const { id } = useParams();         // userId จาก URL
  const location = useLocation();     // รับข้อมูลผู้ใช้จาก state
  const navigate = useNavigate();

  const user = location.state;        // ข้อมูลผู้ใช้ที่ส่งมาจากปุ่ม "ดูประวัติ"

  const [history, setHistory] = useState([]);

  // โหลดข้อมูล (mock ก่อน)
  useEffect(() => {
    // ในระบบจริง → ดึงจาก DB โดยใช้ userId
    // เช่น Firebase Firestore → collection("history").where("userId", "==", id)

    const mockHistory = [
      { id: 1, action: "เข้าสู่ระบบ", time: "2026-02-01 09:41" },
      { id: 2, action: "เพิ่มผู้ใช้ใหม่", time: "2026-02-01 10:12" },
      { id: 3, action: "ออกจากระบบ", time: "2026-02-01 10:30" },
      { id: 4, action: "เข้าสู่ระบบ", time: "2026-02-02 08:45" },
      { id: 5, action: "แก้ไขข้อมูลงาน", time: "2026-02-02 09:20" },
    ];

    setHistory(mockHistory);
  }, [id]);

  return (
    <div className="history-container">

      <button className="back-btn" onClick={() => navigate(-1)}>← กลับ</button>

      <h1>ประวัติการใช้งานของผู้ใช้</h1>

      {/* ข้อมูลผู้ใช้ */}
      <div className="user-info-box">
        <h2>{user?.name}</h2>
        <p>ชื่อเล่น: {user?.nickname || "-"}</p>
        <p>อีเมล: {user?.email}</p>
        <p>สิทธิ์: {user?.role}</p>
      </div>

      {/* ตารางประวัติ */}
      <div className="history-table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>กิจกรรม</th>
              <th>วัน - เวลา</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{item.action}</td>
                <td>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
