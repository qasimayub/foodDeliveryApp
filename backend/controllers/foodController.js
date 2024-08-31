import foodModel from "../models/foodModel.js";
import fs from 'fs'


//add food
const addFood = async (req,res) => {
    let image_filename = req.file.filename
    const food = new foodModel ({
        name: req.body.name,
        description: req.body.description,
        image: image_filename,
        price: req.body.price,
        category: req.body.category,
    })
    
    try {
        await food.save()
        res.json({success: true, message: "Food Added"})
    } catch (e) {
        res.json({success: false, message: "Error"})
        console.log(e)
    }
}

//list food
const foodList = async(req,res) => {
    try{
        const foods = await foodModel.find({})
        res.json({success: true, data: foods})
    } catch (e) {
        res.json({success: false, message: "Error"})
        console.log(e)
    }
}

const removeFood = async (req,res) => {
    try{
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, () => {})
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: "Food Removed"})
    } catch (e) {
        res.json({success: false, message: "Error"})
        console.log(e)
    }
}


export {
    addFood,
    foodList,
    removeFood
}