import { useMapEvents } from "react-leaflet";

export default function ClickToMark({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}
