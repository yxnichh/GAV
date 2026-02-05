import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "../css/ProfileMenu.css";

export default function ProfileMenu({ onLogout }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // ปิดเมนูเมื่อคลิกนอกพื้นที่
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="profile-wrapper" ref={menuRef}>
      <div
        className="profile-btn"
        onClick={() => setOpen((v) => !v)}
        title="บัญชีผู้ใช้"
      >
        <FaUserCircle />
      </div>

      {open && (
        <div className="profile-dropdown">
          <div className="dropdown-item logout" onClick={onLogout}>
            <FaSignOutAlt />
            ออกจากระบบ
          </div>
        </div>
      )}
    </div>
  );
}
