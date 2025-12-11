import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import { Link as RouterLink } from "react-router-dom";

// Hàm định dạng giá tiền (từ Number sang String có dấu chấm)
const formatPrice = (price) => {
    if (typeof price === 'number') {
      return price.toLocaleString('vi-VN');
    }
    return price; 
};

export default function CardItem({
  id,
  title,
  subheader,
  image,
  description,
  price,
  adults,
  children,
  roomType,
  amenities,
}) {
  return (
    <Card
      component={RouterLink}
      to={`/room/${id}`} 
      sx={{
        textDecoration: "none", 
        color: "inherit", 
        width: "100%",
        maxWidth: 320,
        borderRadius: 3,
        boxShadow: "0 3px 12px rgba(0,0,0,0.1)",
        overflow: "hidden",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
        },
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Ảnh */}
      <Box sx={{ position: "relative", width: "100%", height: 180 }}>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover", 
            display: "block",
          }}
        />
        {/* Subheader góc phải */}
        {subheader && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              bgcolor: "rgba(0,0,0,0.65)",
              color: "white",
              px: 1.5,
              py: 0.4,
              borderRadius: 1,
              fontSize: "13px",
            }}
          >
            {subheader}
          </Box>
        )}
      </Box>

      {/* Nội dung */}
      <CardContent sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          {/* ĐÃ SỬ DỤNG HÀM ĐỊNH DẠNG GIÁ */}
          <Typography sx={{ color: "#0066ff", fontWeight: 700 }}>{formatPrice(price)} đ</Typography> 
        </Box>

        <Typography variant="body2" sx={{ color: "text.secondary", fontSize: 14 }}>
          {roomType}
        </Typography>

        {/* Người lớn & trẻ em */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <PeopleIcon fontSize="small" sx={{ color: "gray" }} />
            <Typography variant="body2">{adults} người lớn</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <ChildCareIcon fontSize="small" sx={{ color: "gray" }} />
            <Typography variant="body2">{children} trẻ em</Typography>
          </Box>
        </Box>

        {/* Mô tả */}
        <Typography variant="body2" sx={{ color: "text.secondary", fontSize: 13 }}>
          {description}
        </Typography>

        {/* Tiện nghi */}
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Tiện nghi:
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {amenities && amenities.map((item, idx) => ( // Thêm check 'amenities &&' để tránh lỗi nếu dữ liệu bị thiếu
            <Chip
              key={idx}
              label={item}
              size="small"
              variant="outlined"
              sx={{ fontSize: 12, borderRadius: 1, px: 0.5, color: "black" }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}