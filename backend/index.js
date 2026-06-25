import express from "express"
import cors from 'cors'
import dotenv from "dotenv"
import connectDB from "./configs/db.js" //remember to add .js
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import showRouter from "./routes/showRoute.js"

// Loads .env file contents into process.env.
dotenv.config()

const app=express()
const port=process.env.PORT;


// middleware
app.use(express.json())
app.use(cors())

app.use(clerkMiddleware())

await connectDB();


// API routes
app.get("/",(req,res)=>{
    res.send("server is running")
})

app.get('/api/status', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: "CineLite Backend Services Operational." 
  });
});

// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));

// routes
app.use('/api/show',showRouter)



app.listen(port,()=>{
    console.log(`app is listening on http://localhost:${port}`)
})

export default app;
