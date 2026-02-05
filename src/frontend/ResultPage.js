import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/resultpage.css";


export default function ResultPage() {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const json = localStorage.getItem("mockResult");
    if (json) {
      const data = JSON.parse(json);
      if (String(data.id) === id) setResult(data);
    }
  }, [id]);

  if (!result) return <div className="loading">ไม่พบข้อมูล</div>;

  return (
    <div className="result-page">
      <h1>ผลลัพธ์การประมวลผล</h1>

      <div className="info-card">
        <p><b>ไฟล์:</b> {result.fileName}</p>
        <p><b>พิกัด:</b> {result.lat}, {result.lng}</p>
      </div>

      <h3>ข้อมูลที่สกัดจาก PDF</h3>

      <div className="result-card">
        <pre>{JSON.stringify(result.extractedData, null, 2)}</pre>
      </div>

      <button className="back" onClick={() => (window.location.href = "/")}>
        กลับหน้าแผนที่
      </button>
    </div>
  );
}
