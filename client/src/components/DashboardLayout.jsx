// src/components/DashboardLayout.jsx
import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: "Log Mood", path: "/dashboard/moods" },
    { label: "Meals", path: "/dashboard/meals" },
    { label: "Journal", path: "/dashboard/journals" },
    { label: "Analytics", path: "/dashboard/analytics" },
    { label: "Profile", path: "/dashboard/profile" },

  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 220,
          backgroundColor: "#2e7d71",
          color: "white",
          p: 3,
          pt: 5,
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={4}>
          😊 Mood-to-Meal
        </Typography>
        <Stack spacing={2}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              onClick={() => navigate(item.path)}
              sx={{ justifyContent: "flex-start", color: "white" }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Box>

      {/* Main Content */}
      <Box flex={1} p={3}>
        <DashboardHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
