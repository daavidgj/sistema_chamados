import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    action: { type: String, required: true },
    autorType: { type: String, required: true },
    idChamado: { type: mongoose.Schema.Types.ObjectId, ref: "Chamado" },
    idEmpresa: { type: mongoose.Schema.Types.ObjectId, ref: "Empresa" },
})

export default mongoose.model("Log", logSchema);