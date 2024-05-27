//Express & Routing Config
import express from 'express'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import adminRoutes from './routes/admin.routes'

import { verifyToken } from './middlewares/verifyToken'
import { verifyRole } from './middlewares/verifyRole'

const app = express()
app.use(express.json())
app.use('/auth', authRoutes)
app.use('/partners', /*verifyToken,*/ userRoutes)
app.use('/admin',/* [verifyToken, verifyRole], */ adminRoutes)

export default app