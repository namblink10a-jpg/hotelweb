import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function SearchBox({
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  adults,
  setAdults,
  children,
  setChildren,
  onSearch,
}) {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 3,
        p: 3,
        width: "100%",
        maxWidth: 1000,
        boxShadow: 3,
      }}
    >
      {/* Tiêu đề */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <LocationOnIcon sx={{ color: "primary.main", fontSize: 28 }} />
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
          Tìm Phòng Khách Sạn
        </Typography>
      </Box>

      {/* Các ô nhập */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Ngày nhận phòng"
            value={checkInDate}
            onChange={(newValue) => setCheckInDate(newValue)}
            sx={{ flex: 1, minWidth: 180 }}
          />
          <DatePicker
            label="Ngày trả phòng"
            value={checkOutDate}
            onChange={(newValue) => setCheckOutDate(newValue)}
            sx={{ flex: 1, minWidth: 180 }}
          />
        </LocalizationProvider>

        <TextField
          select
          label="Người lớn"
          value={adults}
          onChange={(e) => setAdults(e.target.value)}
          sx={{ flex: 1, minWidth: 150 }}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <MenuItem key={num} value={num}>
              {num} người
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Trẻ em"
          value={children}
          onChange={(e) => setChildren(e.target.value)}
          sx={{ flex: 1, minWidth: 150 }}
        >
          {[0, 1, 2, 3, 4].map((num) => (
            <MenuItem key={num} value={num}>
              {num} trẻ em
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          onClick={onSearch}
          sx={{
            bgcolor: "#0066ff",
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "16px",
            "&:hover": { bgcolor: "#0052cc" },
          }}
        >
          Tìm Phòng
        </Button>
      </Box>
    </Box>
  );
}
