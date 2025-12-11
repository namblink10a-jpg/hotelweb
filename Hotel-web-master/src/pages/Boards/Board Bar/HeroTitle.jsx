import React from "react";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";

export default function HeroTitle({}) {
  return (
    <>
      <Typography variant="h3" sx={{ fontWeight: "bold" }}>
        H&N Hotel
      </Typography>
      <Typography variant="h6">Sang trọng • Tiện nghi • Đẳng cấp</Typography>
      <Box sx={{ display: "flex", gap: 1, color: "#FFD700" }}>
      {[...Array(5)].map((_, idx) => (
        <StarIcon key={idx} fontSize="small" />
      ))}
    </Box>
    </>
  );
}
