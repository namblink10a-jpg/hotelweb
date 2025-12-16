import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Import 2 Modal Đăng nhập và Đăng ký
import LoginModal from './LoginModal' 
import RegisterModal from './RegisterModal' // Đảm bảo bạn đã tạo file RegisterModal.jsx

function Profiles() {
    const [open, setOpen] = React.useState(false); // Menu dropdown
    const [openLogin, setOpenLogin] = React.useState(false); // Modal Đăng nhập
    const [openRegister, setOpenRegister] = React.useState(false); // Modal Đăng ký
    
    const [isLoggedIn, setIsLoggedIn] = React.useState(!!localStorage.getItem('token'));
    const userName = localStorage.getItem('userName');

    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        setIsLoggedIn(false);
        setOpen(false);
        window.location.reload(); 
    };

    return (
        <Box>
            <Button
                ref={anchorRef}
                onClick={handleToggle}
                sx={{
                    textTransform: 'none',
                    color: 'inherit',
                    '&:hover': { bgcolor: 'transparent' }
                }}
            >
                <Typography sx={{ fontSize: '16px', fontWeight: 500, display: 'flex', alignItems: 'center' }}>
                    {isLoggedIn ? `Chào, ${userName}` : "Tài khoản"}
                    <span style={{ fontSize: '10px', marginLeft: '4px' }}>▼</span>
                </Typography>
            </Button>

            <Popper
                open={open}
                anchorEl={anchorRef.current}
                placement="bottom-end"
                transition
                disablePortal
                style={{ zIndex: 1300 }}
            >
                {({ TransitionProps }) => (
                    <Grow {...TransitionProps} style={{ transformOrigin: 'right top' }}>
                        <Paper sx={{ width: '220px', mt: 1, borderRadius: 2, overflow: 'hidden' }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <Box sx={{ p: 2, textAlign: 'center' }}>
                                    {!isLoggedIn ? (
                                        <>
                                            {/* NÚT ĐĂNG KÝ ĐÃ ĐƯỢC THÊM SỰ KIỆN */}
                                            <Button 
                                                variant="contained" 
                                                fullWidth 
                                                sx={{ bgcolor: '#26c2d1', mb: 2, fontWeight: 'bold' }}
                                                onClick={() => { 
                                                    setOpenRegister(true); // Mở Modal Đăng ký
                                                    setOpen(false);        // Đóng dropdown
                                                }}
                                            >
                                                Đăng ký
                                            </Button>

                                            <Typography variant="body2" sx={{ color: 'gray', mb: 1 }}>
                                                Quý khách đã có tài khoản?
                                            </Typography>
                                            
                                            <Typography 
                                                variant="body2" 
                                                sx={{ color: '#1976d2', cursor: 'pointer', fontWeight: 'bold' }}
                                                onClick={() => { 
                                                    setOpenLogin(true); 
                                                    setOpen(false); 
                                                }}
                                            >
                                                Đăng nhập ngay
                                            </Typography>
                                        </>
                                    ) : (
                                        <Box sx={{ textAlign: 'left' }}>
                                            <MenuItem onClick={handleClose}>Hồ sơ cá nhân</MenuItem>
                                            <MenuItem onClick={handleClose}>Đơn đặt phòng</MenuItem>
                                            <Divider sx={{ my: 1 }} />
                                            <MenuItem onClick={handleLogout} sx={{ color: 'red' }}>Đăng xuất</MenuItem>
                                        </Box>
                                    )}
                                </Box>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>

            {/* Gọi Modal Đăng nhập */}
            <LoginModal 
                open={openLogin} 
                handleClose={() => setOpenLogin(false)} 
                setIsLoggedIn={setIsLoggedIn} 
            />

            {/* Gọi Modal Đăng ký */}
            <RegisterModal 
                open={openRegister} 
                handleClose={() => setOpenRegister(false)} 
            />
        </Box>
    )
}

export default Profiles;