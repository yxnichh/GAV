// import { useState } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./frontend/login.js";
// import Home from "./frontend/home.js";
// import CompareTable from "./frontend/CompareTable.js";
// import ImageViewer from "./frontend/ImageViewer.js";
// import AssetSummary from "./frontend/AssetSummary.js";
// import SaleValuation from "./frontend/SaleValuation.js";
// import WQS from "./frontend/WQS.js";
// import UserRolePage from "./frontend/UserRolePage";
// import HistoryPage from "./frontend/History";

// export default function App() {
//   const [isLogin, setIsLogin] = useState(false);

//   return (
//     <BrowserRouter>
//       <Routes>
//         {!isLogin ? (
//           <Route
//             path="*"
//             element={<Login onLogin={() => setIsLogin(true)} />}
//           />
//         ) : (
//           <>
//             <Route path="/" element={<Home />} />
//             <Route path="/compare" element={<CompareTable />} />
//             <Route path="*" element={<Navigate to="/" />} />
//             <Route path="/images" element={<ImageViewer />} />
//             <Route path="/asset-summary" element={<AssetSummary />} />
//             <Route path="/sale-valuation" element={<SaleValuation />} />
//             <Route path="/wqs" element={<WQS />} />
//             <Route path="/" element={<UserRolePage />} />
//             <Route path="/history/:id" element={<HistoryPage />} />
//           </>
//         )}
//       </Routes>
//     </BrowserRouter>
//   );
// }




import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./frontend/login.js";
import Home from "./frontend/home.js";
import CompareTable from "./frontend/CompareTable.js";
import ImageViewer from "./frontend/ImageViewer.js";
import AssetSummary from "./frontend/AssetSummary.js";
import SaleValuation from "./frontend/SaleValuation.js";
import WQS from "./frontend/WQS.js";
import UserRolePage from "./frontend/UserRolePage";
import HistoryPage from "./frontend/History";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <BrowserRouter>
      <Routes>

        {/* ====================  ถ้ายังไม่ Login  ==================== */}
        {!isLogin && (
          <>
            <Route path="/*" element={<Login onLogin={() => setIsLogin(true)} />} />
          </>
        )}

        {/* ====================   Login แล้ว ==================== */}
        {isLogin && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/compare" element={<CompareTable />} />
            <Route path="/images" element={<ImageViewer />} />
            <Route path="/asset-summary" element={<AssetSummary />} />
            <Route path="/sale-valuation" element={<SaleValuation />} />
            <Route path="/wqs" element={<WQS />} />
            <Route path="/user-role" element={<UserRolePage />} />
            <Route path="/history/:id" element={<HistoryPage />} />

            {/* ถ้า URL ไม่ตรงเส้นทางใดเลย → ส่งกลับหน้า Home */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}

      </Routes>
    </BrowserRouter>
  );
}




// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import UserRolePage from "./frontend/UserRolePage";
// import HistoryPage from "./frontend/History";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<UserRolePage />} />
//         <Route path="/history/:id" element={<HistoryPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
