import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js' // for task routes

const app = express()
app.use(cors({
  origin: ['http://localhost:5173', 'https://toodue-frontend.vercel.app'],
  credentials: true
}))

app.use(express.json()); // Essential for parsing JSON
const port = process.env.PORT

app.use(cookieParser());

app.use('/api/users', userRoutes)
app.use('/api/tasks', taskRoutes) // added for task routes

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Successfully!'))
  .catch((err) => console.error('Connection Error:', err))

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!')
})
 
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})


