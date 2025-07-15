import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Stack,
  AppBar,
  Toolbar,
} from "@mui/material";

const meals = [
  { emoji: "😊", label: "Happy", image: "/images/smoothie.png" },
  { emoji: "😐", label: "Neutral", image: "/images/salad.jpg" },
  { emoji: "😞", label: "Sad", image: "/images/chocolate.png" },
  { emoji: "😡", label: "Angry", image: "/images/tacos.png" },
  { emoji: "😫", label: "Stressed", image: "/images/greentea.png" },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: "#fdfaf5", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: "transparent", color: "#153b39" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">
            😊 Mood-to-Meal
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Log In
            </Button>
            <Button color="inherit" onClick={() => navigate("/register")}>
              Sign Up
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={5} alignItems="center">
          {/* Left Side - Text */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              fontWeight={700}
              sx={{ color: "#153b39" }}
              gutterBottom
            >
              Eat What You Feel.
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Personalized meals based on your current mood.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/login")}
              sx={{
                mt: 3,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 600,
                backgroundColor: "#00796b",
                ":hover": {
                  backgroundColor: "#004d40",
                  boxShadow: "0 0 12px rgba(0, 121, 107, 0.3)",
                },
              }}
            >
              Try It Now
            </Button>
          </Grid>

          {/* Right Side - Mood Cards */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {meals.map((item, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Box
                    sx={{
                      textAlign: "center",
                      borderRadius: 3,
                      overflow: "hidden",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                      backgroundColor: "#ffffff",
                      p: 2,
                      height: 250,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <Typography fontSize="2.4rem">{item.emoji}</Typography>
                    <Typography fontWeight="bold" fontSize="1.1rem" mt={1}>
                      {item.label}
                    </Typography>
                    <Box
                      sx={{
                        width: "100%",
                        height: 100,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: 1,
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.label}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
