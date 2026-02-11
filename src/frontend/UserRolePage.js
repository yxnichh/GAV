import React, { useState, useEffect } from "react";
import "../css/UserRolePage.css";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { HiChevronDown } from "react-icons/hi";

import { db } from "../backend/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

import bcrypt from "bcryptjs";

export default function UserRolePage() {

    const [users, setUsers] = useState([]);

    const [showEdit, setShowEdit] = useState(false);
    const [editUser, setEditUser] = useState(null);

    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const [showCreate, setShowCreate] = useState(false);

    const [newUserData, setNewUserData] = useState({
        name: "",
        nickname: "",
        email: "",
        username: "",
        password: "",
        role: "ฝ่ายการตลาด",
        active: true,
    });

    /* ---------------- FILTER ---------------- */
    const filteredUsers = users.filter((u) =>
        (u.name?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
        (u.email?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
        (u.role?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
        (u.nickname?.toLowerCase() ?? "").includes(search.toLowerCase())
    );

    const openEditUser = (user) => {
        setEditUser({ ...user });
        setShowEdit(true);
    };

    const saveEditUser = async () => {
        try {
            await updateDoc(doc(db, "users", editUser.id), {
                role: editUser.role,
                active: editUser.active
            });

            // 🔄 update state
            setUsers(prev =>
                prev.map(u => (u.id === editUser.id ? editUser : u))
            );

            setShowEdit(false);
            alert("แก้ไขข้อมูลสำเร็จ");
        } catch (error) {
            console.error("แก้ไขผู้ใช้ไม่สำเร็จ:", error);
            alert("เกิดข้อผิดพลาดในการแก้ไข");
        }
    };


    /* ---------------- PAGINATION ---------------- */
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice((page - 1) * itemsPerPage, page * itemsPerPage);


    /* ---------------- ROLE TRANSLATION ---------------- */
    const roleTHtoEN = (role) => {
        switch (role) {
            case "ฝ่ายการตลาด": return "marketing";
            case "ฝ่ายประเมิน": return "evaluator";
            case "ฝ่ายแอดมิน": return "admin";
            case "ฝ่ายผู้บริหาร": return "executive";
            default: return "marketing";
        }
    };

    const addUser = async () => {
        if (!newUserData.username || !newUserData.password) {
            alert("กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน");
            return;
        }

        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(newUserData.password, salt);

            await setDoc(
                doc(db, "users", newUserData.username),
                {
                    username: newUserData.username,
                    name: newUserData.name,
                    nickname: newUserData.nickname,
                    email: newUserData.email,
                    role: roleTHtoEN(newUserData.role),
                    passwordHash: hash,
                    active: true,
                    createdAt: new Date()
                }
            );

            // 🔄 reload จาก Firestore
            const querySnapshot = await getDocs(collection(db, "users"));
            const userList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(userList);

            setShowCreate(false);
            setNewUserData({
                name: "",
                nickname: "",
                email: "",
                username: "",
                password: "",
                role: "ฝ่ายการตลาด",
                active: true,
            });

            alert("เพิ่มผู้ใช้สำเร็จ");

        } catch (error) {
            console.error("เพิ่มผู้ใช้ Error:", error);
            alert("เกิดข้อผิดพลาดในการเพิ่มผู้ใช้");
        }
    };



    const roleENtoTH = (role) => {
        switch (role) {
            case "marketing": return "ฝ่ายการตลาด";
            case "evaluator": return "ฝ่ายประเมิน";
            case "admin": return "ฝ่ายแอดมิน";
            case "executive": return "ฝ่ายผู้บริหาร";
            default: return "-";
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const userList = querySnapshot.docs.map(doc => ({
                    id: doc.id,        // ใช้ username เป็น id
                    ...doc.data()
                }));
                setUsers(userList);
            } catch (err) {
                console.error("โหลด users ไม่สำเร็จ:", err);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (user) => {
        const confirmDelete = window.confirm(
            `คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้ "${user.name}" ?`
        );

        if (!confirmDelete) return;

        try {
            // 🔥 ลบจาก Firestore
            await deleteDoc(doc(db, "users", user.id));

            // 🔄 ลบจาก state
            setUsers(prev => prev.filter(u => u.id !== user.id));

            alert("ลบผู้ใช้เรียบร้อยแล้ว");
        } catch (error) {
            console.error("ลบผู้ใช้ไม่สำเร็จ:", error);
            alert("เกิดข้อผิดพลาดในการลบผู้ใช้");
        }
    };



    /* ---------------- UI ---------------- */
    return (
        <div className="userrole-page-container">
            <h1>จัดการสิทธิ์ผู้ใช้งาน</h1>

            <p className="search-description">ค้นหาผู้ใช้</p>

            <div className="top-control">
                <div className="job-search-bar">
                    <FiSearch />
                    <input
                        type="text"
                        placeholder="พิมพ์เพื่อค้นหา..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <button className="add-user-btn" onClick={() => setShowCreate(true)}>
                    + เพิ่มผู้ใช้
                </button>
            </div>

            <div className="table-wrapper">
                <table className="role-table">
                    <thead>
                        <tr>
                            <th>ชื่อ - นามสกุล</th>
                            <th>ชื่อเล่น</th>
                            <th>อีเมล</th>
                            <th>แผนก</th>
                            <th>สถานะการใช้งาน</th>
                            <th>ประวัติการใช้งาน</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedUsers.map((u) => (
                            <tr key={u.id}>
                                <td>{u.name}</td>
                                <td>{u.nickname || "-"}</td>
                                <td>{u.email}</td>

                                <td>
                                    <span className={`role-badge ${roleClass(roleENtoTH(u.role))}`}>
                                        {roleENtoTH(u.role)}
                                    </span>
                                </td>

                                <td>
                                    <span className={`status-dot ${u.active ? "active" : "inactive"}`}></span>
                                    {u.active ? "ใช้งานอยู่" : "ไม่ใช้งาน"}
                                </td>

                                <td>
                                    <button
                                        className="history-btn"
                                        onClick={() => navigate(`/history/${u.id}`, { state: u })}
                                    >
                                        ดูประวัติ
                                    </button>
                                </td>

                                <td className="action-cell">
                                    <button
                                        className="edit-btn"
                                        onClick={() => openEditUser(u)}
                                    >
                                        แก้ไข
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteUser(u)}
                                    >
                                        ลบ
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>


                </table>

            </div>

            {showEdit && editUser && (
                <div className="popup-overlay">
                    <div className="popup-container enterprise single-column">

                        <div className="popup-header-role">
                            <h2>แก้ไขผู้ใช้</h2>
                            <button className="close-btn" onClick={() => setShowEdit(false)}>×</button>
                        </div>

                        <div className="popup-body single">

                            <div className="input-group">
                                <label>ชื่อผู้ใช้</label>
                                <input
                                    className="popup-input"
                                    value={editUser.name}
                                    disabled
                                />
                            </div>

                            <div className="input-group">
                                <label>สิทธิ์ผู้ใช้งาน</label>
                                <select
                                    className="popup-input"
                                    value={editUser.role}
                                    onChange={(e) =>
                                        setEditUser({ ...editUser, role: e.target.value })
                                    }
                                >
                                    <option value="marketing">ฝ่ายการตลาด</option>
                                    <option value="evaluator">ฝ่ายประเมิน</option>
                                    <option value="admin">ฝ่ายแอดมิน</option>
                                    <option value="executive">ฝ่ายผู้บริหาร</option>
                                </select>
                            </div>

                        </div>

                        <div className="popup-btn-group enterprise-btns">
                            <button className="cancel-btn" onClick={() => setShowEdit(false)}>
                                ยกเลิก
                            </button>
                            <button className="save-btn" onClick={saveEditUser}>
                                บันทึก
                            </button>
                        </div>

                    </div>
                </div>
            )}


            {/* FOOTER */}
            <div className="table-footer-controls">

                <div className="rows-per-page">
                    <span>แสดง:</span>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setPage(1);
                        }}
                    >
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                    <span>รายการต่อหน้า</span>
                </div>

                <div className="pagination">
                    <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                        ก่อนหน้า
                    </button>
                    <span>{page} / {totalPages}</span>
                    <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                        ถัดไป
                    </button>
                </div>

            </div>


            {/* POPUP ADD USER */}
            {showCreate && (
                <div className="popup-overlay">
                    <div className="popup-container enterprise single-column">

                        <div className="popup-header-role">
                            <h2>เพิ่มผู้ใช้ใหม่</h2>
                            <button className="close-btn" onClick={() => setShowCreate(false)}>×</button>
                        </div>

                        <div className="popup-body single">

                            <div className="input-group">
                                <label>ชื่อผู้ใช้งาน</label>
                                <input
                                    className="popup-input"
                                    value={newUserData.username}
                                    onChange={(e) =>
                                        setNewUserData({ ...newUserData, username: e.target.value })
                                    }
                                />
                            </div>

                            <div className="input-group">
                                <label>รหัสผ่าน</label>
                                <input
                                    type="password"
                                    className="popup-input"
                                    value={newUserData.password}
                                    onChange={(e) =>
                                        setNewUserData({ ...newUserData, password: e.target.value })
                                    }
                                />
                            </div>

                            <div className="input-group">
                                <label>ชื่อ - นามสกุล</label>
                                <input
                                    className="popup-input"
                                    value={newUserData.name}
                                    onChange={(e) =>
                                        setNewUserData({ ...newUserData, name: e.target.value })
                                    }
                                />
                            </div>

                            <div className="input-group">
                                <label>ชื่อเล่น</label>
                                <input
                                    className="popup-input"
                                    value={newUserData.nickname}
                                    onChange={(e) =>
                                        setNewUserData({ ...newUserData, nickname: e.target.value })
                                    }
                                />
                            </div>

                            <div className="input-group">
                                <label>อีเมล</label>
                                <input
                                    className="popup-input"
                                    value={newUserData.email}
                                    onChange={(e) =>
                                        setNewUserData({ ...newUserData, email: e.target.value })
                                    }
                                />
                            </div>

                            <div className="input-group">
                                <label>สิทธิ์ผู้ใช้งาน</label>

                                <div className="select-wrapper">
                                    <select
                                        className="popup-input select"
                                        value={newUserData.role}
                                        onChange={(e) =>
                                            setNewUserData({ ...newUserData, role: e.target.value })
                                        }
                                    >
                                        <option>ฝ่ายการตลาด</option>
                                        <option>ฝ่ายประเมิน</option>
                                        <option>ฝ่ายแอดมิน</option>
                                        <option>ฝ่ายผู้บริหาร</option>
                                    </select>

                                    <HiChevronDown className="dropdown-icon-user" />
                                </div>
                            </div>

                        </div>

                        <div className="popup-btn-group enterprise-btns">
                            <button className="cancel-btn" onClick={() => setShowCreate(false)}>
                                ยกเลิก
                            </button>
                            <button className="save-btn" onClick={addUser}>
                                เพิ่มผู้ใช้
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}

function roleClass(role) {
    switch (role) {
        case "ฝ่ายการตลาด": return "marketing";
        case "ฝ่ายประเมิน": return "evaluation";
        case "ฝ่ายแอดมิน": return "admin";
        case "ฝ่ายผู้บริหาร": return "executive";
        default: return "";
    }
}
