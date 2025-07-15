import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoods, addMood } from "../redux/slices/moodSlice";
import { useNavigate } from "react-router-dom";

const moodOptions = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😞", label: "Sad" },
  { emoji: "😡", label: "Angry" },
  { emoji: "😫", label: "Stressed" },
  { emoji: "✍️", label: "Other" },
];

export default function MoodLogPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { moods, loading } = useSelector((state) => state.mood);
  const { user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ moodType: "", note: "" });
  const [customMood, setCustomMood] = useState("");

  useEffect(() => {
    dispatch(fetchMoods());
  }, [dispatch]);



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEmojiClick = (label) => {
    setForm({ ...form, moodType: label });
    if (label !== "Other") setCustomMood("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const moodType = form.moodType === "Other" ? customMood.trim() : form.moodType;
    if (!moodType) return;

    dispatch(addMood({ moodType, note: form.note }));
    setForm({ moodType: "", note: "" });
    setCustomMood("");
    navigate(`/dashboard/meals?mood=${encodeURIComponent(moodType)}`);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fdfaf5", py: 5 }}>
      <Container maxWidth="sm">
        {/* Header with Greeting and Avatar */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>

          <Box>


            <Typography variant="h5" fontWeight="bold" sx={{ color: "#153b39" }}>
              How are you feeling today?
            </Typography>
          </Box>

        </Box>

        {/* Mood Selection Form */}
        <Card elevation={3} sx={{ borderRadius: 4, px: 2, py: 3 }}>
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ color: "#153b39", fontWeight: "bold" }}
            >
              Log Your Mood
            </Typography>

            {/* Mood Emoji Grid */}
            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} my={3}>
              {moodOptions.map((mood) => (
                <Tooltip title={mood.label} arrow key={mood.label}>
                  <Box
                    onClick={() => handleEmojiClick(mood.label)}
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      backgroundColor: form.moodType === mood.label ? "#e0f2f1" : "#ffffff",
                      border: form.moodType === mood.label ? "2px solid #00796b" : "2px solid #ddd",
                      boxShadow: form.moodType === mood.label ? "0 0 8px rgba(0,121,107,0.3)" : "none",
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "38px",
                        fontFamily: `"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif`,
                      }}
                    >
                      {mood.emoji}
                    </Typography>
                  </Box>

                </Tooltip>
              ))}
            </Box>

            {/* Custom mood input */}
            {form.moodType === "Other" && (
              <TextField
                label="Enter your custom mood"
                value={customMood}
                onChange={(e) => setCustomMood(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            )}

            {/* Optional Note */}
            <TextField
              label="Add a note (optional)"
              name="note"
              value={form.note}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              variant="outlined"
              margin="normal"
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              disabled={!form.moodType || (form.moodType === "Other" && !customMood.trim())}
              sx={{
                mt: 2,
                py: 1.3,
                fontWeight: "bold",
                backgroundColor: "#00796b",
                ":hover": { backgroundColor: "#004d40" },
              }}
            >
              Submit Mood
            </Button>
          </CardContent>
        </Card>

        {/* Recent Moods Section */}
        <Box mt={5}>
          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: "#153b39" }}>
            Past Moods
          </Typography>

          {loading ? (
            <Typography>Loading...</Typography>
          ) : moods.length === 0 ? (
            <Typography>No mood entries yet.</Typography>
          ) : (
            <Card variant="outlined" sx={{ borderRadius: 3 }}>
              <List>
                {moods.map((mood) => (
                  <React.Fragment key={mood.id}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography fontWeight={600}>{mood.moodType}</Typography>
                        }
                        secondary={new Date(mood.date).toLocaleString()}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Card>
          )}
        </Box>
      </Container>
    </Box>
  );
}
