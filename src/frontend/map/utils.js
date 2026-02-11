// export function normalizeLand(land) {
//   return {
//     name: land?.name ?? "ไม่มีข้อมูล",
//     lat: land?.lat ?? null,
//     lon: land?.lon ?? null,
//     price: land?.price ?? "ไม่มีข้อมูล",
//     area: land?.area ?? "ไม่มีข้อมูล",
//     owner: land?.owner ?? "ไม่มีข้อมูล",
//     deed: land?.deed ?? "ไม่มีข้อมูล",
//   };
// }


export function normalizeLand(data) {
  return {
    docId: data.docId || null,   // ⭐ ต้องเพิ่มอันนี้ ไม่งั้นโหลด Firebase ไม่ได้
    name: data.name || "-",
    lat: Number(data.lat) || 0,
    lon: Number(data.lon) || 0,
    price: data.price || "-",
    area: data.area || "-",
    location: data.location || "-",
  };
}



export function distKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function calcArea(points) {
  let area = 0;

  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    area += x1 * y2 - x2 * y1;
  }

  return Math.abs(area) * 12365;
}
