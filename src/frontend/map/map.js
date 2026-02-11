// // import React, { useState, useRef } from "react";
// // import {
// //   MapContainer,
// //   TileLayer,
// //   Marker,
// //   Popup
// // } from "react-leaflet";
// // import {
// //   FaLocationArrow,
// //   FaMoneyBillWave,
// //   FaVectorSquare,
// //   FaUser,
// //   FaFileAlt
// // } from "react-icons/fa";

// // import "leaflet/dist/leaflet.css";
// // import "../../css/map.css";

// // import MapTools from "./MapTools";
// // import ClickToMark from "./ClickToMark";
// // import FlyToPosition from "./FlyToPosition";
// // import { mainIcon, nearbyIcon } from "./iconConfig";
// // import { normalizeLand, distKm } from "./utils";
// // import AreaMeasureTool from "./AreaMeasureTool";
// // import LandDetailPanel from "./LandDetailPanel";

// // export default function MapPage() {

// //   /* ---------------- STATE ---------------- */
// //   const [position] = useState([15.87, 100.99]);
// //   const [currentPos, setCurrentPos] = useState(null);
// //   const [selectedLand, setSelectedLand] = useState(null);
// //   const [nearbyLands, setNearbyLands] = useState([]);

// //   const [showDetail, setShowDetail] = useState(false);

// //   const [mapType, setMapType] = useState("normal");
// //   const [showLayerMenu, setShowLayerMenu] = useState(false);
// //   const [closingLayer, setClosingLayer] = useState(false);

// //   const [searchLat, setSearchLat] = useState("");
// //   const [searchLon, setSearchLon] = useState("");

// //   const [areaMode, setAreaMode] = useState(false);
// //   const [areaPoints, setAreaPoints] = useState([]);
// //   const [measureMode, setMeasureMode] = useState("distance");
// //   // ⭐ MEASURE MENU
// //   const [showMeasureMenu, setShowMeasureMenu] = useState(false);
// //   const [closingMeasure, setClosingMeasure] = useState(false);

// //   const [searchMarker, setSearchMarker] = useState(null);
// //   const [clickedLand, setClickedLand] = useState(null);




// //   const mapRef = useRef(null);

// //   /* ---------------- MOCK DATABASE ---------------- */
// //   const mockDatabase = [
// //     {
// //       id: 1,
// //       name: "GAV-XXX-000-000",
// //       lat: 15,
// //       lon: 100,
// //       price: "1,200,000 บาท",
// //       area: "1 ไร่",

// //     },
// //     {
// //       id: 2,
// //       name: "GAV-XXX-000-000",
// //       lat: 15.869,
// //       lon: 100.991,
// //       price: "890,000 บาท",
// //       area: "2 งาน",

// //     },
// //   ];

// //   /* ---------------- FIND NEARBY LANDS ---------------- */
// //   function findNearbyLands(pos) {
// //     const [lat, lon] = pos;
// //     const list = mockDatabase.filter(
// //       (d) => distKm(lat, lon, d.lat, d.lon) <= 2
// //     );
// //     setNearbyLands(list);
// //   }

// //   /* ---------------- SEARCH BY LAT/LON ---------------- */
// //   function handleSearch() {
// //     if (!searchLat || !searchLon) {
// //       alert("กรุณากรอก Latitude และ Longitude");
// //       return;
// //     }

// //     const lat = parseFloat(searchLat);
// //     const lon = parseFloat(searchLon);

// //     if (isNaN(lat) || isNaN(lon)) {
// //       alert("Lat/Lon ต้องเป็นตัวเลข");
// //       return;
// //     }

// //     const pos = [lat, lon];
// //     setCurrentPos(pos);

// //     const found = mockDatabase.find(
// //       (d) => Number(d.lat) === lat && Number(d.lon) === lon
// //     );

// //     if (found) {
// //       setSelectedLand(normalizeLand(found));
// //       setShowDetail(false);
// //       return;
// //     }

