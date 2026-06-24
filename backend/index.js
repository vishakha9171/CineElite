import express from "express"
import cors from 'cors'
import dotenv from "dotenv"
import connectDB from "./configs/db.js" //remember to add .js
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

// Loads .env file contents into process.env.
dotenv.config()

const app=express()
const port=process.env.PORT;

// ⚡ VERCEL SAFE DATABASE MIDDLEWARE:
// This ensures MongoDB connects on the fly when incoming API traffic hits,
// preventing Vercel from timing out during initialization.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Database connection failed" });
  }
});

// middleware
app.use(express.json())
app.use(cors())

app.use(clerkMiddleware())

 
// API routes
app.get("/",(req,res)=>{
    res.send("server is running")
})

app.get('/api/status', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: "CineLite / QuickShow Backend Services Operational." 
  });
});

// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));


// works directly on Render/Railway but requires restructuring for Vercel serverless functions.
// app.listen(port,()=>{
//     console.log(`app is listening on http://localhost:${port}`)
// })

export default app;
