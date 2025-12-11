import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Container, Alert, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/rooms';

// Lấy Token và cấu hình Header cho các yêu cầu Admin
const getAdminConfig = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return null;
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export default function AdminRoomForm({ mode }) {
    // 1. CẬP NHẬT: Thêm 'subheader' vào state ban đầu
    const [formData, setFormData] = useState({
        name: '', price: 0, description: '', imageUrl: '', roomType: '', 
        adults: 1, children: 0, amenities: '', images: '',
        subheader: '' // <-- TRƯỜNG MỚI ĐÃ THÊM
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();
    const { id } = useParams(); 

    const config = getAdminConfig();

    // --- LOGIC 1: TẢI DỮ LIỆU CŨ (Chỉ khi mode="edit") ---
    useEffect(() => {
        if (mode === 'edit' && id && config) {
            setLoading(true);
            axios.get(`${API_URL}/${id}`)
                .then(res => {
                    const room = res.data;
                    // CẬP NHẬT: Đọc trường subheader từ API
                    setFormData({
                        name: room.name || '',
                        price: room.price || 0,
                        description: room.description || '',
                        imageUrl: room.imageUrl || '',
                        roomType: room.roomType || '',
                        adults: room.adults || 1,
                        children: room.children || 0,
                        amenities: room.amenities ? room.amenities.join(', ') : '', 
                        images: room.images ? room.images.join(', ') : '',
                        subheader: room.subheader || '' // <-- Đọc giá trị Subheader
                    });
                    setLoading(false);
                })
                .catch(err => {
                    setError('Không thể tải thông tin phòng.');
                    setLoading(false);
                });
        }
    }, [mode, id]);

    // --- LOGIC 2: Xử lý thay đổi Form ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'adults' || name === 'children' ? Number(value) : value
        }));
    };

    // --- LOGIC 3: Xử lý Submit Form (CREATE hoặc UPDATE) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        // Chuẩn bị dữ liệu cuối cùng (Không cần xử lý subheader vì nó là String)
        const finalData = {
            ...formData,
            amenities: formData.amenities.split(',').map(item => item.trim()).filter(item => item),
            images: formData.images.split(',').map(item => item.trim()).filter(item => item),
        };

        if (!config) {
            setError('Bạn chưa đăng nhập hoặc phiên đã hết hạn.');
            setLoading(false);
            return;
        }

        try {
            if (mode === 'create') {
                await axios.post(API_URL, finalData, config);
                setSuccess('Tạo phòng mới thành công!');
            } else { 
                await axios.put(`${API_URL}/${id}`, finalData, config);
                setSuccess('Cập nhật phòng thành công!');
            }
            
            setLoading(false);
            setTimeout(() => navigate('/admin/dashboard'), 1000); 

        } catch (err) {
            setLoading(false);
            const msg = err.response ? (err.response.status === 403 ? 'Bạn không có quyền Admin.' : err.response.data.message) : 'Lỗi kết nối server.';
            setError(msg);
        }
    };

    if (!config) {
        return <Alert severity="error">Vui lòng <a href="/admin/login">đăng nhập</a> để truy cập trang quản trị.</Alert>
    }
    if (loading && mode === 'edit') return <Typography align="center" sx={{ mt: 5 }}>Đang tải dữ liệu phòng...</Typography>;


    return (
        <Container component={Paper} sx={{ mt: 4, p: 4, maxWidth: 800 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {mode === 'create' ? 'Tạo Phòng Mới (Create)' : `Chỉnh Sửa Phòng: ${formData.name}`}
            </Typography>
            <Button onClick={() => navigate('/admin/dashboard')} sx={{ mb: 3 }}>
                ← Quay lại Dashboard
            </Button>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
            
            <Box component="form" onSubmit={handleSubmit}>
                {/* --- INPUTS --- */}
                <TextField margin="normal" required fullWidth label="Tên Phòng" name="name" value={formData.name} onChange={handleChange} />
                <TextField margin="normal" required fullWidth label="Giá (VND)" name="price" type="number" value={formData.price} onChange={handleChange} />
                <TextField margin="normal" required fullWidth label="Loại Phòng" name="roomType" value={formData.roomType} onChange={handleChange} />
                
                {/* 2. THÊM TEXTFIELD CHO SUBHEADER */}
                <TextField 
                    margin="normal" 
                    fullWidth 
                    label="Tag Nổi bật (Ví dụ: Ưu đãi đặc biệt)" 
                    name="subheader" 
                    value={formData.subheader || ''} 
                    onChange={handleChange} 
                />
                
                <TextField margin="normal" required fullWidth label="URL Ảnh Bìa (imageUrl)" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                <TextField margin="normal" required fullWidth label="Mô tả" name="description" value={formData.description} onChange={handleChange} multiline rows={3} />
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField margin="normal" required fullWidth label="Số người lớn tối đa" name="adults" type="number" value={formData.adults} onChange={handleChange} />
                    <TextField margin="normal" required fullWidth label="Số trẻ em tối đa" name="children" type="number" value={formData.children} onChange={handleChange} />
                </Box>

                <TextField 
                    margin="normal" 
                    required 
                    fullWidth 
                    label="Tiện nghi (Phân cách bằng dấu phẩy: TV, Minibar, Bồn tắm)" 
                    name="amenities" 
                    value={formData.amenities} 
                    onChange={handleChange} 
                />
                <TextField 
                    margin="normal" 
                    required 
                    fullWidth 
                    label="URL Ảnh chi tiết (Phân cách bằng dấu phẩy: /images/a.jpg, /images/b.jpg)" 
                    name="images" 
                    value={formData.images} 
                    onChange={handleChange} 
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                >
                    {loading ? 'Đang xử lý...' : (mode === 'create' ? 'Tạo Phòng' : 'Lưu Thay Đổi')}
                </Button>
            </Box>
        </Container>
    );
}