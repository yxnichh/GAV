import React, { useEffect, useState } from "react";
import "../css/SaleValuation.css";
import { useNavigate, useLocation } from "react-router-dom";
import TopTab from "./TopTab";
import { FaArrowLeft } from "react-icons/fa";

import { db } from "../backend/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function SaleValuation() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const currentPos = state?.currentPos;

  // ⭐ ข้อมูลน้ำหนัก (Fixed)
  const saleFactors = [
    { id: 1, name: "สภาพเศรษฐกิจ (Economic Impact)", weight: 5 },
    {
      id: 2,
      name:
        "ศักยภาพในการพัฒนาทำประโยชน์ และข้อจำกัดทางกฎหมาย (Property Utilization, Development Potentiality and Legal Restriction Constraints)",
      weight: 5,
    },
    {
      id: 3,
      name: "ทำเลและสภาพแวดล้อม (Location and Environment)",
      weight: 4,
    },
    {
      id: 4,
      name: "ขนาดและรูปร่างตัวทรัพย์ที่ประเมิน (Physical Characteristics)",
      weight: 3,
    },
    {
      id: 5,
      name:
        "สาธารณูปโภค, สิ่งอำนวยความสะดวก และการคมนาคม (Facilities, Infrastructures and Transportation)",
      weight: 3,
    },
  ];

  // คะแนนจาก Firebase
  const [scores, setScores] = useState([]);

  // ราคาประเมิน (ดึงจาก Firebase หรือ default)
  const [appraisalPrice, setAppraisalPrice] = useState(0);

  const land = state?.land;

  // ⭐ โหลดคะแนน + appraisalPrice จาก Firebase
  useEffect(() => {
    async function loadData() {
      if (!land?.docId) return;

      const ref = doc(db, "lands", land.docId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();

        // แปลงคะแนนจาก string → number
        const arr = (data.saleFactors || []).map((x) => Number(x));
        setScores(arr);

        setAppraisalPrice(data.appraisalPrice || 0);
      }
    }

    loadData();
  }, [land]);

  // ⭐ คำนวณคะแนนรวม (weight × score)
  const saleScoreTotal = saleFactors.reduce(
    (sum, f, index) => sum + f.weight * (scores[index] || 0),
    0
  );

  // ⭐ ฟังก์ชันหาว่าอยู่ในช่วงไหน
  function getDiscountIndex(total) {
    if (total >= 69 && total <= 80) return 0;
    if (total >= 57 && total <= 68) return 1;
    if (total >= 45 && total <= 56) return 2;
    if (total >= 33 && total <= 44) return 3;
    if (total >= 21 && total <= 32) return 4;
    return 5; // 0 - 20
  }

  const discountIndex = getDiscountIndex(saleScoreTotal);

  // ⭐ ตารางส่วนลด
  const discountRows = [
    { range: "69 - 80", year: "1", pv: "0.892857", disc: "10%" },
    { range: "57 - 68", year: "2", pv: "0.797194", disc: "20%" },
    { range: "45 - 56", year: "3", pv: "0.711780", disc: "30%" },
    { range: "33 - 44", year: "4", pv: "0.635518", disc: "35%" },
    { range: "21 - 32", year: "5", pv: "0.567427", disc: "45%" },
    { range: "0 - 20", year: "6-10", pv: "0.506631", disc: "50%" },
  ];

  return (
    <div className="sale-page">
      <TopTab
        page="map"
        setPage={(p) => navigate("/", { state: { page: p } })}
      />

      <div className="sale-container">
        {/* Header */}
        <div className="sale-header">
          <button
            className="back-btn"
            onClick={() =>
              navigate("/", {
                state: {
                  page: "map",
                  land,
                  currentPos,
                  openPopup: true,
                  openDetail: true,
                },
              })
            }
          >
            <FaArrowLeft /> กลับ
          </button>

          <h1>แนวทางวิเคราะห์มูลค่าบังคับขาย</h1>
        </div>

        {/* Price Highlight */}
        <div className="price-card">
          <span>ราคาประเมินมูลค่าตลาด</span>
          <strong>{Number(appraisalPrice).toLocaleString()} บาท</strong>
          <p>ระดับคะแนน : ดีมาก 4 | ดี 3 | ปานกลาง 2 | ด้อย 1</p>
        </div>

        {/* Factor Table */}
        <div className="card">
          <h2>ปัจจัยที่ใช้ในการวิเคราะห์</h2>

          <table className="modern-table">
            <thead>
              <tr>
                <th>ปัจจัย</th>
                <th>น้ำหนัก</th>
                <th>คะแนน</th>
                <th>คะแนนถ่วงน้ำหนัก</th>
              </tr>
            </thead>
            <tbody>
              {saleFactors.map((f, index) => (
                <tr key={f.id}>
                  <td>{f.name}</td>
                  <td className="center">{f.weight}</td>
                  <td className="center">{scores[index]}</td>
                  <td className="right">
                    {(f.weight * (scores[index] || 0)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="right bold">
                  คะแนนรวม
                </td>
                <td className="right bold">{saleScoreTotal.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Discount */}
        <div className="card">
          <h2>แนวทางการวิเคราะห์ส่วนลด</h2>

          <table className="modern-table">
            <thead>
              <tr>
                <th>ช่วงคะแนน</th>
                <th>สภาพคล่อง (ปี)</th>
                <th>Present Value</th>
                <th>Discount</th>
              </tr>
            </thead>
            <tbody>
              {discountRows.map((row, idx) => (
                <tr
                  key={idx}
                  className={discountIndex === idx ? "highlight-row" : ""}
                >
                  <td className="center">{row.range}</td>
                  <td className="center">{row.year}</td>
                  <td className="center">{row.pv}</td>
                  <td className="center">
                    {row.disc} {discountIndex === idx ? "✔" : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="final-card">
          <span>มูลค่าบังคับขายโดยประมาณ</span>
          <strong>{Number(appraisalPrice).toLocaleString()} บาท</strong>
          <p>เป็นมูลค่าที่ประมาณในราคาที่สามารถขายได้ภายในเวลาจำกัด</p>
        </div>
      </div>
    </div>
  );
}
