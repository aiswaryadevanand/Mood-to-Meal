import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMoods } from "../redux/slices/moodSlice";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  Chip,
  useTheme,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from "recharts";

// 1️⃣ Emoji + color map per mood
const moodDetails = {
  Happy: { emoji: "😊", color: "#fdd835" },
  Neutral: { emoji: "😐", color: "#cfd8dc" },
  Sad: { emoji: "😢", color: "#64b5f6" },
  Angry: { emoji: "😡", color: "#e57373" },
  Relaxed: { emoji: "😌", color: "#81c784" },
  Stressed: { emoji: "😣", color: "#ba68c8" },
  Excited: { emoji: "🤩", color: "#ffb74d" },
  Energetic: { emoji: "⚡", color: "#4dd0e1" }
};

const Analytics = () => {
  const dispatch = useDispatch();
  const { moods } = useSelector((state) => state.mood);
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchMoods());
  }, [dispatch]);

  // 2️⃣ Mood count
  const moodCounts = moods.reduce((acc, mood) => {
    acc[mood.moodType] = (acc[mood.moodType] || 0) + 1;
    return acc;
  }, {});

  // 3️⃣ Format for chart
  const data = Object.keys(moodCounts).map((key) => ({
    mood: key,
    count: moodCounts[key],
    color: moodDetails[key]?.color || "#90a4ae",
    emoji: moodDetails[key]?.emoji || "❓"
  }));

  const total = moods.length;
  const sortedMoods = Object.entries(moodCounts).sort((a, b) => b[1] - a[1]);
  const topCount = sortedMoods[0]?.[1] || 0;

  const topMoods = sortedMoods.filter(([_, count]) => count === topCount);


  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "#153b39" }}>
        📊 Mood Analytics
      </Typography>

      {total === 0 ? (
        <Typography color="text.secondary">No mood data yet.</Typography>
      ) : (
        <>
          {/* Summary Card */}
          <Card sx={{ mb: 4, borderRadius: 3, bgcolor: theme.palette.mode === "dark" ? "grey.900" : "background.paper" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography>Total Moods Logged: <b>{total}</b></Typography>
              <Typography mt={1} component="span">
                Most Frequent Mood:{" "}
                {topMoods.map(([mood, count], index) => (
                  <Chip
                    key={mood}
                    label={`${moodDetails[mood]?.emoji || "❓"} ${mood} (${count} times)`}
                    sx={{ color: "#fff", bgcolor: moodDetails[mood]?.color || "grey", mr: 1 }}
                  />
                ))}
              </Typography>

            </CardContent>
          </Card>

          {/* Mood Breakdown Chart */}
          <Card sx={{ borderRadius: 3, bgcolor: theme.palette.mode === "dark" ? "grey.900" : "background.paper" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Mood Breakdown
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="mood"
                    tickFormatter={(mood) => `${moodDetails[mood]?.emoji || "❓"} ${mood}`}
                    stroke={theme.palette.text.primary}
                  />
                  <YAxis allowDecimals={false} stroke={theme.palette.text.primary} />
                  <Tooltip
                    formatter={(value, name, props) => [`${value} times`, "Logged"]}
                    labelFormatter={(label) => `${moodDetails[label]?.emoji || "❓"} ${label}`}
                  />
                  <Bar dataKey="count">
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}
    </Container>
  );
};

export default Analytics;
