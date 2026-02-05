import { useEffect, useState } from "react";
import { fetchAssetSummary } from "./assetService";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/AssetSummary.css";
import TopTab from "./TopTab";
import { FaArrowLeft } from "react-icons/fa";

export default function AssetSummary() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const currentPos = state?.currentPos;

  useEffect(() => {
    fetchAssetSummary().then(setData);
  }, []);

  if (!data) return <div className="loading">กำลังโหลดข้อมูล...</div>;

  return (
    <div className="asset-page">
      <TopTab page="map" setPage={(p) => navigate("/", { state: { page: p } })} />

      <div className="asset-container">
        {/* Header */}
        <div className="asset-header">
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
            <FaArrowLeft /> กลับไปแผนที่
          </button>

          <h1>สรุปผลการประเมินมูลค่าทรัพย์สิน</h1>
        </div>

        {/* 💰 Highlight */}
        <div className="value-grid">
          <div className="value-card primary">
            <span>มูลค่าตลาด</span>
            <strong>{data.marketValue || "-"} บาท</strong>
          </div>

          <div className="value-card">
            <span>มูลค่าประเมิน</span>
            <strong>{data.appraisalValue || "-"} บาท</strong>
          </div>

          <div className="value-card">
            <span>มูลค่าบังคับขาย (70%)</span>
            <strong>{data.forcedSale70 || "-"} บาท</strong>
          </div>

          <div className="value-card">
            <span>มูลค่าหลักประกัน</span>
            <strong>{data.collateralValue || "-"} บาท</strong>
          </div>
        </div>

        {/* 📄 Detail */}
        <div className="info-card">
          <h2>ข้อมูลทรัพย์สิน</h2>
          <div className="info-grid">
            <Info label="ชื่อลูกค้า" value={data.customerName} />
            <Info label="ประเภทสินทรัพย์" value={data.assetType} />
            <Info label="ที่ตั้งทรัพย์สิน" value={data.location} />
            <Info label="เอกสารสิทธิ์ที่ดิน" value={data.landDoc} />
            <Info label="ทะเบียนอาคารชุด" value={data.buildingReg} />
            <Info label="ชื่ออาคารชุด" value={data.buildingName} />
            <Info label="ผู้ถือกรรมสิทธิ์" value={data.owner} />
            <Info label="อาคารสิ่งปลูกสร้าง" value={data.buildingType} />
            <Info label="ใบอนุญาตก่อสร้าง" value={data.permit} />
            <Info label="ภาระผูกพัน" value={data.encumbrance} />
            <Info label="สิทธิการใช้ทางเข้า" value={data.access} />
            <Info label="วัตถุประสงค์การประเมิน" value={data.objective} />
            <Info label="หลักเกณฑ์การประเมิน" value={data.method} />
            <Info label="วันที่สำรวจ" value={data.date} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="info-item">
      <span>{label}</span>
      <p>{value || "-"}</p>
    </div>
  );
}
