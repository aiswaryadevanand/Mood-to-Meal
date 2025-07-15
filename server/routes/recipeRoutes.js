const express=require('express');
const router=express.Router();
const {getRecipeByMood, getRecipeById}=require('../controllers/recipeController')
const authmiddleware=require('../middlewares/authMiddleware');

router.get('/', authmiddleware, getRecipeByMood);

router.get('/:id',authmiddleware, getRecipeById);

module.exports=router;