// //     setSelectedLand({
// //       name: "ไม่พบข้อมูลที่ดิน",
// //       lat,
// //       lon,
// //       price: "-",
// //       area: "-",

// //     });
// //     setSelectedLand(null);
// //     setShowDetail(false);
// //   }

// //   /* ---------------- MY LOCATION ---------------- */
// //   const locateMe = () => {
// //     navigator.geolocation.getCurrentPosition(
// //       (pos) => {
// //         const p = [pos.coords.latitude, pos.coords.longitude];
// //         setCurrentPos(p);

// //         setSelectedLand(
// //           normalizeLand({
// //             name: "ตำแหน่งปัจจุบัน",
// //             lat: p[0],
// //             lon: p[1],
// //           })
// //         );

// //         findNearbyLands(p);
// //         setShowDetail(false);
// //       },
// //       () => alert("ไม่สามารถใช้ GPS ได้")
// //     );
// //   };

// //   return (
// //     <div style={{ height: "calc(100vh - 64px)", width: "100%", position: "relative" }}>

// //       {/* ⭐ SEARCH BAR */}
// //       <div className="search-latlon-box">
// //         <input
// //           type="number"
// //           step="0.000001"
// //           placeholder="Latitude"
// //           value={searchLat}
// //           onChange={(e) => setSearchLat(e.target.value)}
// //         />
// //         <input
// //           type="number"
// //           step="0.000001"
// //           placeholder="Longitude"
// //           value={searchLon}
// //           onChange={(e) => setSearchLon(e.target.value)}
// //         />
// //         <button onClick={handleSearch}>ค้นหา</button>
// //       </div>

// //       <MapContainer
// //         center={position}
// //         zoom={14}
// //         style={{ height: "100%" }}
// //         whenCreated={(map) => (mapRef.current = map)}
// //       >

// //         {/* ⭐ MAP TYPE */}
// //         {mapType === "normal" ? (
// //           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
// //         ) : (
// //           <TileLayer url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" />
// //         )}

// //         {/* ⭐ AREA MEASURE TOOL */}
// //         <AreaMeasureTool
// //           enabled={areaMode}
// //           mode={measureMode}
// //           points={areaPoints}
// //           setPoints={setAreaPoints}
// //           setAreaMode={setAreaMode} 
// //         />


// //         {/* ⭐ CLICK TO PICK POSITION (ปิดเมื่อวัดพื้นที่) */}
// //         {!areaMode && (
// //           <ClickToMark
// //             onSelect={(pos) => {
// //               const land = normalizeLand({
// //                 name: "พิกัดที่เลือก",
// //                 lat: pos[0],
// //                 lon: pos[1],
// //               });

// //               setCurrentPos(pos);
// //               setClickedLand(land);   // ⭐ เก็บไว้ก่อน
// //               setSelectedLand(null);  // ❌ ยังไม่เปิด popup
// //               findNearbyLands(pos);
// //               setShowDetail(false);
// //             }}
// //           />
// //         )}

// //         <FlyToPosition position={currentPos} />

// //         {/* ⭐ MAIN MARKER */}
// //         {!areaMode && currentPos && (
// //           <Marker position={currentPos} icon={mainIcon} />
// //         )}
// //         {/* ⭐ CLICKED MAP MARKER */}
// //         {!areaMode && clickedLand && (
// //           <Marker
// //             position={[clickedLand.lat, clickedLand.lon]}
// //             icon={mainIcon}
// //             eventHandlers={{
// //               click: () => {
// //                 setSelectedLand(clickedLand); // 👉 คลิก marker ค่อยเปิดข้อมูล
// //                 setShowDetail(false);
// //               },
// //             }}
// //           />
// //         )}

// //         {/* ⭐ SEARCH RESULT MARKER */}
// //         {!areaMode && searchMarker && (
// //           <Marker
// //             position={[searchMarker.lat, searchMarker.lon]}
// //             icon={mainIcon}
// //             eventHandlers={{
// //               click: () => {
// //                 setSelectedLand(searchMarker); // 👉 คลิกแล้วค่อยเปิด popup
// //                 setShowDetail(false);
// //               },
// //             }}
// //           />
// //         )}

