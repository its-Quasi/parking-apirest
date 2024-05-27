//Express & Routing Config
import express from 'express'
import authRoutes from './routes/auth.routes'
import adminRoutes from './routes/admin.routes'
import partnerRoutes from './routes/partner.routes'
import indicatorRoutes from './routes/indicators.routes'
import { verifyToken } from './middlewares/verifyToken'
import { verifyAdminRole } from './middlewares/verifyRoleAdmin'
import { verifyPartnerRole } from './middlewares/verfyRolPartner'

const app = express()
app.use(express.json())
app.use('/auth', authRoutes)
app.use(verifyToken)
app.use('/indicators', indicatorRoutes) // rutas comunes para indicadores 
app.use('/partner', verifyPartnerRole, partnerRoutes) // rutas del socio
app.use('/admin', verifyAdminRole, adminRoutes) // rutas del admin

export default app