import express from 'express'
import { addFood, foodList, removeFood } from '../controllers/foodcontroller.js'
import multer from 'multer'

const foodRouter = express.Router()

// Image Storage
const storage = multer.diskStorage({
    destination:'uploads',
    filename: (req,file,cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage})

// add food
foodRouter.post('/add', upload.single('image'), addFood)
foodRouter.get('/list', foodList)
foodRouter.post('/delete', removeFood)


export default foodRouter