// //         {/* ⭐ NEARBY LANDS */}
// //         {!areaMode &&
// //           nearbyLands.map((item) => (
// //             <Marker
// //               key={item.id}
// //               position={[item.lat, item.lon]}
// //               icon={nearbyIcon}
// //               eventHandlers={{
// //                 click: () => {
// //                   setSelectedLand(normalizeLand(item));
// //                   setShowDetail(false);
// //                 },
// //               }}
// //             >
// //               <Popup>
// //                 <b>{item.name}</b><br />
// //                 ราคา: {item.price}<br />
// //                 พื้นที่: {item.area}<br />

// //               </Popup>
// //             </Marker>
// //           ))}

// //       </MapContainer>

// //       {/* ⭐ MAP TOOLS */}
// //       <MapTools
// //         map={mapRef.current}
// //         mapType={mapType}
// //         setMapType={setMapType}

// //         /* ⭐ LAYER MENU */
// //         showLayerMenu={showLayerMenu}
// //         setShowLayerMenu={setShowLayerMenu}
// //         closingLayer={closingLayer}
// //         setClosingLayer={setClosingLayer}

// //         /* ⭐ MEASURE MENU */
// //         showMeasureMenu={showMeasureMenu}
// //         setShowMeasureMenu={setShowMeasureMenu}
// //         closingMeasure={closingMeasure}
// //         setClosingMeasure={setClosingMeasure}

// //         locateMe={locateMe}

// //         /* ⭐ MEASURE TOOL */
// //         setAreaMode={setAreaMode}
// //         setAreaPoints={setAreaPoints}
// //         setMeasureMode={setMeasureMode}
// //       />

// //       {/* ⭐ POPUP PANEL */}
// //       {selectedLand && !showDetail && (
// //         <div className="land-popup-modern">
// //           <button className="popup-close" onClick={() => setSelectedLand(null)}>
// //             ✖
// //           </button>

// //           <div className="popup-header">
// //             <h3>{selectedLand.name}</h3>
// //           </div>

// //           <div className="popup-info">
// //             <div className="popup-row">
// //               <div className="popup-icon"><FaLocationArrow /></div>
// //               <span className="popup-label">Latitude</span>
// //               <span className="popup-value">{selectedLand.lat}</span>
// //             </div>

// //             <div className="popup-row">
// //               <div className="popup-icon"><FaLocationArrow /></div>
// //               <span className="popup-label">Longitude</span>
// //               <span className="popup-value">{selectedLand.lon}</span>
// //             </div>

// //             <div className="popup-row">
// //               <div className="popup-icon"><FaMoneyBillWave /></div>
// //               <span className="popup-label">ราคา</span>
// //               <span className="popup-value">{selectedLand.price}</span>
// //             </div>

// //             <div className="popup-row">
// //               <div className="popup-icon"><FaVectorSquare /></div>
// //               <span className="popup-label">พื้นที่</span>
// //               <span className="popup-value">{selectedLand.area}</span>
// //             </div>

// //             <div className="popup-row">
// //               <div className="popup-icon"><FaUser /></div>
// //               <span className="popup-label">ที่ตั้งทรัพย์สิน</span>
// //               <span className="popup-value">{selectedLand.owner}</span>
// //             </div>


// //           </div>

// //           <button className="popup-ai-btn" onClick={() => setShowDetail(true)}>
// //             ดูข้อมูลเชิงลึก
// //           </button>
// //         </div>
// //       )}

// //       {/* ⭐ DETAIL PANEL */}
// //       {showDetail && selectedLand && (
// //         <LandDetailPanel
// //           land={selectedLand}
// //           currentPos={currentPos}
// //           onClose={() => setShowDetail(false)}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// import React, { useState, useRef, useEffect } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup
// } from "react-leaflet";
// import {
//   FaLocationArrow,
//   FaMoneyBillWave,
//   FaVectorSquare
// } from "react-icons/fa";

