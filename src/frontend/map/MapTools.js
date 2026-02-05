import React, { useRef, useEffect } from "react";
import {
  FaLayerGroup,
  FaLocationArrow,
  FaPlus,
  FaMinus,
  FaRulerCombined
} from "react-icons/fa";

export default function MapTools({
  map,
  mapType,
  setMapType,

  // ⭐ LAYER MENU
  showLayerMenu,
  setShowLayerMenu,
  closingLayer,
  setClosingLayer,

  // ⭐ MEASURE MENU
  showMeasureMenu,
  setShowMeasureMenu,
  closingMeasure,
  setClosingMeasure,

  locateMe,

  // ⭐ MEASURE TOOL
  setAreaMode,
  setAreaPoints,
  setMeasureMode
}) {
  const layerPopupRef = useRef(null);
  const layerBtnRef = useRef(null);

  const measurePopupRef = useRef(null);
  const measureBtnRef = useRef(null);

  /* ---------------- CLOSE LAYER POPUP ---------------- */
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        showLayerMenu &&
        layerPopupRef.current &&
        !layerPopupRef.current.contains(e.target) &&
        !layerBtnRef.current.contains(e.target)
      ) {
        setClosingLayer(true);
        setTimeout(() => {
          setShowLayerMenu(false);
          setClosingLayer(false);
        }, 200);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLayerMenu]);

  /* ---------------- CLOSE MEASURE POPUP ---------------- */
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        showMeasureMenu &&
        measurePopupRef.current &&
        !measurePopupRef.current.contains(e.target) &&
        !measureBtnRef.current.contains(e.target)
      ) {
        setClosingMeasure(true);
        setTimeout(() => {
          setShowMeasureMenu(false);
          setClosingMeasure(false);
        }, 200);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMeasureMenu]);

  return (
    <>
      {/* ================= MEASURE ================= */}
      <div
        ref={measureBtnRef}
        className="measure-button"
        onClick={() => setShowMeasureMenu(v => !v)}
        title="เครื่องมือวัด"
      >
        <FaRulerCombined className="layer-icon" />
      </div>

      {showMeasureMenu && (
        <div
          ref={measurePopupRef}
          className={`layer-popup-modern ${
            closingMeasure ? "closing" : "animated"
          }`}
        >
          <div
            className="layer-item"
            onClick={() => {
              setAreaMode(true);
              setAreaPoints([]);
              setMeasureMode("distance");
              setShowMeasureMenu(false);
            }}
          >
            📏 วัดระยะทาง
          </div>

          <div
            className="layer-item"
            onClick={() => {
              setAreaMode(true);
              setAreaPoints([]);
              setMeasureMode("area");
              setShowMeasureMenu(false);
            }}
          >
            🔲 วัดพื้นที่
          </div>

          <div
            className="layer-item danger"
            onClick={() => {
              setAreaMode(false);
              setAreaPoints([]);
              setMeasureMode(null);
              setShowMeasureMenu(false);
            }}
          >
            ล้างค่า
          </div>
        </div>
      )}

      {/* ================= LAYER ================= */}
      <div
        ref={layerBtnRef}
        className="layer-button"
        onClick={() => setShowLayerMenu(v => !v)}
      >
        <FaLayerGroup className="layer-icon" />
      </div>

      {showLayerMenu && (
        <div
          ref={layerPopupRef}
          className={`layer-popup-modern ${
            closingLayer ? "closing" : "animated"
          }`}
        >
          <div
            className="layer-item"
            onClick={() => {
              setMapType("normal");
              setShowLayerMenu(false);
            }}
          >
            <span className={mapType === "normal" ? "active" : ""}>
              แผนที่ปกติ (OSM)
            </span>
          </div>

          <div
            className="layer-item"
            onClick={() => {
              setMapType("google");
              setShowLayerMenu(false);
            }}
          >
            <span className={mapType === "google" ? "active" : ""}>
              Google Hybrid
            </span>
          </div>
        </div>
      )}

      {/* ================= LOCATION ================= */}
      <div className="location-button" onClick={locateMe}>
        <FaLocationArrow className="layer-icon" />
      </div>

      {/* ================= ZOOM ================= */}
      <div className="zoom-in-button" onClick={() => map?.zoomIn()}>
        <FaPlus />
      </div>
      <div className="zoom-out-button" onClick={() => map?.zoomOut()}>
        <FaMinus />
      </div>
    </>
  );
}
