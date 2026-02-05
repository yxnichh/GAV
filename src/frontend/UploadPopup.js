// UploadPopup.js
import React from "react";
import "../css/UploadPopup.css";

export default function UploadPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">

        <h2 className="popup-title">อัพโหลดไฟล์</h2>

        <div className="upload-area">
          <div className="upload-icon">☁️</div>
          <p className="upload-text">อัพโหลดไฟล์</p>
          <button className="select-btn">เลือกไฟล์</button>
        </div>

        {/* Progress Example */}
        <div className="file-progress">
          <div className="file-info">
            <span>my-cv.pdf</span>
            <span>Uploading...</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "50%" }}></div>
          </div>
        </div>

        {/* ปุ่มด้านล่าง */}
        <div className="popup-actions">
          <button className="close-btn" onClick={onClose}>ปิด</button>
          <button className="upload-btn">อัปโหลด</button>
        </div>

      </div>
    </div>
  );
}
