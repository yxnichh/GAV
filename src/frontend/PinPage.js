import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../css/pinpage.css";
import UploadPopup from "./UploadPin";
import SearchBox from "./SearchBox";
import { FaFolderOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PinPage() {
  const [markerPos, setMarkerPos] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  /* ⭐ Icon หมุด */
  const markerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  /* ⭐ คลิกเพื่อปักหมุด */
  function AddMarkerOnClick() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkerPos({ lat, lng });
        setShowPopup(false);
      },
    });
    return null;
  }

  /* ⭐ กล้องเลื่อนไป */
  function FlyToLocation({ lat, lng }) {
    const map = useMap();
    map.flyTo([lat, lng], 16, { duration: 1 });
    return null;
  }

  return (
    <div className="map-page">

      {/* ⭐ ช่องค้นหา */}
      <SearchBox
        onSearch={(lat, lng) => {
          setMarkerPos({ lat, lng });
          setShowPopup(false);
        }}
      />

      {/* ⭐ ปุ่มดูประวัติ */}
      <div className="history-btn-pin" onClick={() => navigate("/history")}>
        <FaFolderOpen size={20} color="#fff" />
      </div>

      <MapContainer center={[13.736, 100.523]} zoom={13} className="map-box">
        <TileLayer url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" maxZoom={20} />

        {markerPos && <FlyToLocation lat={markerPos.lat} lng={markerPos.lng} />}

        {markerPos && (
          <Marker
            position={[markerPos.lat, markerPos.lng]}
            icon={markerIcon}
            eventHandlers={{
              click: () => setShowPopup(true),
            }}
          />
        )}

        <AddMarkerOnClick />
      </MapContainer>

      {/* ⭐ Popup Upload */}
      {showPopup && markerPos && (
        <UploadPopup
          lat={markerPos.lat}
          lng={markerPos.lng}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
