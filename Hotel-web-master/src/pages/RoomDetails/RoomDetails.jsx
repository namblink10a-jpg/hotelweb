import React, { useState, useEffect } from "react";

import { Container, Box, Typography, Chip, Button } from "@mui/material";

import { useParams } from "react-router-dom";

import axios from "axios";



export default function RoomDetail() {

  const { id } = useParams();

 

  // State để lưu trữ dữ liệu phòng chi tiết

  const [room, setRoom] = useState(null);

  const [isLoading, setIsLoading] = useState(true);



  // Hàm định dạng giá tiền (từ 950000 thành 950.000)

  const formatPrice = (price) => {

    if (typeof price === 'number') {

      return price.toLocaleString('vi-VN');

    }

    return price;

  };



  useEffect(() => {

    const fetchRoomDetail = async () => {

      try {

        // Gọi API lấy chi tiết một phòng bằng ID của MongoDB

        const API_URL = `http://localhost:5000/api/rooms/${id}`;

        const response = await axios.get(API_URL);

       

        setRoom(response.data);

      } catch (error) {

        console.error("Lỗi khi tải chi tiết phòng:", error);

      } finally {

        setIsLoading(false);

      }

    };

   

    if (id) {

        fetchRoomDetail();

    }

  }, [id]);



  // HIỂN THỊ TRẠNG THÁI TẢI VÀ LỖI

  if (isLoading) {

    return (

      <Container sx={{ py: 4 }}>

        <Typography variant="h5">Đang tải chi tiết phòng...</Typography>

      </Container>

    );

  }



  if (!room) {

    return (

      <Container sx={{ py: 4 }}>

        <Typography variant="h5">Không tìm thấy thông tin phòng này.</Typography>

      </Container>

    );

  }



  return (

    <Container sx={{ py: 4 }}>

      {/* Header */}

      <Box sx={{ mb: 3 }}>

        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>

          {room.name}

        </Typography>

        <Typography variant="h6" sx={{ color: "#0066ff" }}>

          {formatPrice(room.price)} đ - {room.roomType}

        </Typography>

      </Box>



      {/* Images */}

      <Box sx={{ display: "flex", gap: 2, overflowX: "auto", mb: 3 }}>

        {/* Lặp qua mảng images từ MongoDB */}

        {room.images.map((img, idx) => (

          <Box

            key={idx}

            component="img"

            src={img}

            alt={`room-${idx}`}

            sx={{

              width: 250,

              height: 160,

              objectFit: "cover",

              borderRadius: 2,

              flexShrink: 0,

            }}

          />

        ))}

      </Box>



      {/* Info */}

      <Box sx={{ mb: 3 }}>

        <Typography variant="body1" sx={{ mb: 1 }}>

          {room.description}

        </Typography>

        <Typography variant="body2" sx={{ mb: 1 }}>

          Người lớn: {room.adults} | Trẻ em: {room.children}

        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>

          {/* Lặp qua amenities từ MongoDB */}

          {room.amenities.map((item, idx) => (

            <Chip key={idx} label={item} size="small" sx={{ fontSize: 12 }} />

          ))}

        </Box>

      </Box>



      {/* Booking Form */}

      <Box sx={{ mt: 3 }}>

        <Typography variant="subtitle1" sx={{ mb: 1 }}>

          Đặt phòng ngay:

        </Typography>

        <Button variant="contained" color="primary">

          Đặt phòng - {formatPrice(room.price)} đ

        </Button>

      </Box>

    </Container>

  );

} 