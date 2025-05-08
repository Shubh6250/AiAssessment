import { Box, Container, useTheme, useMediaQuery } from "@mui/material";
import { Navbar } from "../common/Navbar";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Container
        maxWidth="xl"
        sx={{
          flex: 1,
          py: 4,
          px: isMobile ? 2 : 4,
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </MotionBox>
      </Container>
    </Box>
  );
};
