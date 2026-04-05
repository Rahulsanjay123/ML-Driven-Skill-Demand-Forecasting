import express from "express"
import Skill from "../models/Skill.js"

const router = express.Router()

// Get all skills
router.get("/", async (req, res) => {
    try {
        const skills = await Skill.find()
        res.json(skills)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch skills" })
    }
})

// Get skill by name
router.get("/:name", async (req, res) => {
    try {
        const skill = await Skill.findOne({ name: new RegExp('^' + req.params.name + '$', 'i') })
        if (!skill) return res.status(404).json({ error: "Skill not found" })
        res.json(skill)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch skill details" })
    }
})

// Search skills (case-insensitive)
router.get("/search/:query", async (req, res) => {
    try {
        const skills = await Skill.find({ 
            name: { $regex: req.params.query, $options: "i" } 
        })
        res.json(skills)
    } catch (error) {
        res.status(500).json({ error: "Search failed" })
    }
})

export default router