// import "leaflet/dist/leaflet.css";
// import "../../css/map.css";

// import MapTools from "./MapTools";
// import ClickToMark from "./ClickToMark";
// import FlyToPosition from "./FlyToPosition";
// import { mainIcon, nearbyIcon } from "./iconConfig";
// import { normalizeLand, distKm } from "./utils";
// import AreaMeasureTool from "./AreaMeasureTool";
// import LandDetailPanel from "./LandDetailPanel";

// import { db } from "../../backend/firebaseConfig";
// import { collection, getDocs } from "firebase/firestore";

// export default function MapPage() {

//   /* ---------------- STATE ---------------- */
//   const [position] = useState([15.87, 100.99]);
//   const [currentPos, setCurrentPos] = useState(null);
//   const [selectedLand, setSelectedLand] = useState(null);
//   const [nearbyLands, setNearbyLands] = useState([]);

//   const [showDetail, setShowDetail] = useState(false);

//   const [mapType, setMapType] = useState("normal");
//   const [showLayerMenu, setShowLayerMenu] = useState(false);
//   const [closingLayer, setClosingLayer] = useState(false);

//   const [searchLat, setSearchLat] = useState("");
//   const [searchLon, setSearchLon] = useState("");

//   const [areaMode, setAreaMode] = useState(false);
//   const [areaPoints, setAreaPoints] = useState([]);
//   const [measureMode, setMeasureMode] = useState("distance");

//   const [showMeasureMenu, setShowMeasureMenu] = useState(false);
//   const [closingMeasure, setClosingMeasure] = useState(false);

//   const [searchMarker, setSearchMarker] = useState(null);
//   const [clickedLand, setClickedLand] = useState(null);

//   const [landDatabase, setLandDatabase] = useState([]);   // 🔥 Firestore data

//   const mapRef = useRef(null);

//   /* ---------------- LOAD FIRESTORE DATA ---------------- */
//   useEffect(() => {
//     async function loadData() {
//       const snap = await getDocs(collection(db, "lands"));
//       const lands = snap.docs.map((doc) => ({
//         docId: doc.id,
//         ...doc.data(),
//       }));

//       setLandDatabase(lands);
//     }
//     loadData();
//   }, []);

//   /* ---------------- FIND NEARBY LANDS ---------------- */
//   function findNearbyLands(pos) {
//     const [lat, lon] = pos;

//     const list = landDatabase.filter(
//       (d) => distKm(lat, lon, d.lat, d.lon) <= 5   // ⭐ เปลี่ยนเป็น 5km
//     );

//     setNearbyLands(list);
//   }


//   /* ---------------- SEARCH BY LAT/LON ---------------- */
//   function handleSearch() {
//     if (!searchLat || !searchLon) {
//       alert("กรุณากรอก Latitude และ Longitude");
//       return;
//     }

//     const lat = parseFloat(searchLat);
//     const lon = parseFloat(searchLon);

//     if (isNaN(lat) || isNaN(lon)) {
//       alert("Lat/Lon ต้องเป็นตัวเลข");
//       return;
//     }

//     const pos = [lat, lon];
//     setCurrentPos(pos);

//     const found = landDatabase.find(
//       (d) => Number(d.lat) === lat && Number(d.lon) === lon
//     );

//     if (found) {
//       setSelectedLand(normalizeLand(found));
//       setSearchMarker(found);
//       setShowDetail(false);
//       return;
//     }

//     setSelectedLand({
//       name: "ไม่พบข้อมูลที่ดิน",
//       lat,
//       lon,
//       price: "-",
//       area: "-",
//       location:"-"
//     });

//     setShowDetail(false);
//   }

//   /* ---------------- MY LOCATION ---------------- */
//   const locateMe = () => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const p = [pos.coords.latitude, pos.coords.longitude];
//         setCurrentPos(p);

//         setSelectedLand(
//           normalizeLand({
//             name: "ตำแหน่งปัจจุบัน",
//             lat: p[0],
//             lon: p[1],
//           })
//         );

