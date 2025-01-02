import userModel from '../models/userModel.js'

const addToCart = async (req,res) => {
    try {
        const user = await userModel.findById(req.body.userId)
        const cartData = user.cartData
        const {itemId} = req.body;
        if(!cartData[itemId]) {
            cartData[itemId] = 1;
        }
        else {
            cartData[itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        return res.json({success: true, message: "Added to the cart"})
    } catch (error) {
        res.json({success:false, message:"Error"})
    }
}

const removeFromCart = async (req,res) => {
    try {
        const user = await userModel.findById(req.body.userId)
        const cartData = user.cartData
        const {itemId} = req.body;
        if(cartData[itemId]>1) {
            cartData[itemId] -= 1;
        }
        else {
            delete cartData[itemId]
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        return res.json({success: true, message: "Removed from the cart"})
    } catch (error) {
        res.json({success:false, message:"Error"})
    }
}

const listCart = async (req,res) => {
    try {
        const user = await userModel.findById(req.body.userId)
        const cartData = {}
        if (user){
            cartData = user.cartData
        }
        return res.json({success:true, cartData}) 
    } catch (error) {
        res.json({success:false, message:"Error"})
    }
}

export {
    addToCart,
    removeFromCart,
    listCart
}