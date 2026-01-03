import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado ao banco de dados");
    } catch (error) {
        console.log(`Erro ao conectar ao banco de dados: ${error.message}`);
    }
}

export default connectDB;