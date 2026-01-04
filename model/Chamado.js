import mongoose from "mongoose";

const chamadoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    status: { type: String, enum: ["aberto", "em_andamento", "aguardando", "concluido"], default: "aberto" },
    idFuncionario: { type: mongoose.Schema.Types.ObjectId, ref: "Funcionario" },
    idSuporte: { type: mongoose.Schema.Types.ObjectId, ref: "Suporte" },
    idEmpresa: { type: mongoose.Schema.Types.ObjectId, ref: "Empresa", required: true },
}, { timestamps: true })

export default mongoose.model("Chamado", chamadoSchema);