//         findNearbyLands(p);
//         setShowDetail(false);
//       },
//       () => alert("ไม่สามารถใช้ GPS ได้")
//     );
//   };

//   return (
//     <div style={{ height: "calc(100vh - 64px)", width: "100%", position: "relative" }}>

//       {/* ⭐ SEARCH BAR */}
//       <div className="search-latlon-box">
//         <input
//           type="number"
//           step="0.000001"
//           placeholder="Latitude"
//           value={searchLat}
//           onChange={(e) => setSearchLat(e.target.value)}
//         />
//         <input
//           type="number"
//           step="0.000001"
//           placeholder="Longitude"
//           value={searchLon}
//           onChange={(e) => setSearchLon(e.target.value)}
//         />
//         <button onClick={handleSearch}>ค้นหา</button>
//       </div>

//       <MapContainer
//         center={position}
//         zoom={14}
//         style={{ height: "100%" }}
//         whenCreated={(map) => (mapRef.current = map)}
//       >

//         {/* ⭐ MAP TYPE */}
//         {mapType === "normal" ? (
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         ) : (
//           <TileLayer url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" />
//         )}

//         {/* ⭐ AREA MEASURE TOOL */}
//         <AreaMeasureTool
//           enabled={areaMode}
//           mode={measureMode}
//           points={areaPoints}
//           setPoints={setAreaPoints}
//           setAreaMode={setAreaMode}
//         />

//         {/* ⭐ CLICK TO PICK POSITION */}
//         {!areaMode && (
//           <ClickToMark
//             onSelect={(pos) => {
//               const land = normalizeLand({
//                 name: "พิกัดที่เลือก",
//                 lat: pos[0],
//                 lon: pos[1],
//               });

//               setCurrentPos(pos);
//               setClickedLand(land);
//               setSelectedLand(null);
//               findNearbyLands(pos);
//               setShowDetail(false);
//             }}
//           />
//         )}

//         <FlyToPosition position={currentPos} />

//         {/* ⭐ MAIN MARKER */}
//         {!areaMode && currentPos && (
//           <Marker position={currentPos} icon={mainIcon} />
//         )}

//         {/* ⭐ CLICKED MAP MARKER */}
//         {!areaMode && clickedLand && (
//           <Marker
//             position={[clickedLand.lat, clickedLand.lon]}
//             icon={mainIcon}
//             eventHandlers={{
//               click: () => {
//                 setSelectedLand(clickedLand);
//                 setShowDetail(false);
//               },
//             }}
//           />
//         )}

//         {/* ⭐ SEARCH RESULT MARKER */}
//         {!areaMode && searchMarker && (
//           <Marker
//             position={[searchMarker.lat, searchMarker.lon]}
//             icon={mainIcon}
//             eventHandlers={{
//               click: () => {
//                 setSelectedLand(searchMarker);
//                 setShowDetail(false);
//               },
//             }}
//           />
//         )}

//         {/* ⭐ NEARBY LANDS (FIREBASE DATA) */}
//         {!areaMode &&
//           nearbyLands.map((item) => (
//             <Marker
//               key={item.docId}
//               position={[item.lat, item.lon]}
//               icon={nearbyIcon}
//               eventHandlers={{
//                 click: () => {
//                   setSelectedLand(normalizeLand(item));
//                   setShowDetail(false);
//                 },
//               }}
//             >
//               <Popup>
//                 <b>{item.name}</b><br />
//                 ราคา: {item.price}<br />
//                 พื้นที่: {item.area}<br />
//               </Popup>
//             </Marker>
//           ))}

//       </MapContainer>

//       {/* ⭐ MAP TOOLS */}
//       <MapTools
//         map={mapRef.current}
//         mapType={mapType}
//         setMapType={setMapType}
//         showLayerMenu={showLayerMenu}
//         setShowLayerMenu={setShowLayerMenu}
//         closingLayer={closingLayer}
//         setClosingLayer={setClosingLayer}
//         showMeasureMenu={showMeasureMenu}
//         setShowMeasureMenu={setShowMeasureMenu}
//         closingMeasure={closingMeasure}
//         setClosingMeasure={setClosingMeasure}
//         locateMe={locateMe}
//         setAreaMode={setAreaMode}
//         setAreaPoints={setAreaPoints}
//         setMeasureMode={setMeasureMode}
//       />

//       {/* ⭐ POPUP PANEL */}
//       {selectedLand && !showDetail && (
//         <div className="land-popup-modern">
//           <button className="popup-close" onClick={() => setSelectedLand(null)}>
//             ✖
//           </button>

//           <div className="popup-header">
//             <h3>{selectedLand.name}</h3>
//           </div>

//           <div className="popup-info">
//             <div className="popup-row">
//               <div className="popup-icon"><FaLocationArrow /></div>
//               <span className="popup-label">Latitude</span>
//               <span className="popup-value">{selectedLand.lat}</span>
//             </div>

//             <div className="popup-row">
//               <div className="popup-icon"><FaLocationArrow /></div>
//               <span className="popup-label">Longitude</span>
//               <span className="popup-value">{selectedLand.lon}</span>
//             </div>

//             <div className="popup-row">
//               <div className="popup-icon"><FaMoneyBillWave /></div>
//               <span className="popup-label">ราคา</span>
//               <span className="popup-value">{selectedLand.price}</span>
//             </div>

//             <div className="popup-row">
//               <div className="popup-icon"><FaVectorSquare /></div>
//               <span className="popup-label">พื้นที่</span>
//               <span className="popup-value">{selectedLand.area}</span>
//             </div>

//                         <div className="popup-row">
//               <div className="popup-icon"><FaVectorSquare /></div>
//               <span className="popup-label">ที่ตั้งทรัพย์สิน</span>
//               <span className="popup-value">{selectedLand.location}</span>
//             </div>
//           </div>

//           <button className="popup-ai-btn" onClick={() => setShowDetail(true)}>
//             ดูข้อมูลเชิงลึก
//           </button>
//         </div>
//       )}

//       {/* ⭐ DETAIL PANEL */}
//       {showDetail && selectedLand && (
//         <LandDetailPanel
//           land={selectedLand}
//           currentPos={currentPos}
//           onClose={() => setShowDetail(false)}
//         />
//       )}

//     </div>
//   );
// }



import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";
import {
  FaLocationArrow,
  FaMoneyBillWave,
  FaVectorSquare
} from "react-icons/fa";

import "leaflet/dist/leaflet.css";
import "../../css/map.css";

import MapTools from "./MapTools";
import ClickToMark from "./ClickToMark";
import FlyToPosition from "./FlyToPosition";
import { mainIcon, nearbyIcon } from "./iconConfig";
import { normalizeLand, distKm } from "./utils";
import AreaMeasureTool from "./AreaMeasureTool";
import LandDetailPanel from "./LandDetailPanel";

import { db } from "../../backend/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function MapPage() {

  /* ---------------- STATE ---------------- */
  const [position] = useState([15.87, 100.99]);
  const [currentPos, setCurrentPos] = useState(null);
  const [selectedLand, setSelectedLand] = useState(null);
  const [nearbyLands, setNearbyLands] = useState([]);
  const [landDatabase, setLandDatabase] = useState([]);

  const [showDetail, setShowDetail] = useState(false);

  const [mapType, setMapType] = useState("normal");
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [closingLayer, setClosingLayer] = useState(false);

  const [searchLat, setSearchLat] = useState("");
  const [searchLon, setSearchLon] = useState("");

  const [areaMode, setAreaMode] = useState(false);
  const [areaPoints, setAreaPoints] = useState([]);
  const [measureMode, setMeasureMode] = useState("distance");

  const [showMeasureMenu, setShowMeasureMenu] = useState(false);
  const [closingMeasure, setClosingMeasure] = useState(false);

  const [searchMarker, setSearchMarker] = useState(null);
  const [clickedLand, setClickedLand] = useState(null);

  const mapRef = useRef(null);

  /* ---------------- LOAD FIRESTORE DATA ---------------- */
  useEffect(() => {
    async function loadData() {
      const snap = await getDocs(collection(db, "lands"));
      const lands = snap.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));

      setLandDatabase(lands);
      console.log("🔥 Firestore Loaded:", lands);
    }

    loadData();
  }, []);

  /* ---------------- FIND NEARBY LANDS ---------------- */
  function findNearbyLands(pos) {
    const [lat, lon] = pos;

    const list = landDatabase.filter(
      (d) => distKm(lat, lon, Number(d.lat), Number(d.lon)) <= 5
    );

    setNearbyLands(list);
  }

  /* ---------------- SEARCH BY LAT/LON ---------------- */
  function handleSearch() {
    if (!searchLat || !searchLon) {
      alert("กรุณากรอก Latitude และ Longitude");
      return;
    }

    const lat = parseFloat(searchLat);
    const lon = parseFloat(searchLon);

    const pos = [lat, lon];
    setCurrentPos(pos);

    const found = landDatabase.find(
      (d) => Number(d.lat) === lat && Number(d.lon) === lon
    );

    if (found) {
      setSelectedLand({
        ...normalizeLand(found),
        docId: found.docId,
      });

      setSearchMarker(found);
      setShowDetail(false);
      return;
    }

    setSelectedLand({
      docId: null,
      name: "ไม่พบข้อมูลที่ดิน",
      lat,
      lon,
      price: "-",
      area: "-",
      location: "-"
    });
  }

  /* ---------------- MY LOCATION ---------------- */
  const locateMe = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const p = [pos.coords.latitude, pos.coords.longitude];
        setCurrentPos(p);

        setSelectedLand({
          ...normalizeLand({
            name: "ตำแหน่งปัจจุบัน",
            lat: p[0],
            lon: p[1],
            price: "-",
            area: "-",
            location: "-"
          }),
          docId: null
        });

        findNearbyLands(p);
        setShowDetail(false);
      },
      () => alert("ไม่สามารถใช้ GPS ได้")
    );
  };

  return (
    <div style={{ height: "calc(100vh - 64px)", width: "100%", position: "relative" }}>

      {/* ⭐ SEARCH BAR */}
      <div className="search-latlon-box">
        <input
          type="number"
          step="0.000001"
          placeholder="Latitude"
          value={searchLat}
          onChange={(e) => setSearchLat(e.target.value)}
        />
        <input
          type="number"
          step="0.000001"
          placeholder="Longitude"
          value={searchLon}
          onChange={(e) => setSearchLon(e.target.value)}
        />
        <button onClick={handleSearch}>ค้นหา</button>
      </div>

      <MapContainer
        center={position}
        zoom={14}
        style={{ height: "100%" }}
        whenCreated={(map) => (mapRef.current = map)}
      >

        {/* ⭐ MAP TYPE */}
        {mapType === "normal" ? (
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        ) : (
          <TileLayer url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" />
        )}

        {/* ⭐ AREA MEASURE TOOL */}
        <AreaMeasureTool
          enabled={areaMode}
          mode={measureMode}
          points={areaPoints}
          setPoints={setAreaPoints}
          setAreaMode={setAreaMode}
        />

        {/* ⭐ CLICK-TO-PIN */}
        {!areaMode && (
          <ClickToMark
            onSelect={(pos) => {
              const land = {
                ...normalizeLand({
                  name: "พิกัดที่เลือก",
                  lat: pos[0],
                  lon: pos[1],
                  price: "-",
                  area: "-",
                  location: "-"
                }),
                docId: null
              };

              setCurrentPos(pos);
              setClickedLand(land);
              setSelectedLand(null);
              findNearbyLands(pos);
              setShowDetail(false);
            }}
          />
        )}

        <FlyToPosition position={currentPos} />

        {/* ⭐ MAIN MARKER */}
        {!areaMode && currentPos && (
          <Marker position={currentPos} icon={mainIcon} />
        )}

        {/* ⭐ CLICKED MARKER */}
        {!areaMode && clickedLand && (
          <Marker
            position={[clickedLand.lat, clickedLand.lon]}
            icon={mainIcon}
            eventHandlers={{
              click: () => {
                setSelectedLand(clickedLand);
                setShowDetail(false);
              },
            }}
          />
        )}

        {/* ⭐ SEARCH RESULT MARKER */}
        {!areaMode && searchMarker && (
          <Marker
            position={[searchMarker.lat, searchMarker.lon]}
            icon={mainIcon}
            eventHandlers={{
              click: () => {
                setSelectedLand({
                  ...normalizeLand(searchMarker),
                  docId: searchMarker.docId,
                });
                setShowDetail(false);
              },
            }}
          />
        )}

        {/* ⭐ NEARBY LANDS */}
        {!areaMode &&
          nearbyLands.map((item) => (
            <Marker
              key={item.docId}
              position={[item.lat, item.lon]}
              icon={nearbyIcon}
              eventHandlers={{
                click: () => {
                  setSelectedLand({
                    ...normalizeLand(item),
                    docId: item.docId,
                  });
                  setShowDetail(false);
                },
              }}
            >
              <Popup>
                <b>{item.name}</b><br />
                ราคา: {item.price}<br />
                พื้นที่: {item.area}<br />
              </Popup>
            </Marker>
          ))}

      </MapContainer>

      {/* ⭐ MAP TOOLS */}
      <MapTools
        map={mapRef.current}
        mapType={mapType}
        setMapType={setMapType}
        showLayerMenu={showLayerMenu}
        setShowLayerMenu={setShowLayerMenu}
        closingLayer={closingLayer}
        setClosingLayer={setClosingLayer}
        showMeasureMenu={showMeasureMenu}
        setShowMeasureMenu={setShowMeasureMenu}
        closingMeasure={closingMeasure}
        setClosingMeasure={setClosingMeasure}
        locateMe={locateMe}
        setAreaMode={setAreaMode}
        setAreaPoints={setAreaPoints}
        setMeasureMode={setMeasureMode}
      />

      {/* ⭐ POPUP PANEL */}
      {selectedLand && !showDetail && (
        <div className="land-popup-modern">
          <button className="popup-close" onClick={() => setSelectedLand(null)}>
            ✖
          </button>

          <div className="popup-header">
            <h3>{selectedLand.name}</h3>
          </div>

          <div className="popup-info">
            <div className="popup-row">
              <div className="popup-icon"><FaLocationArrow /></div>
              <span className="popup-label">Latitude</span>
              <span className="popup-value">{selectedLand.lat}</span>
            </div>

            <div className="popup-row">
              <div className="popup-icon"><FaLocationArrow /></div>
              <span className="popup-label">Longitude</span>
              <span className="popup-value">{selectedLand.lon}</span>
            </div>

            <div className="popup-row">
              <div className="popup-icon"><FaMoneyBillWave /></div>
              <span className="popup-label">ราคา</span>
              <span className="popup-value">{selectedLand.price}</span>
            </div>

            <div className="popup-row">
              <div className="popup-icon"><FaVectorSquare /></div>
              <span className="popup-label">พื้นที่</span>
              <span className="popup-value">{selectedLand.area}</span>
            </div>

            <div className="popup-row">
              <div className="popup-icon"><FaVectorSquare /></div>
              <span className="popup-label">ที่ตั้งทรัพย์สิน</span>
              <span className="popup-value">{selectedLand.location}</span>
            </div>
          </div>

          <button className="popup-ai-btn" onClick={() => setShowDetail(true)}>
            ดูข้อมูลเชิงลึก
          </button>
        </div>
      )}

      {/* ⭐ DETAIL PANEL */}
      {showDetail && selectedLand && (
        <LandDetailPanel
          land={selectedLand}
          currentPos={currentPos}
          onClose={() => setShowDetail(false)}
        />
      )}

    </div>
  );
}
