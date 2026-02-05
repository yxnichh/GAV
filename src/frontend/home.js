// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

// import MapPage from "./map/map";
// import Search from "./Search";
// import "../css/home.css";
// import TopTab from "./TopTab";
// import PinPage from "./PinPage";

// import {
//   FaMapMarkedAlt,
//   FaTasks,
//   FaFileAlt,
//   FaMapPin,
//   FaUsersCog,
//   FaUniversity,
//   FaLandmark,
// } from "react-icons/fa";

// import JobPage from "./JobPage";
// import UserRolePage from "./UserRolePage";
// import EvaluatorJobs from "./EvaluatorJobs"; // ⭐ เพิ่มหน้า Evaluator Jobs

// import { HiArrowRightCircle } from "react-icons/hi2";

// // ============================
// // MOCK USER (แทนระบบ Login)
// // ============================
// const currentUser = {
//   name: "ชลธิชา",
//   role: "ฝ่ายแอดมิน",
// };

// // ============================
// // ROLE-BASED PERMISSIONS
// // ============================

// const menuPermissions = {
//   "แผนที่": ["ฝ่ายการตลาด", "ฝ่ายประเมิน", "ฝ่ายแอดมิน", "ฝ่ายผู้บริหาร"],
//   "แผนงานตลาด": ["ฝ่ายการตลาด", "ฝ่ายประเมิน", "ฝ่ายแอดมิน", "ฝ่ายผู้บริหาร"],
//   "ข้อมูลเอกสาร": ["ฝ่ายการตลาด", "ฝ่ายประเมิน", "ฝ่ายแอดมิน", "ฝ่ายผู้บริหาร"],
//   "ปักหมุดที่ดิน": ["ฝ่ายประเมิน", "ฝ่ายแอดมิน", "ฝ่ายผู้บริหาร"],
//   "การจัดการสิทธิ์ผู้ใช้งาน": ["ฝ่ายแอดมิน", "ฝ่ายผู้บริหาร"],
//   "แบบฟอร์มธนาคาร": ["ฝ่ายการตลาด", "ฝ่ายประเมิน", "ฝ่ายแอดมิน", "ฝ่ายผู้บริหาร"],
//   "แผนงานประเมิน": ["ฝ่ายประเมิน", "ฝ่ายแอดมิน", "ฝ่ายผู้บริหาร","ฝ่ายการตลาด"],
// };

// export default function Home() {
//   const location = useLocation();
//   const state = location.state;

//   const [page, setPage] = useState("home");
//   const [selectedLand, setSelectedLand] = useState(null);

//   useEffect(() => {
//     if (state?.page) setPage(state.page);

//     if (state?.land) {
//       setSelectedLand(state.land);
//       sessionStorage.setItem("selectedLand", JSON.stringify(state.land));
//       return;
//     }

//     const savedLand = sessionStorage.getItem("selectedLand");
//     if (savedLand) {
//       setSelectedLand(JSON.parse(savedLand));
//       setPage("map");
//     }
//   }, [state]);

//   return (
//     <div>
//       <TopTab page={page} setPage={setPage} />

//       {/* ==================== HOME PAGE ==================== */}
//       {page === "home" && (
//         <main className="container">
//           <h2>ยินดีต้อนรับกลับมา</h2>
//           <p className="date">วันพุธ, 25 มกราคม 2569</p>

//           <div className="card-grid">

//             {/* ===== MAIN FEATURES ===== */}
//             <Card
//               title="แผนที่"
//               icon={<FaMapMarkedAlt />}
//               disabled={!menuPermissions["แผนที่"].includes(currentUser.role)}
//               onClick={() => menuPermissions["แผนที่"].includes(currentUser.role) && setPage("map")}
//             />

//             <Card
//               title="แผนงานตลาด"
//               icon={<FaTasks />}
//               disabled={!menuPermissions["แผนงานตลาด"].includes(currentUser.role)}
//               onClick={() => menuPermissions["แผนงานตลาด"].includes(currentUser.role) && setPage("job")}
//             />

//             <Card
//               title="ข้อมูลเอกสาร"
//               icon={<FaFileAlt />}
//               disabled={!menuPermissions["ข้อมูลเอกสาร"].includes(currentUser.role)}
//             />

//             <Card
//               title="ปักหมุดที่ดิน"
//               icon={<FaMapPin />}
//               disabled={!menuPermissions["ปักหมุดที่ดิน"].includes(currentUser.role)}
//               onClick={() => menuPermissions["ปักหมุดที่ดิน"].includes(currentUser.role) && setPage("pin")}
//             />

//             <Card
//               title="การจัดการสิทธิ์ผู้ใช้งาน"
//               icon={<FaUsersCog />}
//               disabled={!menuPermissions["การจัดการสิทธิ์ผู้ใช้งาน"].includes(currentUser.role)}
//               onClick={() =>
//                 menuPermissions["การจัดการสิทธิ์ผู้ใช้งาน"].includes(currentUser.role) &&
//                 setPage("rolemanage")
//               }
//             />

