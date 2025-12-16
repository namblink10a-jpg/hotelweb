import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function LoginModal({ open, handleClose, setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      
      // 1. Lưu token và tên user vào localStorage

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userName', response.data.name);
      
      // 2. Cập nhật trạng thái đã đăng nhập
      setIsLoggedIn(true);
      
      // 3. Đóng bảng và xóa form
      handleClose();
      setEmail(''); setPassword(''); setError('');
      alert("Đăng nhập thành công!");
    } catch (err) {
      setError(err.response?.data?.message || "Email hoặc mật khẩu không đúng");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">Đăng nhập</Typography>
          <IconButton onClick={handleClose}><CloseIcon /></IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          
          <TextField 
            label="Email" 
            variant="outlined" 
            fullWidth 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <TextField 
            label="Mật khẩu" 
            type="password" 
            variant="outlined" 
            fullWidth 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button 
            variant="contained" 
            size="large"
            sx={{ bgcolor: '#26c2d1', '&:hover': { bgcolor: '#1eaab8' }, py: 1.5, fontWeight: 'bold' }}
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>

          <Typography variant="body2" textAlign="center">
            Chưa có tài khoản? <span style={{ color: '#26c2d1', cursor: 'pointer', fontWeight: 'bold' }}>Đăng ký ngay</span>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;