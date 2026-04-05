import mongoose from "mongoose"

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    icon: { type: String },
    desc: { type: String },
    demand: { type: String },
    badgeClass: { type: String },
    tags: [String],
    about: { type: String },
    pros: [String],
    cons: [String],
    steps: [{
        title: String,
        desc: String,
        duration: String
    }],
    salary: { type: String },
    difficulty: { type: String },
    timeline: { type: String }
})

export default mongoose.model("Skill", SkillSchema)
