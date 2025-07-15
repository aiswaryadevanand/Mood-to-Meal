const express=require('express');
const router=express.Router();
const {addMood,getMyMoods}= require('../controllers/moodController');
const authMiddleware=require('../middlewares/authMiddleware');

router.post('/',authMiddleware,addMood);
router.get('/',authMiddleware,getMyMoods);

module.exports=router;
