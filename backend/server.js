const express=require("express")
const authRoutes=require("../backend/routes/auth.routes")
const profileRoutes=require("./routes/profile.routes")
const taskRoutes=require("./routes/task.routes")
const connectDB = require("./config/db")
const cors=require("cors")
require("dotenv").config()
const cookieParser=require("cookie-parser")

const app=express()
connectDB()
let allowedOrigin=["https://auth-task-duqb.vercel.app", "http://localhost:5173"]
app.use(cors({
    origin:allowedOrigin,
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use(cookieParser())
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))
//phle parser rakhna  or call karna baad me routes
app.use("/api/auth",authRoutes)
app.use("/api/tasks",taskRoutes)
app.use("/api",profileRoutes)
const Port=process.env.PORT


app.listen(Port,()=>{
console.log(`server is running on port number ${Port}`)
})