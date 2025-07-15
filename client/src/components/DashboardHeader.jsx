// src/components/DashboardHeader.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    else if (hour < 18) return "Good afternoon";
    else return "Good evening";
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
    handleMenuClose();
  };

  return (
    <Box
      sx={{
        mb: 4,
        pb: 2,
        borderBottom: "1px solid #eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Left - Greeting */}
      <Box>
        <Typography variant="h5" fontWeight="bold" sx={{ color: "#153b39" }}>
          {getGreeting()}, {user?.name?.split(" ")[0] || "Friend"} 👋
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome back to Mood-to-Meal
        </Typography>
      </Box>

      {/* Right - Avatar with Menu */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Tooltip title="Account options">
          <IconButton onClick={handleMenuOpen}>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                backgroundColor: "#00796b",
              }}
            >
              <PersonIcon />
            </Avatar>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={() => navigate("/dashboard/profile")}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Stack>
    </Box>
  );
};

export default DashboardHeader;