//             <Card
//               title="แบบฟอร์มธนาคาร"
//               icon={<FaUniversity />}
//               disabled={!menuPermissions["แบบฟอร์มธนาคาร"].includes(currentUser.role)}
//             />

//             {/* ⭐⭐⭐ เพิ่มปุ่ม Evaluator Jobs */}
//             <Card
//               title="แผนงานประเมิน"
//               icon={<FaTasks />}
//               disabled={!menuPermissions["แผนงานประเมิน"]?.includes(currentUser.role)}
//               onClick={() =>
//                 menuPermissions["แผนงานประเมิน"]?.includes(currentUser.role) &&
//                 setPage("evaluatorJobs")
//               }
//             />

//             {/* ===== WEBSITE SECTION ===== */}
//             <h2 className="website-title">เว็บไซต์</h2>

//             <div className="card-grid website-grid">
//               <Card
//                 title="เว็บไซต์กรมโยธา"
//                 icon={<FaLandmark />}
//                 onClick={() => window.open("https://www.dpt.go.th", "_blank")}
//               />
//             </div>

//           </div>
//         </main>
//       )}

//       {/* ========== RENDER OTHER PAGES ========== */}
//       {page === "map" && (
//         <MapPage
//           selectedLand={selectedLand}
//           onCloseLand={() => setSelectedLand(null)}
//         />
//       )}

//       {page === "job" && <JobPage />}
//       {page === "rolemanage" && <UserRolePage />}
//       {page === "pin" && <PinPage />}
//       {page === "search" && <Search />}
//       {page === "evaluatorJobs" && <EvaluatorJobs />}
//     </div>
//   );
// }

// // ================= CARD COMPONENT =================

// function Card({ title, icon, onClick, disabled }) {
//   return (
//     <div
//       className={`card ${disabled ? "card-disabled" : ""}`}
//       onClick={!disabled ? onClick : null}
//     >
//       <div className="icon" style={{ fontSize: "32px" }}>{icon}</div>
//       <h3>{title}</h3>

//       {disabled ? (
//         <p className="disabled-text">ไม่มีสิทธิ์เข้าถึง</p>
//       ) : (
//         <p>
//           ค้นหาข้อมูลและจัดการระบบ<br />ได้อย่างสะดวกและรวดเร็ว
//         </p>
//       )}

//       <HiArrowRightCircle className="arrow" />
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import MapPage from "./map/map";
import Search from "./Search";
import "../css/home.css";
import TopTab from "./TopTab";
import PinPage from "./PinPage";

import {
  FaMapMarkedAlt,
  FaTasks,
  FaFileAlt,
  FaMapPin,
  FaUsersCog,
  FaUniversity,
  FaLandmark,
} from "react-icons/fa";

import JobPage from "./JobPage";
import UserRolePage from "./UserRolePage";
import EvaluatorJobs from "./EvaluatorJobs";

import { HiArrowRightCircle } from "react-icons/hi2";

// =====================================================
// ROLE MAP (ENG → TH)
// =====================================================
const roleMap = {
  admin: "ฝ่ายแอดมิน",
  evaluator: "ฝ่ายประเมิน",
  marketing: "ฝ่ายการตลาด",
  executive: "ฝ่ายผู้บริหาร",
};

// =====================================================
// MENU PERMISSIONS
// =====================================================
const menuPermissions = {
  "แผนที่": ["ฝ่ายการตลาด", "ฝ่ายประเมิน", "ฝ่ายแอดมิน", "ฝ่ายผู้บริหาร"],
  "แผนงานตลาด": ["ฝ่ายการตลาด", "ฝ่ายประเมิน", "ฝ่ายผู้บริหาร"],
  "ข้อมูลเอกสาร": ["ฝ่ายการตลาด", "ฝ่ายประเมิน", "ฝ่ายแอดมิน", "ฝ่ายผู้บริหาร"],
  "ปักหมุดที่ดิน": ["ฝ่ายประเมิน", "ฝ่ายผู้บริหาร"],
  "การจัดการสิทธิ์ผู้ใช้งาน": ["ฝ่ายแอดมิน", "ฝ่ายผู้บริหาร"],
  "แบบฟอร์มธนาคาร": ["ฝ่ายการตลาด", "ฝ่ายประเมิน", "ฝ่ายแอดมิน", "ฝ่ายผู้บริหาร"],
  "แผนงานประเมิน": ["ฝ่ายประเมิน", "ฝ่ายแอดมิน", "ฝ่ายผู้บริหาร", "ฝ่ายการตลาด"],
};

