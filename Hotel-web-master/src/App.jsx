import Boards from './pages/Boards'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomDetails from './pages/RoomDetails/RoomDetails';

// --- IMPORT CÁC COMPONENT ADMIN MỚI ---
import LoginAdmin from './pages/LoginAdmin'; 
import AdminDashboard from './pages/AdminDashboard'; 
import AdminRoomForm from './pages/AdminRoomForm'; // <-- ĐÃ UNCOMMENT VÀ SỬ DỤNG
// ------------------------------------

function App() {
  return (
    <Router>
      <Routes>
        
        {/* --- 1. ROUTES CÔNG CỘNG (PUBLIC) --- */}
        <Route path="/" element={<Boards />} />
        <Route path="/room/:id" element={<RoomDetails />} />
        
        {/* --- 2. ROUTES HỆ THỐNG QUẢN TRỊ (ADMIN) --- */}
        
        {/* Trang Đăng nhập Admin */}
        <Route path="/admin/login" element={<LoginAdmin />} /> 
        
        {/* Trang Dashboard (Yêu cầu Token Admin) */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* CÁC ROUTE CRUD ĐÃ KÍCH HOẠT */}
        
        {/* Route Thêm mới (Create) */}
        <Route path="/admin/create" element={<AdminRoomForm mode="create" />} />
        
        {/* Route Chỉnh sửa (Update) */}
        <Route path="/admin/edit/:id" element={<AdminRoomForm mode="edit" />} />
        
      </Routes>
    </Router>
  )
}

export default App