import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Collapse,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addJournal } from "../redux/slices/journalSlice";

const MealSuggestions = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const mood = params.get("mood") || "";

  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [detailedRecipe, setDetailedRecipe] = useState(null);
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    if (!mood) return;
    axios
      .get(`http://localhost:5000/api/recipes?mood=${mood}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error("❌ Fetch error:", err));
  }, [mood]);

  const handleViewRecipe = async (id) => {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDetailedRecipe(res.data);
      setExpandedId(id);
    } catch (err) {
      console.error("❌ Failed to fetch recipe:", err);
    }
  };

  const handleSaveToJournal = (recipe) => {
    dispatch(
      addJournal({
        moodType: mood,
        meal: recipe.title,
        note: recipe.description,
      })
    );
    setSavedIds((prev) => [...prev, recipe.id]);
  };

 return (
  <Container maxWidth="lg" sx={{ mt: 5 }}>
    {!mood ? (
      <Box textAlign="center" mt={10}>
        <Typography variant="h5" color="text.secondary">
          You have to log your mood first.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3, backgroundColor: "#00796b", ":hover": { backgroundColor: "#004d40" } }}
          onClick={() => window.location.href = "/dashboard/moods"}
        >
          Log Mood
        </Button>
      </Box>
    ) : (
      <>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight="bold" color="#153b39" gutterBottom>
            Recipes for mood: <Chip label={mood} color="success" />
          </Typography>
          <Typography color="text.secondary">
            Discover meals that match your emotions.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card elevation={4} sx={{ borderRadius: 3 }}>
                <Box
  sx={{
    width: "100%",
    height: 180,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fafafa",
    borderBottom: "1px solid #eee",
  }}
>
  <img
    src={recipe.image}
    alt={recipe.title}
    style={{
      maxHeight: "100%",
      maxWidth: "100%",
      objectFit: "contain",
    }}
  />
</Box>

                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {recipe.title}
                  </Typography>
                 <Typography
  variant="body2"
  color="text.secondary"
  sx={{
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "normal",          
    minHeight: "48px",            
    maxWidth: "100%",             
    wordBreak: "break-word",       
  }}
>
  {recipe.description}
</Typography>



                  <Stack direction="column" spacing={1}>
                    <Button
                      variant="contained"
                      onClick={() => handleViewRecipe(recipe.id)}
                      sx={{ backgroundColor: "#00796b", ":hover": { backgroundColor: "#004d40" } }}
                    >
                      {expandedId === recipe.id ? "Hide Recipe" : "View Recipe"}
                    </Button>

                    <Button
                      variant="outlined"
                      onClick={() => handleSaveToJournal(recipe)}
                      disabled={savedIds.includes(recipe.id)}
                    >
                      {savedIds.includes(recipe.id) ? "✓ Saved to Journal" : "Save to Journal"}
                    </Button>
                  </Stack>

                  <Collapse in={expandedId === recipe.id}>
                    {detailedRecipe?.id === recipe.id && (
                      <Box mt={2}>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Ingredients:
                        </Typography>
                        <Typography variant="body2" whiteSpace="pre-line" color="text.secondary">
                          {detailedRecipe.ingredients}
                        </Typography>

                        <Typography variant="subtitle2" fontWeight="bold" mt={2}>
                          Steps:
                        </Typography>
                        <Typography variant="body2" whiteSpace="pre-line" color="text.secondary">
                          {detailedRecipe.steps}
                        </Typography>
                      </Box>
                    )}
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {recipes.length === 0 && (
          <Typography mt={6} align="center" color="text.secondary">
            No recipes found for mood: <strong>{mood}</strong>
          </Typography>
        )}
      </>
    )}
  </Container>
);

};

export default MealSuggestions;
