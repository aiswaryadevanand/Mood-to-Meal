const {PrismaClient} = require('@prisma/client');
const prisma= new PrismaClient();

const getRecipeByMood=async (req, res) => {
    const {mood} =req.query;

    try{
        const recipes=await prisma.recipe.findMany({
            where:{moodType:mood}
        });

        if(!recipes.length){
            return res.status(404).json({message:'No recipes found for this mood'});
        }
        res.json(recipes);
    }catch(err){
        res.status(500).json({error:"Failed to fetch recipes", message:err.message});
    }
};

const getRecipeById = async(req, res) => {
    const {id}=req.params;

    try{
        const recipe=await prisma.recipe.findUnique({
            where:{id:parseInt(id)}
        });

        if(!recipe){
            return res.status(404).json({message:"Recipe not found"});
        }
        res.json(recipe);
    }catch(err){
        res.status(500).json({error:"Failed to fetch recipe", message:err.message});
    }
};

module.exports={getRecipeByMood, getRecipeById};