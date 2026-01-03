import mongoose from "mongoose";

const chamadoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    concluido: { type: Boolean, deafult: false },
    idFuncionario: { type: mongoose.Schema.Types.ObjectId, ref: "Funcionario", required: true },
    idSuporte: { type: mongoose.Schema.Types.ObjectId, ref: "Suporte" },
    idEmpresa: { type: mongoose.Schema.Types.ObjectId, ref: "Empresa" },
}, { timestamps: true })

export default mongoose.model("Chamado", chamadoSchema);