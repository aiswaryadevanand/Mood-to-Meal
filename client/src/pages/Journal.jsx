import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Button
} from "@mui/material";
import { Delete, Edit, Save, Cancel } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJournals,
  deleteJournal,
  updateJournal
} from "../redux/slices/journalSlice";

const Journal = () => {
  const dispatch = useDispatch();
  const { journals } = useSelector((state) => state.journal);

  const [editId, setEditId] = useState(null);
  const [editNote, setEditNote] = useState("");

  useEffect(() => {
    dispatch(fetchJournals());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this entry?")) {
      dispatch(deleteJournal(id));
    }
  };

  const handleEdit = (entry) => {
    setEditId(entry.id);
    setEditNote(entry.note || "");
  };

  const handleCancel = () => {
    setEditId(null);
    setEditNote("");
  };

  const handleSave = () => {
    dispatch(updateJournal({ id: editId, note: editNote }));
    setEditId(null);
    setEditNote("");
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" mb={3} color="#153b39">
        Food + Mood Journal 📓
      </Typography>
      {journals.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No journal entries yet. Start by saving a meal!
        </Typography>
      ) : (

        <Grid container spacing={3}>
          {journals.map((entry) => (
            <Grid item xs={12} sm={6} key={entry.id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6">{entry.meal}</Typography>
                  <Typography variant="body2" color="#00796b">
                    Mood: {entry.moodType}
                  </Typography>

                  {editId === entry.id ? (
                    <>
                      <TextField
                        fullWidth
                        value={editNote}
                        onChange={(e) => setEditNote(e.target.value)}
                        multiline
                        rows={2}
                        sx={{ my: 1 }}
                      />
                      <Button onClick={handleSave} size="small" sx={{ mr: 1 }} variant="contained">
                        <Save fontSize="small" /> Save
                      </Button>
                      <Button onClick={handleCancel} size="small" variant="outlined">
                        <Cancel fontSize="small" /> Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {entry.note || "No note"}
                      </Typography>
                      <Typography variant="caption" display="block" color="gray" mt={1}>
                        {new Date(entry.date).toLocaleDateString()}
                      </Typography>
                      <IconButton onClick={() => handleEdit(entry)} sx={{ mt: 1 }}>
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(entry.id)} sx={{ mt: 1 }}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Journal;
