// import React, { useState, useEffect } from "react";
// import "../css/CreateJobPopUp.css";
// import { RxCross2 } from "react-icons/rx";
// import { HiChevronDown } from "react-icons/hi";


// export default function CreateJobPopUp({ jobs, setJobs, closeModal, editingJob, editingIndex }) {

//     const [job, setJob] = useState({
//         order: "",
//         jobCode: "",
//         customerName: "",
//         dueDate: "",
//         reviewDate: "",
//         purpose: "",
//         jobType: "",
//         jobStyle: "",
//         assetLocation: "",
//         bankContractor: "",
//         bankContact: "",
//         appraiser: "",
//         paymentMethod: "",
//         feeBeforeVat: "",
//         feeAfterVat: "",
//         receiveDate: "",
//         completeDate: "",
//         remark: "",
//         status: "",

//     });

//     // ฟอร์แมตใส่ลูกน้ำ
//     const formatNumber = (value) => {
//         if (!value) return "";
//         const num = value.replace(/\D/g, "");
//         return Number(num).toLocaleString();
//     };

//     // ตั้งค่าลำดับจาก jobs ของ parent (ไม่ใช้ jobList เดิม)
//     useEffect(() => {
//         setJob((prev) => ({
//             ...prev,
//             order: jobs.length + 1,
//         }));
//     }, [jobs]);

//     // handle change
//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         if (name === "feeBeforeVat" || name === "feeAfterVat") {
//             const raw = value.replace(/\D/g, "");
//             setJob({
//                 ...job,
//                 [name]: raw,
//                 [name + "_formatted"]: formatNumber(raw),
//             });
//         } else {
//             setJob({ ...job, [name]: value });
//         }
//     };

//     // Enter = ไปช่องถัดไป
//     const handleEnterNext = (e) => {
//         if (e.key === "Enter") {
//             e.preventDefault();
//             const form = e.target.form;
//             const index = Array.prototype.indexOf.call(form, e.target);
//             form.elements[index + 1]?.focus();
//         }
//     };

