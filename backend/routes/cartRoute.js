import express from "express";
import { addToCart, listCart, removeFromCart } from "../controllers/cartController.js";
import isAuthenticated from "../middleware/auth.js";

const cartRouter = express.Router()

cartRouter.post('/add', isAuthenticated, addToCart)
cartRouter.post('/remove', isAuthenticated, removeFromCart)
cartRouter.get('/list', isAuthenticated, listCart)

export default cartRouter