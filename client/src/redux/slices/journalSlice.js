import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/journals';

export const fetchJournals = createAsyncThunk(
    'journal/fetchJournals',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer: ${token}` }
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const addJournal = createAsyncThunk(
    'journal/addJournal',
    async (journalData, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            const res = await axios.post(API_URL, journalData, {
                headers: { Authorization: `Bearer: ${token}` }
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const deleteJournal = createAsyncThunk("journal/delete", async (id, { getState }) => {
    const token = getState().auth.token;
    await axios.delete(`http://localhost:5000/api/journals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return id;
});

export const updateJournal = createAsyncThunk("journal/update", async ({ id, note }, { getState }) => {
    const token = getState().auth.token;
    const res = await axios.put(`http://localhost:5000/api/journals/${id}`, { note }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
});


const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        journals: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJournals.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchJournals.fulfilled, (state, action) => {
                state.loading = false;
                state.journals = action.payload;
            })
            .addCase(fetchJournals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addJournal.fulfilled, (state, action) => {
                state.journals.unshift(action.payload);
            })
            .addCase(deleteJournal.fulfilled, (state, action) => {
                state.journals = state.journals.filter(j => j.id !== action.payload);
            })
            .addCase(updateJournal.fulfilled, (state, action) => {
                state.journals = state.journals.map(j =>
                    j.id === action.payload.id ? action.payload : j
                );
            });

    }
});

export default journalSlice.reducer;