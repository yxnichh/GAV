import "../css/uploadpin.css";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function UploadPopup({ lat, lng, onClose }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  function handleFileUpload(e) {
    const uploaded = e.target.files[0];
    if (!uploaded) return;

    setFile(uploaded);
    setProgress(0);

    let percent = 0;
    const timer = setInterval(() => {
      percent += 8;
      setProgress(percent);
      if (percent >= 100) clearInterval(timer);
    }, 80);
  }

  function handleSubmit() {
    if (!file) {
      alert("กรุณาเลือกไฟล์ก่อน");
      return;
    }

    alert(
      `อัปโหลดสำเร็จ!\nLat: ${lat}\nLng: ${lng}\nไฟล์: ${file.name}`
    );
    onClose();
  }

  return (
    <div className="popup-bg">
      <div className="popup-card">

        {/* Header */}
        <div className="popup-header">
          <div className="icon-circle">
            <FaCloudUploadAlt size={26} />
          </div>
          <div>
            <h2>อัปโหลดไฟล์</h2>
            <p className="subtitle">แนบเอกสารตามพิกัดที่เลือก</p>
          </div>
        </div>

        {/* Coordinates */}
        <div className="coord-box">
          <div>
            <span>Latitude</span>
            <strong>{lat}</strong>
          </div>
          <div>
            <span>Longitude</span>
            <strong>{lng}</strong>
          </div>
        </div>

        {/* Upload */}
        <div className="upload-box">
          <label className="upload-btn">
            <FaCloudUploadAlt size={22} />
            <span>คลิกเพื่อเลือกไฟล์ PDF</span>
            <input type="file" accept="application/pdf" onChange={handleFileUpload} />
          </label>

          {file && (
            <div className="file-preview">
              <div className="file-row">
                <span className="file-name">{file.name}</span>
                <span className="file-size">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </div>

              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="file-status">
                {progress < 100 ? "Uploading..." : "Completed ✓"}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="popup-actions">
          <button className="cancel-btn" onClick={onClose}>
            ยกเลิก
          </button>
          <button className="upload-btn-submit" onClick={handleSubmit}>
            อัปโหลดไฟล์
          </button>
        </div>

      </div>
    </div>
  );
}
