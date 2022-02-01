import express from 'express'
import userRoutes from './routes/user.js'
import adminRoutes from './routes/admin.js'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'
import chalk from 'chalk'
import generateToken from './utils/generateToken.js'
import path from 'path'

const app = express()

//Configs
dotenv.config()
connectDB()

//Parsing Request Body
app.use(express.json())

//Routes
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(chalk.yellow(`Server running on PORT ${PORT}`));
})


