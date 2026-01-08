import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now, immutable: true },
    action: { type: String, required: true, immutable: true },
    idChamado: { type: mongoose.Schema.Types.ObjectId, ref: "Chamado", required: true, immutable: true },
    idFuncionario: { type: mongoose.Schema.Types.ObjectId, ref: "Funcionario", immutable: true },
    idEmpresa: { type: mongoose.Schema.Types.ObjectId, ref: "Empresa", required: true, immutable: true },
})

export default mongoose.model("Log", logSchema);