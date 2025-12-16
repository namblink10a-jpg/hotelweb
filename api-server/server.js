const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const { ObjectId } = require('mongoose').Types; 
const jwt = require('jsonwebtoken'); 
const User = require('./models/UserModel'); 

const app = express();
const port = 5000; 

// --- Cấu hình Server ---
app.use(cors()); 
app.use(express.json()); // Chỉ cần 1 dòng này là đủ để đọc req.body

// CHUỖI KẾT NỐI MONGODB
const MONGO_URI = "mongodb+srv://namblink10a_db_user:8caczCd7xVg66XJL@hotel-db.jgzeaay.mongodb.net/hotel_booking_app?appName=hotel-db"; 

// --- 1. Kết nối MongoDB ---
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Kết nối MongoDB thành công!'))
    .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// --- 2. Định nghĩa Schema Phòng ---
const roomSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    imageUrl: String,
    amenities: [String],
    adults: Number,         
    children: Number,       
    roomType: String,       
    images: [String]        
});
const Room = mongoose.model('Room', roomSchema, 'rooms'); 

// --- 3. Logic Bảo mật ---
const JWT_SECRET = 'HOTEL_ADMIN_SUPER_SECRET'; 

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '7d' });
};

// Middleware kiểm tra Token
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) return res.status(401).json({ message: 'Người dùng không tồn tại' });
            next(); 
        } catch (error) {
            return res.status(401).json({ message: 'Token không hợp lệ.' });
        }
    }
    if (!token) {
        return res.status(401).json({ message: 'Không có Token, vui lòng đăng nhập.' });
    }
};

// Middleware kiểm tra Admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') { 
        next();
    } else {
        res.status(403).json({ message: 'Bạn không có quyền Quản trị (Admin).' });
    }
};

// --- 4. API NGƯỜI DÙNG (USER & AUTH) ---

// ĐĂNG KÝ (REGISTER)
app.post('/api/users', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'Email đã được đăng ký.' });
        }
        
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'user', 
        });

        res.status(201).json({
            token: generateToken(user._id, user.role),
            userName: user.name, // Trả về userName để Front-end hiển thị
            role: user.role,
            message: "Đăng ký thành công!"
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server khi đăng ký.', error: error.message });
    }
});

// ĐĂNG NHẬP (LOGIN)
app.post('/api/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                token: generateToken(user._id, user.role),
                userName: user.name, // Đồng bộ key userName với LoginModal.jsx
                role: user.role,
                email: user.email
            });
        } else {
            res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server khi đăng nhập.' });
    }
});

// --- 5. API PHÒNG (ROOMS) ---

// Lấy danh sách phòng
app.get('/api/rooms', async (req, res) => {
    try {
        const rooms = await Room.find(); 
        res.json(rooms); 
    } catch (error) {
        res.status(500).json({ message: 'Lỗi Server khi lấy danh sách phòng.' });
    }
});

// Lấy chi tiết 1 phòng
app.get('/api/rooms/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) return res.status(400).send('ID không hợp lệ.');
        
        const room = await Room.findById(id); 
        if (!room) return res.status(404).send('Không tìm thấy phòng.');
        res.json(room);
    } catch (error) {
        res.status(500).send('Lỗi Server.');
    }
});

// CRUD Phòng (Chỉ Admin)
app.post('/api/rooms', protect, isAdmin, async (req, res) => {
    try {
        const room = new Room(req.body);
        await room.save();
        res.status(201).json(room);
    } catch (error) {
        res.status(400).json({ message: 'Dữ liệu không hợp lệ.' });
    }
});

app.put('/api/rooms/:id', protect, isAdmin, async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!room) return res.status(404).json({ message: 'Không tìm thấy phòng.' });
        res.json(room);
    } catch (error) {
        res.status(400).json({ message: 'Cập nhật thất bại.' });
    }
});

app.delete('/api/rooms/:id', protect, isAdmin, async (req, res) => {
    try {
        const result = await Room.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: 'Không tìm thấy.' });
        res.json({ message: 'Đã xóa phòng.' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server.' });
    }
});

// Khởi động Server
app.listen(port, () => {
    console.log(`🚀 Server API đang chạy tại http://localhost:${port}`);
});