import {prisma} from '../config/prisma.js';import {asyncHandler} from '../utils/asyncHandler.js';
export const createFeedback=asyncHandler(async(req,res)=>{const {rating,comment}=req.body;if(!rating)return res.status(400).json({message:'Rating is required'});const feedback=await prisma.feedback.create({data:{userId:req.user.id,rating,comment:comment||''}});res.status(201).json({feedback});});
