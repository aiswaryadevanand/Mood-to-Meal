const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient();

const addMood=async (req,res)=>{
    const {moodType,note}=req.body;
    const userId=req.user.userId;
    try{
        const mood=await prisma.mood.create({
            data:{moodType,note,userId},
        });
        res.status(201).json(mood);
    }catch(err){
        res.status(500).json({error:'Failed to add mood',message:err.message});
    }
};

const getMyMoods=async (req,res)=>{
    const userId=req.user.userId;
    try{
        const moods=await prisma.mood.findMany({
            where:{userId},
            orderBy:{date:'desc'}
        });
        res.json(moods);
    }catch(err){
        res.status(500).json({error:'Failed to fetch moods',message:err.message});
    }
};

module.exports={addMood,getMyMoods};