import React, { useState } from "react";
import "../css/JobPage.css";
import CreateJobPopUp from "./CreateJobPopUp";
import { FiSearch } from "react-icons/fi";

export default function JobPage() {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);


    const handleEdit = (job, index) => {
        setEditingJob(job);
        setEditingIndex(index);
        setOpenModal(true);
    };

    const handleDelete = (index) => {
        const updated = [...jobs];
        updated.splice(index, 1);
        setJobs(updated);
    };

    const filteredJobs = jobs.filter((j) => {
        const keyword = search.toLowerCase();
        return (
            j.customerName?.toLowerCase().includes(keyword) ||
            j.assetLocation?.toLowerCase().includes(keyword) ||
            j.jobCode?.toLowerCase().includes(keyword)
        );
    });


    return (
        <>
            {/* ⭐ เบลอพื้นหลัง แต่ไม่เบลอ popup */}
            {openModal && <div className="blur-overlay"></div>}

            {/* ⭐ Popup อยู่บนสุด ชัดเจน */}
            {openModal && (
                <div className="job-popup-overlay">
                    <CreateJobPopUp
                        jobs={jobs}
                        setJobs={setJobs}
                        closeModal={() => setOpenModal(false)}
                        editingJob={editingJob}
                        editingIndex={editingIndex}
                    />
                </div>
            )}

            {/* ⭐ page-container ไม่ต้องเบลอแล้ว */}
            <div className="page-container">
                <h1 style={{ color: "#003e79" }}>แผนงาน</h1>
                <p className="search-description">
                    ค้นหางานจาก รหัสงาน / ลูกค้า / ที่ตั้งทรัพย์สิน
                </p>

                <div className="top-bar">

                    <div className="job-search-bar">
                        <FiSearch />
                        <input
                            type="text"
                            placeholder="พิมพ์เพื่อค้นหา..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <button
                        className="create-btn"
                        onClick={() => {
                            setEditingJob(null);
                            setEditingIndex(null);
                            setOpenModal(true);
                        }}
                    >
                        + Create Job
                    </button>

                </div>


                <div className="table-wrapper">
                    <table className="job-table">
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>รหัสงาน</th>
                                <th>ชื่อลูกค้า</th>
                                <th>วัตถุประสงค์เพื่อการประเมิน</th>
                                <th>ประเภทงาน</th>
                                <th>ลักษณะงาน</th>
                                <th>ที่ตั้งทรัพย์สิน</th>
                                <th>ผู้จัดจ้างธนาคาร</th>
                                <th>ผู้ติดต่อธนาคาร</th>
                                <th>ผู้ประเมิน</th>
                                <th>วิธีชำระ</th>
                                <th>ค่าก่อน VAT</th>
                                <th>ค่ารวม VAT</th>
                                <th>กำหนดส่งงาน</th>
                                <th>กำหนดส่งตรวจ</th>
                                <th>วันที่รับงาน</th>
                                <th>วันที่สั่งจบ</th>
                                <th>หมายเหตุ</th>
                                <th>สถานะ</th>
                                <th>เพิ่มเติม</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredJobs.length === 0 ? (
                                <tr>
                                    <td colSpan="20" className="no-data">
                                        ไม่มีข้อมูลงาน
                                    </td>
                                </tr>
                            ) : (
                                filteredJobs.map((j, i) => (
                                    <tr
                                        key={i}
                                        className={`status-${(j.status || "").replace(/\s+/g, "")}`}
                                    >
                                        <td>{j.order}</td>
                                        <td>{j.jobCode}</td>
                                        <td>{j.customerName}</td>
                                        <td>{j.purpose}</td>
                                        <td>{j.jobType}</td>
                                        <td>{j.jobStyle}</td>
                                        <td>{j.assetLocation}</td>
                                        <td>{j.bankContractor}</td>
                                        <td>{j.bankContact}</td>
                                        <td>{j.appraiser}</td>
                                        <td>{j.paymentMethod}</td>
                                        <td>{Number(j.feeBeforeVat).toLocaleString()}</td>
                                        <td>{Number(j.feeAfterVat).toLocaleString()}</td>
                                        <td>{j.dueDate}</td>
                                        <td>{j.reviewDate}</td>
                                        <td>{j.receiveDate}</td>
                                        <td>{j.completeDate}</td>
                                        <td>{j.remark}</td>
                                        <td>{j.status}</td>

                                        <td>
                                            <button className="edit-btn" onClick={() => handleEdit(j, i)}>
                                                ✏️
                                            </button>
                                            <button className="delete-btn" onClick={() => handleDelete(i)}>
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
