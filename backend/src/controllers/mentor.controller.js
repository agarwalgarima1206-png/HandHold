import {prisma} from '../config/prisma.js';import {asyncHandler} from '../utils/asyncHandler.js';
export const listMentors=asyncHandler(async(_req,res)=>{const mentors=await prisma.user.findMany({where:{role:'MENTOR'},select:{id:true,name:true,email:true,mentorProfile:true}});res.json({mentors});});
export const myStudents=asyncHandler(async(req,res)=>{const students=await prisma.studentProfile.findMany({where:{mentorId:req.user.id},include:{user:{select:{id:true,name:true,email:true}}}});res.json({students});});
