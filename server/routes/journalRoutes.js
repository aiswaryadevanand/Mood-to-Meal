const express=require('express');
const router=express.Router();
const {addJournal, getMyJournals, deleteJournal, updateJournal} = require('../controllers/journalController');
const authMiddleware=require('../middlewares/authMiddleware');

router.post('/',authMiddleware,addJournal);
router.get('/',authMiddleware,getMyJournals);
router.delete('/:id', authMiddleware, deleteJournal);
router.put('/:id', authMiddleware, updateJournal);

module.exports=router;