//Express & Routing Config
import express from 'express'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

const app = express()
app.use(express.json())
app.use('/auth', authRoutes)
app.use('/users', userRoutes)

export default app