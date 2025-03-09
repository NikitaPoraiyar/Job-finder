import express from 'express';
import { errorLogger } from '../middleware/log.js';
import { authMiddleware } from '../middleware/auth.js';
import job from '../models/job.js';

const router = express.Router();
//list all jobs
//add filters here about skills and name
//adding pagiation
router.get('/', async(req,res) => {
    const name = req.params.name || "";
    const skills = req.params.skills || [];
    const skillsArray = skills.split(",").map(skill => skill.trim());
    const size = req.params.size || 10;
    const offset = req.params.offset || 0;
    const jobs = await job.find({
        $or: [{ title: { $regex: name, $options: "i" } }, { skills: { $in: skillsArray } }],
        $limit: size,
        $skip: offset
    });
    res.status(200).json(jobs);
});
//create all jobs
router.post('/', authMiddleware, async(req, res) => {
    try{
        console.log("Request: ", req.body);
        const {title, description, location, salary, company, skills, remote, type}= req.body;
        
        const jobSkills = skills.split(",").map(skill => skill.trim());
        const newJob = new job({
            title,
            description,
            location,
            salary,
            company,
            skills: jobSkills,
            remote,
            type,
            createdBy: req.user._id
        });
        await newJob.save();

        
        res.status(200).json(newJob);
    }
    catch(err){
        errorLogger(err, req, res);
    }
});
//get a job by id
router.get('/:id', async(req, res) => {
    try{
        const dbJob = await job.findById(req.params.id);
        if(!dbJob){
            return res.status(404).json({
                error:{
                    message: "Job not found",
                    status: 404
                }
            });
        }
        res.status(200).json(dbJob);
    }
    catch(err){
        errorLogger(err, req, res);
    }
});
// edit a job 
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const dbJob = await job.findById(req.params.id);
        if (!dbJob) {
            return res.status(404).json({ 
                error: { 
                    message: "Job not found", 
                    status: 404 
                } 
            });
        }
        console.log(res.user)
        console.log(dbJob)
        if (dbJob.createdBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ 
                error: { 
                    message: "You are not authorized to update this job", 
                    status: 401 
                } 
            });
        }
        const { title, description, location, salary, company, skills, remote, type } = req.body;
        const jobSkills = skills.split(",").map(skill => skill.trim());
        const updatedJob = await job.findByIdAndUpdate(req.params.id, {
            title,
            description,
            location,
            salary,
            company,
            skills: jobSkills,
            remote,
            type,
            updatedAt: Date.now()
        }, {
            new: true
        });
        res.status(200).json(updatedJob);
        
    } catch (err) {
        errorLogger(err, req, res);
    }
});
//delete a job
router.delete('/:id', authMiddleware, async(req,res) =>{
    try{
        const job = await job.findById(req.params.id);
        if(!job){
            return res.status(404).json({
                error: {
                    message: "Job not found",
                    status: 404
                }
            });
        }
        if(job.createdBy.toString() !== req.user._id.toString()){
            return res.status(401).json({
                error:{
                    message:"You are not authorized to delete this job",
                    status: 401
                }
            });
        }
        await job.remove();
        res.status(200).json({message: "Job deleted successfully"});
    }
    catch(err){
        errorLogger(err,req,res);
    }
})

export default router;
