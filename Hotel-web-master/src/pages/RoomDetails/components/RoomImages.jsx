import React from "react";
import { Box, CardMedia } from "@mui/material";

export default function RoomImages({ images }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        justifyContent: "center",
        mb: 3,
      }}
    >
      {images.map((img, idx) => (
        <CardMedia
          key={idx}
          component="img"
          image={img}
          alt={`Room image ${idx + 1}`}
          sx={{
            width: { xs: "100%", sm: "48%", md: "31%" },
            height: 200,
            objectFit: "cover",
            borderRadius: 2,
          }}
        />
      ))}
    </Box>
  );
}
