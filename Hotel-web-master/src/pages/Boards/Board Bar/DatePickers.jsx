import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";

export default function DatePickers({ checkInDate, setCheckInDate, checkOutDate, setCheckOutDate }) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Ngày Nhận Phòng"
          value={checkInDate}
          onChange={setCheckInDate}
          disablePast
          renderInput={(params) => <TextField {...params} sx={{ bgcolor: "white", borderRadius: 1 }} />}
        />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Ngày Trả Phòng"
          value={checkOutDate}
          onChange={setCheckOutDate}
          disablePast
          renderInput={(params) => <TextField {...params} sx={{ bgcolor: "white", borderRadius: 1 }} />}
        />
      </LocalizationProvider>
    </>
  );
}