// =====================================================
// MAIN
// =====================================================
export default function Home() {
  const location = useLocation();
  const state = location.state;

  const [page, setPage] = useState("home");
  const [selectedLand, setSelectedLand] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // -----------------------------------------------------
  // โหลด USER จาก sessionStorage (ไม่ใช้ Firebase Auth)
  // -----------------------------------------------------
  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");

    if (savedUser) {
      const parsed = JSON.parse(savedUser);

      setCurrentUser({
        username: parsed.username,
        name: parsed.name || parsed.username,
        role: roleMap[parsed.role] || "ไม่พบข้อมูลแผนก"
      });
    }
  }, []);

  // -----------------------------------------------------
  // โหลดข้อมูลที่ดิน (เหมือนเดิม)
  // -----------------------------------------------------
  useEffect(() => {
    if (state?.page) setPage(state.page);

    if (state?.land) {
      setSelectedLand(state.land);
      sessionStorage.setItem("selectedLand", JSON.stringify(state.land));
      return;
    }

    const savedLand = sessionStorage.getItem("selectedLand");
    if (savedLand) {
      setSelectedLand(JSON.parse(savedLand));
      setPage("map");
    }
  }, [state]);

  // -----------------------------------------------------
  // กำลังโหลด user?
  // -----------------------------------------------------
  if (!currentUser)
    return <p style={{ padding: "20px" }}>กำลังโหลดข้อมูลผู้ใช้...</p>;

  // -----------------------------------------------------
  // UI หลัก
  // -----------------------------------------------------
  return (
    <div>
      <TopTab page={page} setPage={setPage} />

      {page === "home" && (
        <main className="container">
          <h2>ยินดีต้อนรับกลับมา {currentUser.name}</h2>
          <p className="date">บทบาทของคุณ: {currentUser.role}</p>

          <div className="card-grid">

            {/* แผนที่ */}
            {menuPermissions["แผนที่"].includes(currentUser.role) && (
              <Card
                title="แผนที่"
                icon={<FaMapMarkedAlt />}
                onClick={() => setPage("map")}
              />
            )}

            {/* แผนงานตลาด */}
            {menuPermissions["แผนงานตลาด"].includes(currentUser.role) && (
              <Card
                title="แผนงานตลาด"
                icon={<FaTasks />}
                onClick={() => setPage("job")}
              />
            )}

            {/* เอกสาร */}
            {menuPermissions["ข้อมูลเอกสาร"].includes(currentUser.role) && (
              <Card
                title="ข้อมูลเอกสาร"
                icon={<FaFileAlt />}
              />
            )}

            {/* ปักหมุด */}
            {menuPermissions["ปักหมุดที่ดิน"].includes(currentUser.role) && (
              <Card
                title="ปักหมุดที่ดิน"
                icon={<FaMapPin />}
                onClick={() => setPage("pin")}
              />
            )}

            {/* การจัดการสิทธิ์ผู้ใช้งาน */}
            {menuPermissions["การจัดการสิทธิ์ผู้ใช้งาน"].includes(currentUser.role) && (
              <Card
                title="การจัดการสิทธิ์ผู้ใช้งาน"
                icon={<FaUsersCog />}
                onClick={() => setPage("rolemanage")}
              />
            )}

            {/* แบบฟอร์มธนาคาร */}
            {menuPermissions["แบบฟอร์มธนาคาร"].includes(currentUser.role) && (
              <Card
                title="แบบฟอร์มธนาคาร"
                icon={<FaUniversity />}
              />
            )}

            {/* ⭐ แผนงานประเมิน */}
            {menuPermissions["แผนงานประเมิน"].includes(currentUser.role) && (
              <Card
                title="แผนงานประเมิน"
                icon={<FaTasks />}
                onClick={() => setPage("evaluatorJobs")}
              />
            )}

            {/* Website group */}
            <h2 className="website-title">เว็บไซต์</h2>

            <div className="card-grid website-grid">
              <Card
                title="เว็บไซต์กรมโยธา"
                icon={<FaLandmark />}
                onClick={() => window.open("https://www.dpt.go.th", "_blank")}
              />
            </div>

          </div>
        </main>
      )}

      {page === "map" && (
        <MapPage selectedLand={selectedLand} onCloseLand={() => setSelectedLand(null)} />
      )}

      {page === "job" && <JobPage />}
      {page === "rolemanage" && <UserRolePage />}
      {page === "pin" && <PinPage />}
      {page === "search" && <Search />}
      {page === "evaluatorJobs" && <EvaluatorJobs />}
    </div>
  );
}

// =====================================================
// CARD COMPONENT (เวอร์ชันใหม่แบบไม่มี disabled)
// =====================================================
function Card({ title, icon, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <div className="icon" style={{ fontSize: "32px" }}>{icon}</div>
      <h3>{title}</h3>

      <p>
        ค้นหาข้อมูลและจัดการระบบ<br />
        ได้อย่างสะดวกและรวดเร็ว
      </p>

      <HiArrowRightCircle className="arrow" />
    </div>
  );
}
