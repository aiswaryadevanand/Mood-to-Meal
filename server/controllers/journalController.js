const {PrismaClient} = require('@prisma/client');
const prisma=new PrismaClient();

const addJournal=async (req,res) => {
    const {moodType, meal, note} = req.body;
    const userId=req.user.userId;

    try{
        const journal=await prisma.journal.create({
            data:{moodType, meal, note, userId},
        });
        res.status(201).json(journal);
    }catch(err){
        res.status(500).json({error:'Failed to add journal',message:err.message});
    }
};

const getMyJournals=async (req, res) => {
    const userId=req.user.userId;

    try{
        const journals=await prisma.journal.findMany({
            where:{userId},
            orderBy:{date:'desc'},
        });
        res.json(journals);
    }catch(err){
        res.status(500).jsnon({error:'Failed to fetch journals',message:err.message});
    }
};

// DELETE
const deleteJournal = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    await prisma.journal.delete({
      where: {
        id: parseInt(id),
        userId: userId, // Optional: add this only if your Prisma model supports
      },
    });
    res.json({ message: "Journal deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete journal", message: err.message });
  }
};

// PUT
const updateJournal = async (req, res) => {
  const { id } = req.params;
  const { note } = req.body;
  const userId = req.user.userId;

  try {
    const updated = await prisma.journal.update({
      where: {
        id: parseInt(id),
      },
      data: {
        note,
      },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update journal", message: err.message });
  }
};

module.exports={addJournal,getMyJournals,deleteJournal,updateJournal};