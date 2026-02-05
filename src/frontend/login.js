// import "../css/login.css";
// import Logo from "../image/logo.png";

// function Login({ onLogin }) {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // ยังไม่เช็ค API ถือว่าล็อกอินผ่าน
//     onLogin();
//   };

//   return (
//     <div className="login-container">
//       <div className="logo-login" >
//         <img src={Logo} alt="logo" className="logo-img-login" />
//       </div>

//       <div className="login-right">
//         <h1>ยินดีต้อนรับ</h1>
//         <p className="subtitle">กรุณาเข้าสู่ระบบ</p>

//         <form className="login-form" onSubmit={handleSubmit}>
//           <label>อีเมล</label>
//           <input type="email" placeholder="กรอกอีเมล" />

//           <label>รหัสผ่าน</label>
//           <input type="password" placeholder="กรอกรหัสผ่าน" />

//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;




import "../css/login.css";
import Logo from "../image/logo.png";

import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../backend/firebaseConfig";

import bcrypt from "bcryptjs";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ค้นหา user ตาม username
      const q = query(
        collection(db, "users"),
        where("username", "==", username)
      );

      const snap = await getDocs(q);

      if (snap.empty) {
        setError("ไม่พบผู้ใช้");
        return;
      }

      const user = snap.docs[0].data();

      // ตรวจ hash ด้วย bcrypt
      const isMatch = bcrypt.compareSync(password, user.passwordHash);

      if (!isMatch) {
        setError("รหัสผ่านไม่ถูกต้อง");
        return;
      }

      // เก็บ user ไว้ใน sessionStorage
      sessionStorage.setItem("user", JSON.stringify(user));

      // Login สำเร็จ
      onLogin(user);

    } catch (err) {
      console.error(err);
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  };

  return (
    <div className="login-container">
      <div className="logo-login">
        <img src={Logo} alt="logo" className="logo-img-login" />
      </div>

      <div className="login-right">
        <h1>ยินดีต้อนรับ</h1>
        <p className="subtitle">กรุณาเข้าสู่ระบบ</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>ชื่อผู้ใช้งาน</label>
          <input
            type="text"
            placeholder="กรอกชื่อผู้ใช้งาน"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>รหัสผ่าน</label>
          <input
            type="password"
            placeholder="กรอกรหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-text">{error}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
