import React from "react";
import "../css/TopTab.css";
import Logo from "../image/logo.png";
import {
  FaHome,
  FaMapMarkedAlt,
  FaUsersCog,
  FaTasks,
  FaMapPin,
  FaSearch,
} from "react-icons/fa";

import ProfileMenu from "./ProfileMenu"; 

export default function TopTab({ page, setPage }) {

  const handleLogout = () => {
    console.log("ออกจากระบบ");
    // TODO: ใส่ logic logout จริง (Firebase / clear token)
    setPage("home"); // หรือไปหน้า login
  };

  return (
    <nav className="navbar">
      <div className="logo-area" onClick={() => setPage("home")}>
        <img src={Logo} alt="logo" className="logo-img" />
      </div>

      <ul className="menu small-menu">
        <li className={page === "home" ? "active" : ""} onClick={() => setPage("home")}>
          <FaHome /> หน้าหลัก
        </li>

        <li className={page === "map" ? "active" : ""} onClick={() => setPage("map")}>
          <FaMapMarkedAlt /> แผนที่
        </li>

        <li className={page === "rolemanage" ? "active" : ""} onClick={() => setPage("rolemanage")}>
          <FaUsersCog /> การจัดการสิทธิ์ผู้ใช้งาน
        </li>

        <li className={page === "job" ? "active" : ""} onClick={() => setPage("job")}>
          <FaTasks /> แผนงาน
        </li>

        <li className={page === "pin" ? "active" : ""} onClick={() => setPage("pin")}>
          <FaMapPin /> ปักหมุด
        </li>

        <li className={page === "search" ? "active" : ""} onClick={() => setPage("search")}>
          <FaSearch /> ค้นหา
        </li>
      </ul>

      {/* ✅ ปุ่มโปรไฟล์ + เมนูออกจากระบบ */}
      <ProfileMenu onLogout={handleLogout} />
    </nav>
  );
}
