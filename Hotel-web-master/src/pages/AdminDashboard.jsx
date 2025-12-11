// file: src/pages/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    // Lấy Token từ Local Storage để sử dụng cho API Admin
    const token = localStorage.getItem('adminToken');
    
    // Cấu hình Header chứa Token
    const config = {
        headers: {
            Authorization: `Bearer ${token}`, // Định dạng Bearer Token
        },
    };

    // --- LOGIC ĐĂNG XUẤT (LOGOUT) ---
    const handleLogout = () => {
        // 1. Xóa Token và thông tin User khỏi Local Storage
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        // 2. Chuyển hướng về trang Đăng nhập Admin
        navigate('/admin/login');
    };

    // --- LOGIC TẢI DỮ LIỆU PHÒNG ---
    const fetchRooms = async () => {
        try {
            setLoading(true);
            // API này là PUBLIC (không cần Token), nhưng chúng ta vẫn dùng để hiển thị
            const { data } = await axios.get('http://localhost:5000/api/rooms');
            setRooms(data);
            setLoading(false);
        } catch (err) {
            setError('Không thể tải danh sách phòng.');
            setLoading(false);
        }
    };

    // --- LOGIC XÓA PHÒNG (DELETE - ADMIN ONLY) ---
    const handleDelete = async (roomId) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa phòng này?")) return;

        try {
            // Gửi yêu cầu DELETE với Token Admin
            await axios.delete(`http://localhost:5000/api/rooms/${roomId}`, config);
            
            // Xóa thành công, cập nhật lại danh sách phòng
            fetchRooms();
        } catch (err) {
            // Xử lý lỗi: Nếu Token hết hạn hoặc không có quyền (401/403), chuyển về trang login
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                alert('Phiên đăng nhập đã hết hạn hoặc bạn không có quyền. Vui lòng đăng nhập lại.');
                handleLogout();
            } else {
                setError(err.response.data.message || 'Lỗi khi xóa phòng.');
            }
        }
    };


    useEffect(() => {
        // Kiểm tra xem đã có Token Admin chưa
        if (!token) {
            navigate('/admin/login'); // Nếu chưa có, bắt đăng nhập
        } else {
            fetchRooms(); // Nếu có, tải danh sách phòng
        }
    }, [token, navigate]);

    if (loading) return <Typography align="center" sx={{ mt: 5 }}>Đang tải...</Typography>;

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1">
                    Quản lý Phòng Khách sạn
                </Typography>
                <Button variant="contained" color="error" onClick={handleLogout}>
                    Đăng Xuất
                </Button>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => navigate('/admin/create')}>
                + Thêm Phòng Mới (Create)
            </Button>
            
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tên Phòng</TableCell>
                            <TableCell>Giá (VND)</TableCell>
                            <TableCell>Loại Phòng</TableCell>
                            <TableCell align="center">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rooms.map((room) => (
                            <TableRow key={room._id}>
                                <TableCell sx={{ fontSize: '0.7rem' }}>{room._id}</TableCell>
                                <TableCell>{room.name}</TableCell>
                                <TableCell>{room.price.toLocaleString('vi-VN')}</TableCell>
                                <TableCell>{room.roomType}</TableCell>
                                <TableCell align="center">
                                    <Button 
                                        variant="outlined" 
                                        color="info" 
                                        size="small" 
                                        onClick={() => navigate(`/admin/edit/${room._id}`)} 
                                        sx={{ mr: 1 }}
                                    >
                                        Sửa (Update)
                                    </Button>
                                    <Button 
                                        variant="outlined" 
                                        color="error" 
                                        size="small" 
                                        onClick={() => handleDelete(room._id)}
                                    >
                                        Xóa (Delete)
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}