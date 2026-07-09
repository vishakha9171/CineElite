import express from "express"
import cors from 'cors'
import dotenv from "dotenv"
import connectDB from "./configs/db.js" //remember to add .js
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import showRouter from "./routes/showRoute.js"
import bookingRouter from './routes/bookingRoute.js'
import adminRouter from "./routes/adminRoute.js"
import userRouter from "./routes/userRoute.js"

// Loads .env file contents into process.env.
dotenv.config()

const app=express()
const port=process.env.PORT;


// middleware
app.use(express.json())
app.use(cors())

app.use(clerkMiddleware())

await connectDB();


// Home API routes
app.get("/",(req,res)=>{
    res.send("server is running")
})
// // Status API routes
app.get('/api/status', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: "CineLite Backend Services Operational." 
  });
});

// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));


// routes
app.use('/api/shows',showRouter)
app.use("/api/booking",bookingRouter)
app.use("/api/admin",adminRouter)
app.use("/api/user",userRouter)


app.listen(port,()=>{
    console.log(`app is listening on http://localhost:${port}`)
})

export default app;
