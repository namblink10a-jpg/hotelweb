import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function GuestSelector({ adults, setAdults, children, setChildren }) {
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Người lớn</InputLabel>
        <Select value={adults} label="Người lớn" onChange={(e) => setAdults(e.target.value)}>
          {[...Array(10).keys()].map((num) => (
            <MenuItem key={num + 1} value={num + 1}>
              {num + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Trẻ em</InputLabel>
        <Select value={children} label="Trẻ em" onChange={(e) => setChildren(e.target.value)}>
          {[...Array(10).keys()].map((num) => (
            <MenuItem key={num} value={num}>
              {num}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
