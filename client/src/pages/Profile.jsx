import React from "react";
import {
  Container,
  Typography,
  Avatar,
  Box,
  Paper,
  Stack,
  Button
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { moods } = useSelector((state) => state.mood);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Stack spacing={3} alignItems="center">
          <Avatar
            sx={{
              width: 100,
              height: 100,
              fontSize: 40,
              backgroundColor: "#00796b"
            }}
          >
            😊
          </Avatar>

          <Typography variant="h5" fontWeight="bold" color="#153b39">
            {user?.name || "User"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {user?.email}
          </Typography>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="subtitle1" mt={2}>
              You’ve logged <b>{moods.length}</b> moods so far!
            </Typography>
          </Box>

          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
            sx={{
              mt: 3,
              fontWeight: "bold",
              borderRadius: 3,
              px: 4,
              py: 1
            }}
          >
            Logout
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Profile;
