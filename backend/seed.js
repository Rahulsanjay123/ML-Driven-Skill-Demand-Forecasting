import mongoose from "mongoose"
import dotenv from "dotenv"
import Skill from "./models/Skill.js"

dotenv.config()

const skillsData = [
    {
        name: "Artificial Intelligence",
        icon: "🧠",
        desc: "AI spans ML, NLP, computer vision, and robotics. The #1 fastest-growing domain in tech globally.",
        demand: "Very High",
        badgeClass: "badge-indigo",
        tags: ["Python", "TensorFlow", "PyTorch", "LLMs"],
        about: "Artificial Intelligence is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning, reasoning, and self-correction. AI applications include expert systems, natural language processing, speech recognition, and machine vision.",
        pros: ["Highest average salaries globally", "Expanding job market with no slowdown", "Applicable across every industry"],
        cons: ["Steep learning curve", "Requires continuous upskilling", "Ethical considerations"],
        steps: [
            { title: "Python Fundamentals", desc: "NumPy, Pandas, Matplotlib, OOP.", duration: "1–2 months" },
            { title: "Mathematics for ML", desc: "Linear algebra, calculus, probability and statistics.", duration: "2–3 months" },
            { title: "Core ML Algorithms", desc: "Regression, classification, SVM, decision trees, ensembles.", duration: "2–3 months" }
        ],
        salary: "$120k–$200k",
        difficulty: "Hard",
        timeline: "8–18 months"
    },
    {
        name: "Cloud Computing",
        icon: "☁️",
        desc: "AWS, Azure, and GCP are the backbone of modern infrastructure. Cloud skills command premium salaries worldwide.",
        demand: "High",
        badgeClass: "badge-cyan",
        tags: ["AWS", "Azure", "GCP", "Kubernetes"],
        about: "Cloud computing is the on-demand availability of computer system resources, especially data storage and computing power, without direct active management by the user. Large clouds often have functions distributed over multiple locations, each of which is a data center.",
        pros: ["Consistently high demand", "Clear certification paths", "Enables remote work"],
        cons: ["Cost of cloud sandboxing", "Certifications expire", "Vendor lock-in"],
        steps: [
            { title: "Cloud Fundamentals", desc: "IAM, VPC, compute, storage, databases.", duration: "1 month" },
            { title: "Choose a Provider", desc: "AWS, Azure, or GCP.", duration: "1 month" },
            { title: "Core Services", desc: "EC2/S3/Lambda or equivalents.", duration: "2 months" }
        ],
        salary: "$110k–$175k",
        difficulty: "Medium",
        timeline: "4–10 months"
    },
    {
        name: "Cybersecurity",
        icon: "🔐",
        desc: "3.5M unfilled security roles globally. Ransomware and zero-days create urgent, ongoing demand.",
        demand: "Critical",
        badgeClass: "badge-rose",
        tags: ["Penetration Testing", "SOC", "Zero Trust", "SIEM"],
        about: "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users; or interrupting normal business processes.",
        pros: ["Massive talent shortage", "Highly diverse roles", "Strong enterprise demand"],
        cons: ["High-stress roles", "Constant learning", "On-call responsibilities"],
        steps: [
            { title: "Networking Fundamentals", desc: "TCP/IP, DNS, HTTP, firewalls.", duration: "1 month" },
            { title: "Security Concepts", desc: "CIA triad, cryptography, authentication.", duration: "2 months" },
            { title: "Ethical Hacking", desc: "Nmap, Burp Suite, Metasploit.", duration: "2 months" }
        ],
        salary: "$100k–$160k",
        difficulty: "Medium-Hard",
        timeline: "6–12 months"
    },
    {
        name: "React",
        icon: "🌐",
        desc: "The most popular frontend library. Powering complex, high-performance web applications globally.",
        demand: "High",
        badgeClass: "badge-indigo",
        tags: ["JavaScript", "Components", "Hooks", "Virtual DOM"],
        about: "React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies.",
        pros: ["Visual creative work", "Large community", "React/Next.js skills transfer widely"],
        cons: ["Rapidly changing frameworks", "Performance optimization complex at scale"],
        steps: [
            { title: "HTML & CSS", desc: "Flexbox, Grid, responsive design.", duration: "1 month" },
            { title: "JavaScript Essentials", desc: "ES6+, DOM, async/await.", duration: "2 months" },
            { title: "React Fundamentals", desc: "Components, props, state, hooks.", duration: "2 months" }
        ],
        salary: "$90k–$150k",
        difficulty: "Medium",
        timeline: "4–9 months"
    }
]

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/skillforecast")
        console.log("Connected to MongoDB for seeding...")
        
        await Skill.deleteMany({}) // Clear existing skills
        console.log("Cleared existing skills.")

        await Skill.insertMany(skillsData)
        console.log("Successfully seeded database with skills data.")

        mongoose.connection.close()
    } catch (error) {
        console.error("Error seeding database:", error)
    }
}

seedDB()