//     // submit
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (editingJob !== null) {
//             // แก้ไขงานเก่า
//             const updated = [...jobs];
//             updated[editingIndex] = job;
//             setJobs(updated);
//         } else {
//             // เพิ่มงานใหม่
//             setJobs([...jobs, { ...job, order: jobs.length + 1 }]);
//         }

//         closeModal();
//     };

//     // แก้ไขข้อมูล
//     useEffect(() => {
//         if (editingJob) {
//             setJob(editingJob);
//         }
//     }, [editingJob]);


//     return (
//         <div className="modal-overlay">
//             <div className="createJob-container">


//                 <div className="head-createjob">
//                     <h2>Create Job</h2>
//                     <button className="close-btn" onClick={closeModal}>
//                         <RxCross2 size={22} />
//                     </button>
//                 </div>

//                 <form onSubmit={handleSubmit} className="job-form">

//                     <div className="field">
//                         <label>ลำดับ</label>
//                         <input type="text" name="order" value={job.order} readOnly />
//                     </div>

//                     <div className="field">
//                         <label>รหัสงาน (ตัวอย่าง sss-xxx-000-000)</label>
//                         <input type="text" name="jobCode" value={job.jobCode} onChange={handleChange} onKeyDown={handleEnterNext} />
//                     </div>

//                     <div className="field">
//                         <label>ชื่อลูกค้า</label>
//                         <input type="text" name="customerName" value={job.customerName} onChange={handleChange} onKeyDown={handleEnterNext} />
//                     </div>

//                     <div className="row">
//                         <div className="field small">
//                             <label>กำหนดส่งงาน</label>
//                             <input type="date" name="dueDate" value={job.dueDate} onChange={handleChange} onKeyDown={handleEnterNext} />
//                         </div>

//                         <div className="field small">
//                             <label>กำหนดส่งตรวจ</label>
//                             <input type="date" name="reviewDate" value={job.reviewDate} onChange={handleChange} onKeyDown={handleEnterNext} />
//                         </div>
//                     </div>

//                     <div className="row">
//                         <div className="field small select-wrapper">
//                             <label>ประเภทงาน</label>

//                             <div className="select-box">
//                                 <select
//                                     name="jobType"
//                                     value={job.jobType}
//                                     onChange={handleChange}
//                                 >
//                                     <option value="">เลือกประเภทงาน</option>
//                                     <option value="สินเชื่อใหม่">สินเชื่อใหม่</option>
//                                     <option value="ตรวจงวดงาน">ตรวจงวดงาน</option>
//                                     <option value="สินเชื่อเพิ่ม-ลดวงเงิน">สินเชื่อเพิ่ม-ลดวงเงิน</option>
//                                     <option value="กำหนดราคาซื้อทรัพย์">กำหนดราคาซื้อทรัพย์</option>
//                                 </select>

//                                 <HiChevronDown className="dropdown-icon" />
//                             </div>
//                         </div>


//                         <div className="field small">
//                             <label>ลักษณะงาน</label>
//                             <input type="text" name="jobStyle" value={job.jobStyle} onChange={handleChange} onKeyDown={handleEnterNext} />
//                         </div>
//                     </div>

//                     <div className="field small select-wrapper">
//                         <label>วัตถุประสงค์ในการประเมิน</label>
//                         <div className="select-box">
//                             <select
//                                 name="purpose"
//                                 value={job.purpose}
//                                 onChange={handleChange}
//                                 onKeyDown={handleEnterNext}
//                             >
//                                 <option value="">เลือกวัตถุประสงค์</option>
//                                 <option value="เพื่อประกอบการพิจารณาสินเชื่อ">เพื่อประกอบการพิจารณาสินเชื่อ</option>
//                                 <option value="ทราบมูลค่าตลาด เพื่อประกอบการพิจารณาของ บสส.">
//                                     ทราบมูลค่าตลาด เพื่อประกอบการพิจารณาของ บสส.
//                                 </option>
//                                 <option value="เพื่อทบทวนตามนโยบายของธนาคาร">เพื่อทบทวนตามนโยบายของธนาคาร</option>
//                                 <option value="เพื่อทราบมูลค่าทรัพย์สินปัจจุบัน">เพื่อทราบมูลค่าทรัพย์สินปัจจุบัน</option>
//                                 <option value="เพื่อวัตถุประสงค์สาธารณะ ตามกฎระเบียบของ สำนักงานคณะกรรมการกำกับหลักทรัพย์และตลาดหลักทรัพย์ เท่านั้น">
//                                     เพื่อวัตถุประสงค์สาธารณะ ตามกฎระเบียบของสำนักงานคณะกรรมการกำกับหลักทรัพย์และตลาดหลักทรัพย์ เท่านั้น
//                                 </option>
//                                 <option value="เพื่อทราบมูลค่าสำหรับประกอบการซื้อขาย">เพื่อทราบมูลค่าสำหรับประกอบการซื้อขาย</option>
//                                 <option value="เพื่อบันทึกบัญชี">เพื่อบันทึกบัญชี</option>
//                                 <option value="เพื่อกำหนดมูลค่าตลาด">เพื่อกำหนดมูลค่าตลาด</option>
//                                 <option value="เพื่อทบทวนมูลค่าหลักประกัน">เพื่อทบทวนมูลค่าหลักประกัน</option>
//                                 <option value="เพื่อทราบมูลค่าตลาด ณ ปัจจุบัน">เพื่อทราบมูลค่าตลาด ณ ปัจจุบัน</option>
//                                 <option value="เพื่อทบทวนราคาตามนโยบายของธนาคาร">
//                                     เพื่อทบทวนราคาตามนโยบายของธนาคาร
//                                 </option>
//                                 <option value="เพื่อทราบมูลค่าตลาดและเพื่อวัตถุประสงค์สาธารณะ">
//                                     เพื่อทราบมูลค่าตลาดและเพื่อวัตถุประสงค์สาธารณะ
//                                 </option>
//                                 <option value="เพื่อวัตถุประสงค์สาธารณะ">เพื่อวัตถุประสงค์สาธารณะ</option>
//                                 <option value="เพื่อทราบมูลค่าตลาด สำหรับใช้ภายในกิจการ">
//                                     เพื่อทราบมูลค่าตลาด สำหรับใช้ภายในกิจการ
//                                 </option>
//                                 <option value="เพื่อทราบมูลค่าปัจจุบันเพื่อประกอบการซื้อ-ขาย">
//                                     เพื่อทราบมูลค่าปัจจุบันเพื่อประกอบการซื้อ-ขาย
//                                 </option>
//                                 <option value="เพื่อประกอบการทบทวน PL/NPL/ ทราบมูลค่าปัจจุบันกับธนาคารกรุงไทย จำกัด (มหาชน)">
//                                     เพื่อประกอบการทบทวน PL/ NPL/ ทราบมูลค่าปัจจุบันกับธนาคารกรุงไทย จำกัด (มหาชน)
//                                 </option>
//                                 <option value="เพื่อทบทวนมูลค่า / กันสำรอง NPA">
//                                     เพื่อทบทวนมูลค่า / กันสำรอง NPA
//                                 </option>
//                             </select>
//                             <HiChevronDown className="dropdown-icon" />
//                         </div>
//                     </div>

//                     <div className="field">
//                         <label>ที่ตั้งทรัพย์สิน</label>
//                         <input type="text" name="assetLocation" value={job.assetLocation} onChange={handleChange} onKeyDown={handleEnterNext} />
//                     </div>

//                     <div className="row">
//                         <div className="field small">
//                             <label>ผู้จัดจ้างธนาคาร</label>
//                             <input type="text" name="bankContractor" value={job.bankContractor} onChange={handleChange} onKeyDown={handleEnterNext} />
//                         </div>

//                         <div className="field small">
//                             <label>ผู้ติดต่อฝั่งธนาคาร</label>
//                             <input type="text" name="bankContact" value={job.bankContact} onChange={handleChange} onKeyDown={handleEnterNext} />
//                         </div>
//                     </div>

//                     <div className="field">
//                         <label>ผู้ประเมิน</label>
//                         <input type="text" name="appraiser" value={job.appraiser} onChange={handleChange} onKeyDown={handleEnterNext} />
//                     </div>

//                     <div className="field small select-wrapper">
//                         <label>วิธีชำระ</label>
//                         <div className="select-box">
//                             <select name="paymentMethod" value={job.paymentMethod} onChange={handleChange} onKeyDown={handleEnterNext}>
//                                 <option value="">เลือกวิธีชำระ</option>
//                                 <option value="เงินสด">เงินสด</option>
//                                 <option value="โอน">โอน</option>
//                                 <option value="หักบัญชีธนาคาร">หักบัญชีธนาคาร</option>
//                             </select>
//                             <HiChevronDown className="dropdown-icon" />
//                         </div>
//                     </div>

//                     <div className="row">
//                         <div className="field small">
//                             <label>ค่าบริการก่อน VAT</label>
//                             <input
//                                 type="text"
//                                 name="feeBeforeVat"
//                                 value={job.feeBeforeVat_formatted || ""}
//                                 onChange={handleChange}
//                                 onKeyDown={handleEnterNext}
//                             />
//                         </div>

//                         <div className="field small">
//                             <label>ค่าบริการรวม VAT</label>
//                             <input
//                                 type="text"
//                                 name="feeAfterVat"
//                                 value={job.feeAfterVat_formatted || ""}
//                                 onChange={handleChange}
//                                 onKeyDown={handleEnterNext}
//                             />
//                         </div>
//                     </div>

//                     <div className="row">
//                         <div className="field small">
//                             <label>วันที่รับงาน</label>
//                             <input type="date" name="receiveDate" value={job.receiveDate} onChange={handleChange} onKeyDown={handleEnterNext} />
//                         </div>

//                         <div className="field small">
//                             <label>วันที่สั่งจบ</label>
//                             <input type="date" name="completeDate" value={job.completeDate} onChange={handleChange} onKeyDown={handleEnterNext} />
//                         </div>
//                     </div>

//                     <div className="field">
//                         <label>หมายเหตุ</label>
//                         <textarea
//                             name="remark"
//                             rows="3"
//                             value={job.remark}
//                             placeholder="ใส่รายละเอียดเพิ่มเติม..."
//                             onChange={handleChange}
//                             onKeyDown={handleEnterNext}
//                         ></textarea>
//                     </div>
//                     <div className="field small select-wrapper">
//                         <label>Status</label>
//                         <div className="select-box">
//                         <select name="status" value={job.status} onChange={handleChange}>
//                             <option value="">เลือกสถานะ</option>
//                             <option value="รอตรวจสอบ">รอตรวจสอบ</option>
//                             <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
//                             <option value="เสร็จสิ้น">เสร็จสิ้น</option>
//                         </select>
//                         <HiChevronDown className="dropdown-icon" />
//                         </div>
//                     </div>


//                     <button type="submit" className="submit-btn">Create Job</button>
//                 </form>


//             </div>
//         </div>
//     );
// }


import React, { useState, useEffect } from "react";
import "../css/CreateJobPopUp.css";
import { RxCross2 } from "react-icons/rx";
import { HiChevronDown } from "react-icons/hi";

export default function CreateJobPopUp({
    jobs,
    setJobs,
    closeModal,
    editingJob,
    editingIndex,
    selectedBank   // ⭐ รับค่าธนาคารจาก JobPage
}) {

    const [job, setJob] = useState({
        order: "",
        jobCode: "",
        customerName: "",
        dueDate: "",
        reviewDate: "",
        purpose: "",
        jobType: "",
        jobStyle: "",
        assetLocation: "",
        bankContractor: "",
        bankContact: "",
        appraiser: "",
        paymentMethod: "",
        feeBeforeVat: "",
        feeAfterVat: "",
        receiveDate: "",
        completeDate: "",
        remark: "",
        status: "",
    });

    /* ---------------- FORMAT NUMBER ---------------- */
    const formatNumber = (value) => {
        if (!value) return "";
        const num = value.replace(/\D/g, "");
        return Number(num).toLocaleString();
    };

    /* ---------------- SET ORDER ---------------- */
    useEffect(() => {
        setJob((prev) => ({
            ...prev,
            order: jobs.length + 1,
        }));
    }, [jobs]);

    /* ---------------- APPLY SELECTED BANK ---------------- */
    useEffect(() => {
        if (!editingJob && selectedBank) {
            setJob((prev) => ({
                ...prev,
                bankContractor: selectedBank,   // ⭐ เติมธนาคารอัตโนมัติ
            }));
        }
    }, [selectedBank, editingJob]);

    /* ---------------- EDIT MODE ---------------- */
    useEffect(() => {
        if (editingJob) {
            setJob(editingJob);
        }
    }, [editingJob]);

    /* ---------------- INPUT CHANGE ---------------- */
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "feeBeforeVat" || name === "feeAfterVat") {
            const raw = value.replace(/\D/g, "");
            setJob({
                ...job,
                [name]: raw,
                [name + "_formatted"]: formatNumber(raw),
            });
        } else {
            setJob({ ...job, [name]: value });
        }
    };

    /* ---------------- ENTER TO NEXT ---------------- */
    const handleEnterNext = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const form = e.target.form;
            const index = Array.prototype.indexOf.call(form, e.target);
            form.elements[index + 1]?.focus();
        }
    };

    /* ---------------- SUBMIT ---------------- */
    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingJob !== null) {
            const updated = [...jobs];
            updated[editingIndex] = job;
            setJobs(updated);
        } else {
            setJobs([...jobs, { ...job, order: jobs.length + 1 }]);
        }

        closeModal();
    };


    return (
        <div className="modal-overlay">
            <div className="createJob-container">

                {/* HEADER */}
                <div className="head-createjob">
                    <h2>{editingJob ? "Edit Job" : "Create Job"}</h2>
                    <button className="close-btn" onClick={closeModal}>
                        <RxCross2 size={22} />
                    </button>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="job-form">

                    <div className="field">
                        <label>ลำดับ</label>
                        <input type="text" name="order" value={job.order} readOnly />
                    </div>

                    <div className="field">
                        <label>รหัสงาน</label>
                        <input
                            type="text"
                            name="jobCode"
                            value={job.jobCode}
                            onChange={handleChange}
                            onKeyDown={handleEnterNext}
                        />
                    </div>

                    <div className="field">
                        <label>ชื่อลูกค้า</label>
                        <input
                            type="text"
                            name="customerName"
                            value={job.customerName}
                            onChange={handleChange}
                            onKeyDown={handleEnterNext}
                        />
                    </div>

                    <div className="row">
                        <div className="field small">
                            <label>กำหนดส่งงาน</label>
                            <input type="date" name="dueDate" value={job.dueDate} onChange={handleChange} />
                        </div>

                        <div className="field small">
                            <label>กำหนดส่งตรวจ</label>
                            <input type="date" name="reviewDate" value={job.reviewDate} onChange={handleChange} />
                        </div>
                    </div>

                    {/* JOB TYPE */}
                    <div className="row">
                        <div className="field small select-wrapper">
                            <label>ประเภทงาน</label>
                            <div className="select-box">
                                <select name="jobType" value={job.jobType} onChange={handleChange}>
                                    <option value="">เลือกประเภทงาน</option>
                                    <option value="สินเชื่อใหม่">สินเชื่อใหม่</option>
                                    <option value="ตรวจงวดงาน">ตรวจงวดงาน</option>
                                    <option value="สินเชื่อเพิ่ม-ลดวงเงิน">สินเชื่อเพิ่ม-ลดวงเงิน</option>
                                    <option value="กำหนดราคาซื้อทรัพย์">กำหนดราคาซื้อทรัพย์</option>
                                </select>
                                <HiChevronDown className="dropdown-icon" />
                            </div>
                        </div>

                        <div className="field small">
                            <label>ลักษณะงาน</label>
                            <input type="text" name="jobStyle" value={job.jobStyle} onChange={handleChange} />
                        </div>
                    </div>

                    {/* PURPOSE */}
                    <div className="field small select-wrapper">
                        <label>วัตถุประสงค์ในการประเมิน</label>
                        <div className="select-box">
                            <select name="purpose" value={job.purpose} onChange={handleChange}>
                                <option value="">เลือกวัตถุประสงค์</option>
                                <option value="เพื่อประกอบการพิจารณาสินเชื่อ">เพื่อประกอบการพิจารณาสินเชื่อ</option>
                                <option value="ทราบมูลค่าตลาด เพื่อประกอบการพิจารณาของ บสส.">ทราบมูลค่าตลาด เพื่อประกอบการพิจารณาของ บสส.</option>
                                <option value="เพื่อทบทวนตามนโยบายของธนาคาร">เพื่อทบทวนตามนโยบายของธนาคาร</option>
                                <option value="เพื่อทราบมูลค่าทรัพย์สินปัจจุบัน">เพื่อทราบมูลค่าทรัพย์สินปัจจุบัน</option>
                            </select>
                            <HiChevronDown className="dropdown-icon" />
                        </div>
                    </div>

                    {/* LOCATION */}
                    <div className="field">
                        <label>ที่ตั้งทรัพย์สิน</label>
                        <input
                            type="text"
                            name="assetLocation"
                            value={job.assetLocation}
                            onChange={handleChange}
                        />
                    </div>

                    {/* BANK INFO */}
                    <div className="row">
                        <div className="field small">
                            <label>ผู้จัดจ้างธนาคาร</label>
                            <input
                                type="text"
                                name="bankContractor"
                                value={job.bankContractor}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="field small">
                            <label>ผู้ติดต่อฝั่งธนาคาร</label>
                            <input
                                type="text"
                                name="bankContact"
                                value={job.bankContact}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* APPRAISER */}
                    <div className="field">
                        <label>ผู้ประเมิน</label>
                        <input
                            type="text"
                            name="appraiser"
                            value={job.appraiser}
                            onChange={handleChange}
                        />
                    </div>

                    {/* PAYMENT METHOD */}
                    <div className="field small select-wrapper">
                        <label>วิธีชำระ</label>
                        <div className="select-box">
                            <select name="paymentMethod" value={job.paymentMethod} onChange={handleChange}>
                                <option value="">เลือกวิธีชำระ</option>
                                <option value="เงินสด">เงินสด</option>
                                <option value="โอน">โอน</option>
                                <option value="หักบัญชีธนาคาร">หักบัญชีธนาคาร</option>
                            </select>
                            <HiChevronDown className="dropdown-icon" />
                        </div>
                    </div>

                    {/* FEE */}
                    <div className="row">
                        <div className="field small">
                            <label>ค่าบริการก่อน VAT</label>
                            <input
                                type="text"
                                name="feeBeforeVat"
                                value={job.feeBeforeVat_formatted || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="field small">
                            <label>ค่าบริการรวม VAT</label>
                            <input
                                type="text"
                                name="feeAfterVat"
                                value={job.feeAfterVat_formatted || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* DATES */}
                    <div className="row">
                        <div className="field small">
                            <label>วันที่รับงาน</label>
                            <input type="date" name="receiveDate" value={job.receiveDate} onChange={handleChange} />
                        </div>

                        <div className="field small">
                            <label>วันที่สั่งจบ</label>
                            <input type="date" name="completeDate" value={job.completeDate} onChange={handleChange} />
                        </div>
                    </div>

                    {/* REMARK */}
                    <div className="field">
                        <label>หมายเหตุ</label>
                        <textarea
                            name="remark"
                            rows="3"
                            value={job.remark}
                            placeholder="ใส่รายละเอียดเพิ่มเติม..."
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    {/* STATUS */}
                    <div className="field small select-wrapper">
                        <label>Status</label>
                        <div className="select-box">
                            <select name="status" value={job.status} onChange={handleChange}>
                                <option value="">เลือกสถานะ</option>
                                <option value="รอตรวจสอบ">รอตรวจสอบ</option>
                                <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
                                <option value="เสร็จสิ้น">เสร็จสิ้น</option>
                            </select>
                            <HiChevronDown className="dropdown-icon" />
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">
                        {editingJob ? "Save Changes" : "Create Job"}
                    </button>
                </form>
            </div>
        </div>
    );
}
