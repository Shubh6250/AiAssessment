import { Box, keyframes } from "@mui/material";
import { styled } from "@mui/material/styles";

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const BackgroundWrapper = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("/images/dog-pattern.png")',
    opacity: 0.05,
    animation: `${rotate} 60s linear infinite`,
  },
}));

const DogPaw = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "100px",
  height: "100px",
  backgroundImage: 'url("/images/paw-print.png")',
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  opacity: 0.1,
  animation: `${float} 6s ease-in-out infinite`,
}));

export const Background = () => {
  return (
    <BackgroundWrapper>
      <DogPaw sx={{ top: "10%", left: "10%", animationDelay: "0s" }} />
      <DogPaw sx={{ top: "20%", right: "15%", animationDelay: "1s" }} />
      <DogPaw sx={{ bottom: "15%", left: "20%", animationDelay: "2s" }} />
      <DogPaw sx={{ bottom: "25%", right: "25%", animationDelay: "3s" }} />
      <DogPaw sx={{ top: "50%", left: "50%", animationDelay: "4s" }} />
    </BackgroundWrapper>
  );
};
