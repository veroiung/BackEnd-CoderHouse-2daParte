import mongoose from "mongoose";
const URI="mongodb+srv://VeroIung:coder2023@cluster0.fctujru.mongodb.net/coder2023?retryWrites=true&w=majority/"
 

const connectToDB = () => {
    try {
        mongoose.connect(URI)
        console.log('connected to DB ecommerce')
    } catch (error) {
        console.log(error);
    }
};

export default connectToDB