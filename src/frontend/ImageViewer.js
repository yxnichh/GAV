import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchImages } from "../backend/imageApi";
import TopTab from "./TopTab";
import { FaArrowLeft, FaChevronLeft, FaChevronRight, FaSearchPlus } from "react-icons/fa";
import "../css/ImageViewer.css";

export default function ImageViewer() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const currentPos = state?.currentPos;

  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchImages().then(setImages);
  }, []);

  if (images.length === 0) {
    return <div className="loading">กำลังโหลดรูปภาพ...</div>;
  }

  return (
    <div className="image-page">
      <TopTab page="map" setPage={(p) => navigate("/", { state: { page: p } })} />

      <div className="image-container">
        {/* Header */}
        <div className="image-header">
          <button
  className="back-btn"
  onClick={() =>
    navigate("/", {
      state: {
        page: "map",
        land: state?.land,
        currentPos: state?.currentPos,
        openPopup: true,
        openDetail: true
      }
    })
  }
>
  <FaArrowLeft />
  <span>กลับ</span>
</button>


          <h1>ภาพประกอบทรัพย์สิน</h1>
        </div>

        {/* Image Card */}
        <div className="image-card">
          <img
            src={images[index].imageUrl}
            alt=""
            onClick={() => setOpen(true)}
          />

          <div className="zoom-hint">
            <FaSearchPlus /> คลิกเพื่อขยาย
          </div>
        </div>

        {/* Controls */}
        <div className="image-controls">
          <button onClick={() => setIndex(i => i === 0 ? images.length - 1 : i - 1)}>
            <FaChevronLeft /> ก่อนหน้า
          </button>

          <span>{index + 1} / {images.length}</span>

          <button onClick={() => setIndex(i => (i + 1) % images.length)}>
            ถัดไป <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Fullscreen */}
      {open && (
        <div className="image-modal" onClick={() => setOpen(false)}>
          <img src={images[index].imageUrl} alt="" />
        </div>
      )}
    </div>
  );
}
