import express from "express"
import 'dotenv/config'
import connectDB from "./config/db.js"
import userRoute from "./routes/userRoute.js" 

const app=express()

const PORT=process.env.PORT || 3000


app.use(express.json())

app.use('/user',userRoute)

 
// http://localhost:8000/user/register
// http://localhost:8000/user/verify
// http://localhost:8000/user/login


app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is listening at port ${PORT}`)
})
