import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import BoardBar from "./Board Bar/BoardBar";
import AppBar from "../../components/Appbar/Appbar";
import BoardContent from "./Board Content/BoardContent";
import Footer from '../../components/Footer/Footer'
function index() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: "100vh", backgroundColor: "white" }}
    >
      <AppBar />
      <BoardBar />
      <BoardContent />
      <Footer />
    </Container>
  );
}

export default index;
