import mongoose from "mongoose";

const empresaSchema = new mongoose.Schema({
    nome: String,
    idAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },

})

export default mongoose.model("Empresa", empresaSchema)