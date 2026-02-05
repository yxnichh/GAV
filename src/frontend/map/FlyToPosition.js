import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function FlyToPosition({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) map.flyTo(position, 17, { duration: 1.2 });
  }, [position, map]);

  return null;
}
