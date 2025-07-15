const express=require('express');
const cors=require('cors');
require('dotenv').config();
const {PrismaClient}=require('@prisma/client');

const authRoutes=require('./routes/authRoutes');
const moodRoutes=require('./routes/moodRoutes');
const journalRoutes=require('./routes/journalRoutes');
const recipeRoutes=require('./routes/recipeRoutes');

const app=express();
const prisma=new PrismaClient();
const PORT=process.env.PORT||5000;

app.use(cors());
app.use(express.json());


app.use('/api/auth',authRoutes);
app.use('/api/moods',moodRoutes);
app.use('/api/journals',journalRoutes);
app.use('/api/recipes',recipeRoutes);

app.get('/',(req,res)=>{
    res.send('Mood-to-Meal API is running');
});

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
});

