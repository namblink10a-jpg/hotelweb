import React from "react";
import { Box, Button, TextField } from "@mui/material";

export default function BookingForm({ roomId, price }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400, mx: "auto" }}>
      <TextField label="Tên khách" variant="outlined" fullWidth />
      <TextField label="Email" variant="outlined" fullWidth />
      <TextField type="date" label="Ngày nhận phòng" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} />
      <TextField type="date" label="Ngày trả phòng" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} />
      <Button variant="contained" color="primary" size="large">
        Đặt phòng ({price} đ)
      </Button>
    </Box>
  );
}
