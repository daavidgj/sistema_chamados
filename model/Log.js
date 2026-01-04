import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    action: { type: String, required: true },
    idChamado: { type: mongoose.Schema.Types.ObjectId, ref: "Chamado", required: true },
    idFuncionario: { type: mongoose.Schema.Types.ObjectId, ref: "Funcionario" },
    idEmpresa: { type: mongoose.Schema.Types.ObjectId, ref: "Empresa", required: true },
})

export default mongoose.model("Log", logSchema);