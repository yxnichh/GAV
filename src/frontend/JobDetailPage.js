import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../backend/firebase"; // ← แก้ตาม path ของโปรเจคคุณ
import "../css/JobDetailPage.css";

export default function JobDetailPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // โหลดข้อมูลจาก Firestore
  useEffect(() => {
    async function fetchJob() {
      try {
        const ref = doc(db, "jobs", jobId);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setJob({ id: jobId, ...snap.data() });
        } else {
          console.log("ไม่พบงานนี้");
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }

    fetchJob();
  }, [jobId]);

  if (loading) return <p style={{ padding: 30 }}>กำลังโหลด...</p>;
  if (!job) return <p style={{ padding: 30 }}>ไม่พบข้อมูลงาน</p>;

  // อัปเดตสถานะ (เฉพาะฝ่ายประเมิน)
  const updateStatus = async (newStatus) => {
    const ref = doc(db, "jobs", jobId);
    await updateDoc(ref, { status: newStatus });
    setJob({ ...job, status: newStatus });
  };

  return (
    <div className="jobdetail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← กลับ
      </button>

      <h1>รายละเอียดงาน</h1>

      <div className="detail-box">
        <h2>{job.jobCode}</h2>
        <p className="subtitle">{job.customerName}</p>

        <div className="info-grid">
          <div><strong>ที่ตั้ง:</strong> {job.assetLocation}</div>
          <div><strong>ประเภทงาน:</strong> {job.jobType}</div>
          <div><strong>ลักษณะงาน:</strong> {job.jobStyle}</div>
          <div><strong>ผู้จัดจ้างธนาคาร:</strong> {job.bankContractor}</div>
          <div><strong>ผู้ติดต่อธนาคาร:</strong> {job.bankContact}</div>
          <div><strong>ผู้ประเมิน:</strong> {job.appraiser}</div>
          <div><strong>ค่าก่อน VAT:</strong> {Number(job.feeBeforeVat).toLocaleString()}</div>
          <div><strong>ค่ารวม VAT:</strong> {Number(job.feeAfterVat).toLocaleString()}</div>
          <div><strong>กำหนดส่งงาน:</strong> {job.dueDate}</div>
          <div><strong>กำหนดส่งตรวจ:</strong> {job.reviewDate}</div>
          <div><strong>วันที่รับงาน:</strong> {job.receiveDate}</div>
          <div><strong>วันที่สั่งจบ:</strong> {job.completeDate}</div>
          <div><strong>หมายเหตุ:</strong> {job.remark}</div>
        </div>

        <div className="status-section">
          <label>สถานะปัจจุบัน: </label>
          <span className={`status-badge status-${job.status?.replace(/\s+/g, "")}`}>
            {job.status || "ยังไม่ระบุ"}
          </span>
        </div>

        {/* ปุ่มสำหรับฝ่ายประเมิน */}
        <div className="evaluation-controls">
          <button onClick={() => updateStatus("กำลังดำเนินการ")}>
            → เริ่มประเมิน
          </button>

          <button onClick={() => updateStatus("เสร็จสิ้น")}>
            ✓ ประเมินเสร็จแล้ว
          </button>
        </div>
      </div>
    </div>
  );
}
