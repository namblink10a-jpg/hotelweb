// file: server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const { ObjectId } = require('mongoose').Types; 
// --- REQUIRE THƯ VIỆN BẢO MẬT MỚI ---
const jwt = require('jsonwebtoken'); 
const User = require('./models/UserModel'); 
// ------------------------------------

const app = express();
const port = 5000; 

// CHUỖI KẾT NỐI CỦA BẠN 
const MONGO_URI = "mongodb+srv://namblink10a_db_user:8caczCd7xVg66XJL@hotel-db.jgzeaay.mongodb.net/hotel_booking_app?appName=hotel-db"; 

// --- Cấu hình Server ---
app.use(cors()); 
app.use(express.json()); 

// --- 1. Kết nối MongoDB ---
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Kết nối MongoDB thành công!'))
    .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// --- 2. Định nghĩa Schema (Cấu trúc dữ liệu) ---
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


// -----------------------------------------------------
//          LOGIC BẢO MẬT VÀ PHÂN QUYỀN
// -----------------------------------------------------

const JWT_SECRET = 'HOTEL_ADMIN_SUPER_SECRET'; // KHÓA BÍ MẬT JWT

// Hàm tạo JWT Token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, JWT_SECRET, {
        expiresIn: '7d', 
    });
};

// MIDDLEWARE BẢO VỆ (Kiểm tra Token hợp lệ)
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
            res.status(401).json({ message: 'Token không hợp lệ.' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Không có Token, vui lòng đăng nhập.' });
    }
};

// MIDDLEWARE PHÂN QUYỀN (Kiểm tra vai trò Admin)
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') { 
        next();
    } else {
        res.status(403).json({ message: 'Bạn không có quyền Quản trị (Admin).' });
    }
};

// -----------------------------------------------------
//          API CHUNG (PUBLIC)
// -----------------------------------------------------

app.get('/', (req, res) => {
    res.send('Chào mừng! Server API Hotel đang hoạt động.');
});

// GET Lấy DANH SÁCH phòng (List)
app.get('/api/rooms', async (req, res) => {
    try {
        const rooms = await Room.find(); 
        res.json(rooms); 
    } catch (error) {
        console.error('Lỗi khi truy vấn danh sách:', error);
        res.status(500).send('Lỗi Server khi lấy danh sách phòng.');
    }
});

// GET Lấy CHI TIẾT 1 phòng theo ID (Detail)
app.get('/api/rooms/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).send('ID phòng không hợp lệ.');
        }
        const room = await Room.findById(new ObjectId(id)); 
        if (!room) {
            return res.status(404).send('Không tìm thấy phòng với ID này.');
        }
        res.json(room);
    } catch (error) {
        console.error('Lỗi khi truy vấn chi tiết phòng:', error);
        res.status(500).send('Lỗi Server khi lấy chi tiết phòng.');
    }
});


// -----------------------------------------------------
//          API NGƯỜI DÙNG VÀ ĐĂNG NHẬP (PUBLIC)
// -----------------------------------------------------

// API MỚI: ĐĂNG KÝ (REGISTER) - POST /api/users
app.post('/api/users', async (req, res) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'Email đã được đăng ký.' });
    }
    
    // Mật khẩu sẽ tự động được mã hóa nhờ 'pre-save hook' trong UserModel
    const user = await User.create({
        name,
        email,
        password,
        role: role || 'user', 
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role), 
        });
    } else {
        res.status(400).json({ message: 'Dữ liệu người dùng không hợp lệ.' });
    }
});


// API: ĐĂNG NHẬP (LOGIN) - POST /api/users/login
app.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role), 
        });
    } else {
        res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác' });
    }
});


// -----------------------------------------------------
//          API QUẢN TRỊ PHÒNG (CRUD - ADMIN ONLY)
// -----------------------------------------------------

// API C (Create): Tạo phòng mới
app.post('/api/rooms', protect, isAdmin, async (req, res) => {
    try {
        const room = new Room(req.body);
        const createdRoom = await room.save();
        res.status(201).json(createdRoom);
    } catch (error) {
        console.error("Lỗi khi tạo phòng:", error);
        res.status(400).json({ message: 'Lỗi tạo phòng: Dữ liệu không hợp lệ.' });
    }
});

// API U (Update): Cập nhật phòng
app.put('/api/rooms/:id', protect, isAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).send('ID phòng không hợp lệ.');
        }

        const room = await Room.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true } // {new: true} trả về Document đã cập nhật
        );

        if (!room) {
            return res.status(404).json({ message: 'Không tìm thấy phòng để cập nhật.' });
        }
        res.json(room);

    } catch (error) {
        console.error("Lỗi khi cập nhật phòng:", error);
        res.status(400).json({ message: 'Lỗi cập nhật phòng: Dữ liệu không hợp lệ.' });
    }
});

// API D (Delete): Xóa phòng
app.delete('/api/rooms/:id', protect, isAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).send('ID phòng không hợp lệ.');
        }

        const result = await Room.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Không tìm thấy phòng để xóa.' });
        }

        res.status(200).json({ message: 'Phòng đã được xóa thành công.' });

    } catch (error) {
        console.error("Lỗi khi xóa phòng:", error);
        res.status(500).json({ message: 'Lỗi Server khi xóa phòng.' });
    }
});


// --- Khởi động Server ---
app.listen(port, () => {
    console.log(`🚀 Server API đang chạy tại http://localhost:${port}`);
});