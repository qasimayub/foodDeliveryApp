import mongoose from "mongoose";

const connectDb = async () => {
    await mongoose.connect('mongodb+srv://qasimayubrashid:7NFkEDiSeJ9Hh9zz@cluster0.du3efds.mongodb.net/foodDel').then(()=>console.log('DB connected'))
}

export default connectDb