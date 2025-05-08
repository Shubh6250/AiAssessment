import { Box, Typography, Paper } from "@mui/material";
import { useAuth } from "../hooks/useAuth";

export const Home = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.firstName}!
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          User Details
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </Typography>
          <Typography>
            <strong>Email:</strong> {user.email}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
