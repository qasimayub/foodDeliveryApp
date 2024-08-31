import  connectDb from "../config/db.js";
import {food_list} from './assets/assets.js'
import foodModel from "../models/foodModel.js";

//initialize
connectDb()



const seedDb = async () => {
    await foodModel.deleteMany({})
    for (let i=0; i<food_list.length;i++)
        {
        const food = new foodModel({
            name: food_list[i].name,
            price: food_list[i].price,
            description: food_list[i].description,
            category: food_list[i].category,
            image: `food_${i+1}.png`
        })
        await food.save()
        console.log(`food ${i+1} saved`)
}}

seedDb()