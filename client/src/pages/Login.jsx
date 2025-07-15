import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Stack,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      dispatch(loginSuccess({ token: res.data.token, user: res.data.user }));
      alert("Login Successful");
      navigate("/dashboard"); 
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box sx={{ backgroundColor: "#fdfaf5", minHeight: "100vh" }}>
      {/* ✅ Header */}
      <AppBar position="static" elevation={0} sx={{ backgroundColor: "transparent", color: "#153b39" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">
            😊 Mood-to-Meal
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
            <Button color="inherit" onClick={() => navigate("/register")}>Sign Up</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ borderRadius: 4, p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center" color="#153b39">
          Welcome Back 👋
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" mb={3}>
          Log in to explore meals that match your mood
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
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
              ":hover": {
                backgroundColor: "#004d40",
              },
            }}
          >
            Log In
          </Button>

          <Stack direction="row" justifyContent="center" mt={2}>
            <Typography variant="body2">
              Don’t have an account?{" "}
              <Button
                variant="text"
                onClick={() => navigate("/register")}
                sx={{ fontWeight: "bold", color: "#00796b" }}
              >
                Sign Up
              </Button>
            </Typography>
          </Stack>
        </form>
      </Paper>
    </Container>
    </Box>
  );
};

export default Login;
