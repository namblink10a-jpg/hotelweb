// file: src/pages/LoginAdmin.jsx

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginAdmin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Gửi yêu cầu đăng nhập đến API Back-end
            const { data } = await axios.post(
                'http://localhost:5000/api/users/login',
                { email, password }
            );

            // 1. Kiểm tra vai trò
            if (data.role !== 'admin') {
                setError('Tài khoản này không phải tài khoản quản trị.');
                return;
            }

            // 2. Lưu Token và thông tin người dùng vào Local Storage
            // Quan trọng: Lưu Token để sử dụng cho các yêu cầu CRUD sau này
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminInfo', JSON.stringify(data));
            
            // 3. Chuyển hướng đến trang Admin Dashboard
            navigate('/admin/dashboard'); 

        } catch (err) {
            // Xử lý lỗi từ server (401 Unauthorized)
            setError(err.response && err.response.data.message
                ? err.response.data.message
                : 'Đăng nhập thất bại. Vui lòng kiểm tra Email/Mật khẩu.'
            );
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            >
                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                    Đăng nhập Quản trị Hệ thống
                </Typography>
                {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={submitHandler} sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Địa chỉ Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mật khẩu"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Đăng nhập
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}