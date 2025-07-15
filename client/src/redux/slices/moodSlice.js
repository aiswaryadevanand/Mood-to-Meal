import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL='http://localhost:5000/api/moods';

export const fetchMoods=createAsyncThunk('moods/fetchMoods', async (_,{getState}) => {
    const token=getState().auth.token;
    console.log("📦 Fetching moods with token:", token);
    const res=await axios.get(API_URL, {
        headers:{Authorization:`Bearer ${token}`}
    });
    return res.data;
});

export const addMood=createAsyncThunk('mood/addMood', async (moodData, {getState}) => {
    const token=getState().auth.token;
    const res=await axios.post(API_URL, moodData, {
        headers:{Authorization:`Bearer ${token}`}
    });
    return res.data;
});

const moodSlice=createSlice({
    name:'mood',
    initialState:{
        moods:[],
        loading:false,
        error:null
    },
    reducers: {},
    extraReducers:(builder) => {
        builder
        .addCase(fetchMoods.pending, (state) => {
            state.loading=true;
        })
        .addCase(fetchMoods.fulfilled, (state, action) => {
            state.loading=false;
            state.moods=action.payload;
        })
        .addCase(fetchMoods.rejected, (state, action) => {
            state.loading=false;
            state.error=action.error.message;
        })
        .addCase(addMood.fulfilled, (state, action) => {
            state.moods.unshift(action.payload);
        });
    }
});

export default moodSlice.reducer;