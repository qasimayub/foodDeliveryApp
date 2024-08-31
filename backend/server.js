import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRoute.js'
import 'dotenv/config'

// app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDb();

// api endpoint
app.use('/api/food', foodRouter)
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/images', express.static('uploads'))

app.get('/', (req,res)=> {
    res.send('working')
})

// Starting server
app.listen(port, ()=> {
    console.log(`Server started on http://localhost:${port}`)
})
