import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ChildCareIcon from "@mui/icons-material/ChildCare";

export default function RoomInfo({ description, adults, children, amenities }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <PeopleIcon sx={{ color: "gray" }} />
          <Typography>{adults} người lớn</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <ChildCareIcon sx={{ color: "gray" }} />
          <Typography>{children} trẻ em</Typography>
        </Box>
      </Box>

      <Typography sx={{ color: "text.secondary", mb: 1 }}>{description}</Typography>

      <Typography sx={{ fontWeight: 600, mb: 1 }}>Tiện nghi:</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {amenities.map((item, idx) => (
          <Chip
            key={idx}
            label={item}
            size="small"
            variant="outlined"
            sx={{ fontSize: 12, borderRadius: 1, px: 0.5 }}
          />
        ))}
      </Box>
    </Box>
  );
}
