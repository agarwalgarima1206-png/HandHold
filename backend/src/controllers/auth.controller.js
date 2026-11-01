import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma.js';
import { asyncHandler } from '../utils/asyncHandler.js';
const tokenFor=user=>jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN||'7d'});
export const signup=asyncHandler(async(req,res)=>{
 const {name,email,password,role='STUDENT'}=req.body;
 if(!name||!email||!password)return res.status(400).json({message:'Name, email and password are required'});
 if(password.length<8)return res.status(400).json({message:'Password must be at least 8 characters'});
 if(!['STUDENT','MENTOR'].includes(role))return res.status(400).json({message:'Invalid role'});
 const existing=await prisma.user.findUnique({where:{email:email.toLowerCase()}});
 if(existing)return res.status(409).json({message:'An account with this email already exists'});
 const passwordHash=await bcrypt.hash(password,12);
 const user=await prisma.user.create({data:{name,email:email.toLowerCase(),passwordHash,role}});
 res.status(201).json({token:tokenFor(user),user:{id:user.id,name:user.name,email:user.email,role:user.role}});
});
export const login=asyncHandler(async(req,res)=>{
 const {email,password}=req.body;if(!email||!password)return res.status(400).json({message:'Email and password are required'});
 const user=await prisma.user.findUnique({where:{email:email.toLowerCase()}});
 if(!user||!(await bcrypt.compare(password,user.passwordHash)))return res.status(401).json({message:'Invalid email or password'});
 res.json({token:tokenFor(user),user:{id:user.id,name:user.name,email:user.email,role:user.role}});
});
export const me=asyncHandler(async(req,res)=>{const user=await prisma.user.findUnique({where:{id:req.user.id},select:{id:true,name:true,email:true,role:true,createdAt:true}});res.json({user});});
