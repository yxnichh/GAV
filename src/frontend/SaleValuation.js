import React from "react";
import "../css/SaleValuation.css";
import { useNavigate, useLocation } from "react-router-dom";
import TopTab from "./TopTab";
import { FaArrowLeft } from "react-icons/fa";

export default function SaleValuation() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const currentPos = state?.currentPos;

  const appraisalPrice = 573000;

  const saleFactors = [
    { id: 1, name: "สภาพเศรษฐกิจ", weight: 0.2, score: 3 },
    { id: 2, name: "ศักยภาพและข้อจำกัดทางกฎหมาย", weight: 0.25, score: 2 },
    { id: 3, name: "ทำเลและสภาพแวดล้อม", weight: 0.2, score: 3 },
    { id: 4, name: "ขนาดและรูปร่างทรัพย์สิน", weight: 0.15, score: 2 },
    { id: 5, name: "สาธารณูปโภคและการคมนาคม", weight: 0.2, score: 3 },
  ];

  const saleScoreTotal = saleFactors.reduce(
    (sum, f) => sum + f.weight * f.score,
    0
  );

  return (
    <div className="sale-page">
      <TopTab page="map" setPage={(p) => navigate("/", { state: { page: p } })} />

      <div className="sale-container">
        {/* Header */}
        <div className="sale-header">
          <button
            className="back-btn"
            onClick={() =>
              navigate("/", {
                state: {
                  page: "map",
                  land: state?.land,
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
          <strong>{appraisalPrice.toLocaleString()} บาท</strong>
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
              {saleFactors.map((f) => (
                <tr key={f.id}>
                  <td>{f.name}</td>
                  <td className="center">{f.weight}</td>
                  <td className="center">{f.score}</td>
                  <td className="right">
                    {(f.weight * f.score).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="right bold">
                  คะแนนรวม
                </td>
                <td className="right bold">
                  {saleScoreTotal.toFixed(2)}
                </td>
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
              <tr><td className="center">69 - 80</td><td className="center">1</td><td className="center">0.89</td><td className="center">10%</td></tr>
              <tr><td className="center">57 - 68</td><td className="center">2</td><td className="center">0.79</td><td className="center">20%</td></tr>
              <tr><td className="center">45 - 56</td><td className="center">3</td><td className="center">0.78</td><td className="center">30%</td></tr>
              <tr><td className="center">33 - 44</td><td className="center">4</td><td className="center">0.65</td><td className="center">35%</td></tr>
              <tr><td className="center">0 - 32</td><td className="center">5+</td><td className="center">0.53</td><td className="center">50%</td></tr>
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="final-card">
          <span>มูลค่าบังคับขายโดยประมาณ</span>
          <strong>{appraisalPrice.toLocaleString()} บาท</strong>
          <p>
            เป็นมูลค่าที่ประมาณในราคาที่สามารถขายได้ภายในเวลาจำกัด
          </p>
        </div>
      </div>
    </div>
  );
}
