import React from "react";
import Box from "@mui/material/Box";
import HeroTitle from "./HeroTitle";
import SearchBox from "./SearchBox";
import dayjs from "dayjs";

export default function BoardBar() {
  const [checkInDate, setCheckInDate] = React.useState(dayjs());
  const [checkOutDate, setCheckOutDate] = React.useState(dayjs().add(1, "day"));
  const [rating, setRating] = React.useState(2);
  const [adults, setAdults] = React.useState(1);
  const [children, setChildren] = React.useState(0);

  const handleSearch = () => {
    console.log({ checkInDate, checkOutDate, adults, children });
    // logic hiển thị card / gọi API
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: (theme) => theme.hotel.boardBarHeight,
        backgroundImage: "url(/images/anh4.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* --- Overlay mờ --- */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.1)",
          pointerEvents: "none",   // Chỉ overlay mới bỏ sự kiện
        }}
      />

      {/* --- Nội dung chính (có thể tương tác) --- */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: "100%",
          maxWidth: 1200,
          pointerEvents: "auto",   // Bảo đảm phần này tương tác được
        }}
      >
        <HeroTitle rating={rating} setRating={setRating} />

        <SearchBox
          checkInDate={checkInDate}
          setCheckInDate={setCheckInDate}
          checkOutDate={checkOutDate}
          setCheckOutDate={setCheckOutDate}
          adults={adults}
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}
          onSearch={handleSearch}
        />
      </Box>

    </Box>
  );
}
