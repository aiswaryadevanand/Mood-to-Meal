import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  AppBar,
  Toolbar,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registration Successful. Please Login");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fdfaf5" }}>
      {/* Top NavBar */}
      <AppBar position="static" elevation={0} sx={{ backgroundColor: "transparent", color: "#111" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#153b39" }}>
            😊 Mood-to-Meal
          </Typography>
          <Stack direction="row" spacing={3}>
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Registration Form */}
      <Container maxWidth="sm">
        <Box mt={8} component={Paper} elevation={4} sx={{ borderRadius: 3, p: 4 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#153b39" }}
          >
            Create an Account
          </Typography>

          <Typography variant="body1" align="center" color="text.secondary" mb={3}>
            Join Mood-to-Meal and discover meals that match your mood 🎯
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              margin="normal"
              value={form.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.3,
                fontWeight: "bold",
                backgroundColor: "#00796b",
                ":hover": { backgroundColor: "#004d40" },
              }}
            >
              Register
            </Button>
          </form>

          <Typography align="center" mt={2} variant="body2">
            Already have an account?{" "}
            <Button
              variant="text"
              onClick={() => navigate("/login")}
              sx={{ fontWeight: "bold", color: "#00796b" }}
            >
              Login
            </Button>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
