import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { db } from "../backend/firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import "../css/EvaluatorJobs.css";

export default function EvaluatorJobs({ currentUser }) {

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "jobs"),
      where("appraiser", "==", currentUser.name) // ดูเฉพาะงานที่ assign ให้คนนี้
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setJobs(list);
    });

    return () => unsub();
  }, [currentUser]);

  const filtered = jobs.filter((j) => {
    const keyword = search.toLowerCase();
    return (
      j.jobCode.toLowerCase().includes(keyword) ||
      j.customerName.toLowerCase().includes(keyword) ||
      j.assetLocation.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="eval-page-container">
      <h1>งานของฉัน</h1>
      <p className="eval-desc">ค้นหางานที่คุณได้รับมอบหมาย</p>

      <div className="eval-top-bar">
        <div className="job-search-bar">
          <FiSearch />
          <input
            type="text"
            placeholder="ค้นหา รหัสงาน / ลูกค้า / ที่ตั้งทรัพย์สิน..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="eval-table-wrapper">
        <table className="eval-table">
          <thead>
            <tr>
              <th>รหัสงาน</th>
              <th>ลูกค้า</th>
              <th>ที่ตั้งทรัพย์สิน</th>
              <th>กำหนดส่งงาน</th>
              <th>สถานะ</th>
              <th>การทำงาน</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
                  — ไม่มีงานของคุณ —
                </td>
              </tr>
            ) : (
              filtered.map((j) => (
                <tr key={j.id}>
                  <td>{j.jobCode}</td>
                  <td>{j.customerName}</td>
                  <td>{j.assetLocation}</td>
                  <td>{j.dueDate}</td>

                  <td>
                    <span className={`eval-status ${j.status}`}>
                      {j.status}
                    </span>
                  </td>

                  <td>
                    <button className="eval-do-btn">
                      เปิดรายละเอียด
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
