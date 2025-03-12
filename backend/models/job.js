import mongoose from "mongoose";

const job = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    skills:{
        type:[String],
        required:true
    },
    remote:{
        type:Boolean,
        required:true
    },
    type:{
        type:String,
        enum:['Full Time', 'Part Time', 'Contract', 'Internship'],
        required:true
    },
    logoURL:{
        type: String,
        required: true
    },
    aboutCompany:{
        type: String,
        required:true
    },
    information:{
        type: String,
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.none
    },
    updatedAt:{
        type:Date,
        default:Date.none
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        
    }

});

export default mongoose.model('Job', job);