import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, IconButton, Typography, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function RegisterModal({ open, handleClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError('');
    // 1. Kiểm tra khớp mật khẩu
    if (formData.password !== formData.confirmPassword) {
      return setError('Mật khẩu nhập lại không khớp!');
    }

    try {
      // 2. Gọi API Register (khớp với server.js của bạn)
      const response = await axios.post('http://localhost:5000/api/users', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          handleClose(); // Đóng modal sau 2s thành công
          setSuccess(false);
          setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại, vui lòng thử lại.');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">Đăng ký tài khoản</Typography>
          <IconButton onClick={handleClose}><CloseIcon /></IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>Đăng ký thành công! Đang quay lại...</Alert>}
        
        <TextField name="name" label="Họ và tên" fullWidth margin="normal" variant="outlined" onChange={handleChange} />
        <TextField name="email" label="Email" fullWidth margin="normal" variant="outlined" onChange={handleChange} />
        <TextField name="password" label="Mật khẩu" type="password" fullWidth margin="normal" variant="outlined" onChange={handleChange} />
        <TextField name="confirmPassword" label="Nhập lại mật khẩu" type="password" fullWidth margin="normal" variant="outlined" onChange={handleChange} />
        
        <Button 
          variant="contained" 
          fullWidth 
          sx={{ mt: 3, mb: 2, bgcolor: '#26c2d1', height: '45px' }} 
          onClick={handleRegister}
        >
          Tạo tài khoản
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default RegisterModal;