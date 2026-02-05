import { useState } from "react";
import "../css/searchbox.css";

export default function SearchBox({ onSearch }) {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const handleSearch = () => {
    if (!lat || !lng) return alert("กรุณากรอก Latitude และ Longitude");

    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

    if (isNaN(latNum) || isNaN(lngNum))
      return alert("กรุณากรอกค่าตำแหน่งที่ถูกต้อง");

    onSearch(latNum, lngNum);
  };

  return (
    <div className="search-box">
      <div className="search-field">
        <label>Latitude</label>
        <input type="text" value={lat} onChange={(e) => setLat(e.target.value)} />
      </div>

      <div className="search-field">
        <label>Longitude</label>
        <input type="text" value={lng} onChange={(e) => setLng(e.target.value)} />
      </div>

      <button className="search-btn" onClick={handleSearch}>
        ค้นหา
      </button>
    </div>
  );
}
