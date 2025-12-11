import React, { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import CardItem from "./Cards/CardItem";
import axios from "axios"; 
// Đã xóa Link khỏi import vì không dùng ở đây nữa
// import { Link } from "react-router-dom"; 

function ListCards() {
  // ... (Không thay đổi logic API)
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ... (logic fetchRooms)
    const fetchRooms = async () => {
      try {
        const API_URL = "http://localhost:5000/api/rooms";
        const response = await axios.get(API_URL);
        setRooms(response.data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách phòng:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">Đang tải danh sách phòng từ server...</Typography>
      </Box>
    );
  }

  if (rooms.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">Không tìm thấy phòng nào trong hệ thống.</Typography>
      </Box>
    );
  }

  // Logic hiển thị
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={4} justifyContent="center">
        {/* LẶP QUA DỮ LIỆU ĐỘNG 'rooms' */}
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={3} key={room._id}>
            {/* ĐÃ XÓA KHỐI <Link> BÊN NGOÀI */}
            
            <CardItem 
              // QUAN TRỌNG: TRUYỀN ID CỦA MONGODB VÀO PROP 'id'
              id={room._id} 
              
              // Truyền các props khác
              title={room.name} 
              subheader={room.subheader || 'Ưu đãi đặc biệt'} 
              image={room.imageUrl} 
              price={room.price} 
              roomType={room.roomType}
              adults={room.adults}
              children={room.children}
              description={room.description}
              amenities={room.amenities}
            />
            
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ListCards;