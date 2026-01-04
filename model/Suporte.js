import mongoose from "mongoose";

const suporteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "suporte" },
    idEmpresa: { type: mongoose.Schema.Types.ObjectId, ref: "Empresa" }
})

export default mongoose.model("Suporte", suporteSchema);