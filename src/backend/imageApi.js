// export async function fetchImages() {
//   // รูปแบบข้อมูลจาก API ที่คาดหวัง
//   // [
//   //   { id: 1, imageUrl: "https://..." },
//   //   { id: 2, imageUrl: "https://..." }
//   // ]

//   const res = await fetch("https://your-api.com/images");
//   return res.json();
// }




export function fetchImages() {
  return Promise.resolve([
    {
      id: 1,
      imageUrl: "https://picsum.photos/800/500?random=1"
    },
    {
      id: 2,
      imageUrl: "https://picsum.photos/800/500?random=2"
    },
    {
      id: 3,
      imageUrl: "https://picsum.photos/800/500?random=3"
    }
  ]);
}
