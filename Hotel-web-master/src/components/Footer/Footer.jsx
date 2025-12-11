import React from "react";
import { Box, Typography, Grid, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        mt: 8,
        px: { xs: 3, md: 6 },
        py: { xs: 5, md: 8 },
      }}
    >
      <Grid container spacing={4}>
        {/* Logo & brief */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            H&NHotel
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Đặt phòng khách sạn nhanh chóng, tiện lợi, giá tốt nhất cho kỳ nghỉ của bạn.
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Quick Links
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Link href="#" underline="hover" color="text.secondary">
              Trang chủ
            </Link>
            <Link href="#" underline="hover" color="text.secondary">
              Khách sạn
            </Link>
            <Link href="#" underline="hover" color="text.secondary">
              Ưu đãi
            </Link>
            <Link href="#" underline="hover" color="text.secondary">
              Liên hệ
            </Link>
          </Box>
        </Grid>

        {/* Customer Service */}
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Hỗ trợ khách hàng
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Link href="#" underline="hover" color="text.secondary">
              Câu hỏi thường gặp
            </Link>
            <Link href="#" underline="hover" color="text.secondary">
              Chính sách & Điều khoản
            </Link>
            <Link href="#" underline="hover" color="text.secondary">
              Hủy / Hoàn tiền
            </Link>
            <Link href="#" underline="hover" color="text.secondary">
              Liên hệ hỗ trợ
            </Link>
          </Box>
        </Grid>

        {/* Contact & Social */}
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Liên hệ
          </Typography>
          <Typography variant="body2" color="text.secondary">
             Đường Nghiêm Xuân Yêm, Quận Hoàng Mai, Thành phố Hà Nội
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: support@H&NHotel.com
          </Typography>
          <Box sx={{ mt: 1 }}>
            <IconButton color="primary" href="#" size="small">
              <FacebookIcon />
            </IconButton>
            <IconButton color="primary" href="#" size="small">
              <TwitterIcon />
            </IconButton>
            <IconButton color="primary" href="#" size="small">
              <InstagramIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Copyright */}
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="body2" color="text.secondary">
          © 2025 H&NHotel — All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
