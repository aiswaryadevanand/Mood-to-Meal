const {PrismaClient}=require('@prisma/client');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const prisma=new PrismaClient();

const registerUser=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        const userExists=await prisma.user.findUnique({where:{email}});
        if(userExists) return res.status(400).json({message:'User alraedy exists'});

        const hashedPassword=await bcrypt.hash(password,10);
        const user=await prisma.user.create({
            data:{name,email,password:hashedPassword},
        });

        res.status(201).json({message:'User Registered Successfully'});
    }catch(err){
        res.status(500).json({message:'Server Error',error:err.message});
    }
};

const loginUser=async(req,res)=>{
    const{email,password}=req.body;
    try{
        const user=await prisma.user.findUnique({where:{email}});
        if(!user) return res.status(404).json({message:'User not found'});

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(401).json({message:'Invalid Credentials'});

        const token=jwt.sign({userId:user.id,email:user.email},process.env.JWT_SECRET,{
            expiresIn:'1d',
    });

    res.json({token,user:{id:user.id,name:user.name,email:user.email}});
    }catch(err){
        res.status(500).json({message:'Server Error',error:err.message});
    }
};

module.exports={registerUser,loginUser};