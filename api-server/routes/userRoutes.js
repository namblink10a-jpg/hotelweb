const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Đảm bảo bạn đã tạo file models/User.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. API Đăng ký (Register)
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Kiểm tra xem email đã tồn tại chưa
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Email này đã được sử dụng" });

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Lưu user mới
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "Đăng ký thành công!" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi Server", error: err.message });
    }
});

// 2. API Đăng nhập (Login)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Tìm user theo email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Tài khoản không tồn tại" });

        // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa trong DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Mật khẩu không chính xác" });

        // Tạo JWT Token (Thay 'SECRET_KEY' bằng 1 chuỗi ký tự bất kỳ của bạn)
        const token = jwt.sign({ id: user._id }, 'YOUR_JWT_SECRET', { expiresIn: '1d' });

        // Trả về Token và tên User cho Frontend
        res.json({
            token,
            userName: user.fullName,
            message: "Đăng nhập thành công"
        });
    } catch (err) {
        res.status(500).json({ message: "Lỗi Server" });
    }
});

module.exports = router;