import React from "react";
import { Box, Typography } from "@mui/material";

export default function RoomHeader({ title, price, roomType }) {
  return (
    <Box sx={{ mb: 3, textAlign: "center" }}>
      <Typography variant="h4" fontWeight={700} mb={1}>
        {title}
      </Typography>
      <Typography variant="h6" color="primary" mb={0.5}>
        {price} đ / đêm
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {roomType}
      </Typography>
    </Box>
  );
}
