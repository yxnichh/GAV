import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

export default function FlyToPosition({ position }) {
  const map = useMap();
  const firstRender = useRef(true);

  useEffect(() => {
    if (!map) return;

    if (firstRender.current) {
      firstRender.current = false;
      return; // ❌ ข้ามการบินครั้งแรก (กัน error ช่วง initial)
    }

    if (
      Array.isArray(position) &&
      position.length === 2 &&
      position.every((v) => typeof v === "number")
    ) {
      map.flyTo(position, 17, { duration: 1.2 });
    }
  }, [position, map]);

  return null;
}
