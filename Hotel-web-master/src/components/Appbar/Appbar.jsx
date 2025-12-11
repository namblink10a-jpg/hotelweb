import Box from '@mui/material/Box'
import { Typography } from "@mui/material"
import Room_info from "./Menus/Room_info"
import Facilities from "./Menus/Facilities"
import Contact from "./Menus/Contact"
import Introduce from "./Menus/Introduce"
import Profiles from "./Menus/Profiles"

export default function AppBar() {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        width: '100%',
        height: (theme) => theme.hotel.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',  // 🔥 Quan trọng
        zIndex: 10,            // 🔥 Đảm bảo hiển thị trên BoardBar
      }}
    >
      <Box>
        <Typography
          sx={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 700,
            fontSize: '2rem',
            letterSpacing: '2px',
            color: '#d4af37',
            textTransform: 'uppercase',
            marginLeft: '40px',
          }}
        >
          H&N Hotel
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          justifyContent: "space-between"
        }}
      >
        <Room_info />
        <Facilities />
        <Contact />
        <Introduce />
        <Profiles />
      </Box>
    </Box>
  )
}
