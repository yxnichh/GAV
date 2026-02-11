import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/WQS.css";
import TopTab from "./TopTab";

export default function WQS() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const currentPos = state?.currentPos;
    const [data, setData] = useState(null);

    useEffect(() => {
        async function load() {
            const mock = {
                landSize: { target: "10,817.0", c1: "7,198.6", c2: "17,236.7", c3: "9,783.9" },
                landPrice: { target: "-", c1: "15,000", c2: "13,750", c3: "12,500" },
                developScore: {
                    factor: [
                        { name: "ทำเลที่ตั้ง / ด้านหน้าที่ดิน", weight: "15%", target: 7, c1: 7, c2: 7, c3: 6 },
                        { name: "สภาพแวดล้อม", weight: "10%", target: 6, c1: 6, c2: 7, c3: 7 },
                        { name: "ขนาดเนื้อที่ดิน", weight: "10%", target: 7, c1: 9, c2: 6, c3: 7 },
                        { name: "หน้ากว้าง", weight: "10%", target: 7, c1: 6, c2: 7, c3: 6 },
                        { name: "การพัฒนาถมดิน", weight: "10%", target: 7, c1: 7, c2: 7, c3: 7 },
                        { name: "รูปร่างที่ดิน", weight: "10%", target: 7, c1: 7, c2: 7, c3: 6 },
                        { name: "ถนนผ่านหน้า", weight: "15%", target: 8, c1: 8, c2: 8, c3: 7 },
                        { name: "สาธารณูปโภค", weight: "10%", target: 6, c1: 6, c2: 6, c3: 6 },
                        { name: "ข้อจำกัดด้านกฎหมาย", weight: "5%", target: 6, c1: 6, c2: 7, c3: 6 },
                        { name: "การใช้ประโยชน์สูงสุด", weight: "5%", target: 6, c1: 6, c2: 6, c3: 6 }
                    ],
                    sum: { target: 685, c1: 705, c2: 685, c3: 655 }
                },
                summary: {
                    comparedPercent: ["0.00%", "-2.84%", "0.00%", "4.58%"],
                    wqsPrice: ["13,117", "12,375", "10,458"],
                    adjustFactor: ["30.00%", "50.00%", "20.00%"],
                    finalPrice: ["12,214", "3,935", "6,188", "2,092"],
                    estimate: "12,000",
                    rsq: "99.22%"
                }
            };
            setData(mock);
        }

        load();
    }, []);

    if (!data) return <p className="loading">กำลังโหลด...</p>;

    return (
        <div className="wqs-page">

            {/* Header */}
            <TopTab
                page="map"
                setPage={(p) => navigate("/", { state: { page: p } })}
            />

            {/* Back + Title */}
            <div className="wqs-title">
                <button
                    className="back-btn"
                    onClick={() =>
                        navigate("/", {
                            state: {
                                page: "map",
                                land: state?.land,
                                currentPos: currentPos,
                                openPopup: true,
                                openDetail: true
                            }
                        })
                    }
                >
                    ←
                </button>

                <h2>ตารางแสดงวิธีการเปรียบเทียบให้คะแนนคุณภาพพร้อมถ่วงน้ำหนัก (WQS.)</h2>
            </div>

            {/* Container */}
            <div className="wqs-card">

                {/* ตารางส่วนบน */}
                <table className="wqs-table styled-table">
                    <thead>
                        <tr>
                            <th colSpan={6} className="title-gray">TABLE OF WEIGHTED QUALITY SCORE</th>
                        </tr>

                        <tr>
                            <th>รายการ</th>
                            <th>(หน่วย)</th>
                            <th>ทรัพย์สินที่ประเมิน</th>
                            <th>ข้อมูลที่ 1</th>
                            <th>ข้อมูลที่ 2</th>
                            <th>ข้อมูลที่ 3</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>ขนาดเนื้อที่ดิน</td>
                            <td>ตารางวา</td>
                            <td>{data.landSize.target}</td>
                            <td>{data.landSize.c1}</td>
                            <td>{data.landSize.c2}</td>
                            <td>{data.landSize.c3}</td>
                        </tr>

                        <tr>
                            <td>ราคาเสนอขาย</td>
                            <td>บาท/ตารางวา</td>
                            <td>{data.landPrice.target}</td>
                            <td>{data.landPrice.c1}</td>
                            <td>{data.landPrice.c2}</td>
                            <td>{data.landPrice.c3}</td>
                        </tr>

                        <tr>
                            <td>อัตราที่ต่อรอง/ราคาที่เหมาะสม</td>
                            <td>%</td>
                            <td>-</td>
                            <td>10%</td>
                            <td>10%</td>
                            <td>20%</td>
                        </tr>

                        <tr>
                            <td>ราคาซื้อขาย</td>
                            <td>บาท/ตารางวา</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>วันที่มีการซื้อขาย</td>
                            <td>ว/ด/ป</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>ปรับปัจจัยด้านระยะเวลา</td>
                            <td>%</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>ราคาซื้อ/ขายหลังปรับเวลา</td>
                            <td>บาท/ตารางวา</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>

                        <tr className="gray">
                            <td>ราคาที่ดินก่อนปรับ WQS</td>
                            <td>บาท/ตารางวา</td>
                            <td>-</td>
                            <td>13,500</td>
                            <td>12,375</td>
                            <td>10,000</td>
                        </tr>
                    </tbody>
                </table>

                {/* ตารางปัจจัยคุณภาพ */}
                <table className="wqs-table styled-table">
                    <thead>
                        <tr>
                            <th colSpan={6} className="title-gray">
                                ปัจจัยการพิจารณามูลค่า
                            </th>
                        </tr>

                        <tr>
                            <th rowSpan={2}>ปัจจัย</th>
                            <th rowSpan={2}>น้ำหนัก</th>
                            <th rowSpan={2}>ทรัพย์สินที่ประเมิน</th>
                            <th colSpan={3}>ข้อมูลเปรียบเทียบ</th>
                        </tr>

                        <tr>
                            <th>C1</th>
                            <th>C2</th>
                            <th>C3</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.developScore.factor.map((f, i) => (
                            <tr key={i}>
                                <td>{f.name}</td>
                                <td>{f.weight}</td>
                                <td>{f.target}</td>
                                <td>{f.c1}</td>
                                <td>{f.c2}</td>
                                <td>{f.c3}</td>
                            </tr>
                        ))}

                        <tr className="bold-row">
                            <td>ค่าคะแนนถ่วงน้ำหนัก</td>
                            <td>100%</td>
                            <td>{data.developScore.sum.target}</td>
                            <td>{data.developScore.sum.c1}</td>
                            <td>{data.developScore.sum.c2}</td>
                            <td>{data.developScore.sum.c3}</td>
                        </tr>
                    </tbody>
                </table>

                {/* สรุปท้าย */}
                <table className="wqs-table summary-table styled-table">

                    <tbody>
                        <tr>
                            <td>อัตราส่วนมาก/ลดทดลองเทียบ</td>
                            <td>{data.summary.comparedPercent[0]}</td>
                            <td>{data.summary.comparedPercent[1]}</td>
                            <td>{data.summary.comparedPercent[2]}</td>
                            <td>{data.summary.comparedPercent[3]}</td>
                        </tr>

                        <tr>
                            <td>ราคาปรับจากตาราง WQS</td>
                            <td>{data.summary.wqsPrice[0]}</td>
                            <td>{data.summary.wqsPrice[1]}</td>
                            <td>{data.summary.wqsPrice[2]}</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>ระดับความสำคัญของข้อมูล</td>
                            <td>{data.summary.adjustFactor[0]}</td>
                            <td>{data.summary.adjustFactor[1]}</td>
                            <td>{data.summary.adjustFactor[2]}</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>มูลค่าหลังปรับเปรียบเทียบ</td>
                            <td>{data.summary.finalPrice[0]}</td>
                            <td>{data.summary.finalPrice[1]}</td>
                            <td>{data.summary.finalPrice[2]}</td>
                            <td>{data.summary.finalPrice[3]}</td>
                        </tr>

                        <tr className="estimate-row">
                            <td>มูลค่าทรัพย์สินประเมิน</td>
                            <td colSpan={4}>
                                ประมาณ {data.summary.estimate} บาท/ตร.วา (RSQ {data.summary.rsq})
                            </td>
                        </tr>
                    </tbody>

                </table>

            </div>
        </div>
    );
}
