//Express & Routing Config
import express from 'express'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import adminRoutes from './routes/admin.routes'

import { verifyToken } from './middlewares/verifyToken'

const app = express()
app.use(express.json())
app.use('/auth', authRoutes)
app.use('/users', verifyToken, userRoutes)
app.use('/admin', adminRoutes)

export default app