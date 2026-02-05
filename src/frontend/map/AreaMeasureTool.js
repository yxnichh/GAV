import { useMapEvents, Polyline, Polygon, Marker, Popup } from "react-leaflet";
import L from "leaflet";

/* ---------------- UTILS ---------------- */

// ระยะระหว่าง 2 จุด (เมตร)
function distanceMeters(a, b) {
  return L.latLng(a).distanceTo(L.latLng(b));
}

// ระยะรวม
function totalDistance(points) {
  let sum = 0;
  for (let i = 1; i < points.length; i++) {
    sum += distanceMeters(points[i - 1], points[i]);
  }
  return sum;
}

// คำนวณพื้นที่ polygon (ตร.ม.)
function polygonArea(points) {
  if (points.length < 3) return 0;

  const latlngs = points.map(p => L.latLng(p));
  let area = 0;

  for (let i = 0; i < latlngs.length; i++) {
    const p1 = latlngs[i];
    const p2 = latlngs[(i + 1) % latlngs.length];
    area += (p2.lng - p1.lng) *
      (2 + Math.sin(p1.lat * Math.PI / 180) +
        Math.sin(p2.lat * Math.PI / 180));
  }

  area = area * 6378137 * 6378137 / 2;
  return Math.abs(area);
}
export const measureIcon = L.divIcon({
  className: "measure-point",
  html: "●",
  iconSize: [10, 10],
});

/* ---------------- COMPONENT ---------------- */

export default function AreaMeasureTool({
  enabled,
  mode,           // "distance" | "area"
  points,
  setPoints
}) {
  useMapEvents({
    click(e) {
      if (!enabled) return;
      setPoints(prev => [...prev, [e.latlng.lat, e.latlng.lng]]);
    },
    dblclick() {
      if (!enabled) return;
    }
  });

  if (!enabled || points.length === 0) return null;

  const distance = totalDistance(points);
  const area = polygonArea(points);

  return (
    <>
      {/* LINE / POLYGON */}
      {mode === "distance" && (
        <Polyline positions={points} color="#00c853" />
      )}

      {mode === "area" && points.length >= 3 && (
        <Polygon positions={points} color="#ff3d00" />
      )}

      {/* POINTS */}
      {points.map((p, i) => (
        <Marker key={i} 
        position={p}
        icon={measureIcon}/>
      ))}

      {/* RESULT */}
      <Popup position={points[points.length - 1]}>
        {mode === "distance" && (
          <>
            <b>ระยะทาง</b><br />
            {distance.toFixed(1)} เมตร<br />
            {(distance / 1000).toFixed(2)} กม.
          </>
        )}

        {mode === "area" && points.length >= 3 && (
          <>
            <b>พื้นที่</b><br />
            {area.toFixed(0)} ตร.ม.<br />
            {(area / 1600).toFixed(2)} ไร่
          </>
        )}
      </Popup>
    </>
  );
}

