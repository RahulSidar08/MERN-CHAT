import mongoose from "mongoose"
import dotenv from "dotenv"

export const connectDb = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log("Database connected Successfully!")
    } catch (error) {
        return res.status(404).json({
            success : false,
            message : "Error in Database connection",
            Error : error
        })
    }
}