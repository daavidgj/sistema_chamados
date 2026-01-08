import mongoose from "mongoose";

const funcionarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cargo: { type: String, required: true },
    role: { type: String, default: "funcionario", immutable: true, required: true },
    idEmpresa: { type: mongoose.Schema.Types.ObjectId, ref: "Empresa", immutable: true, required: true },
})

export default mongoose.model("Funcionario", funcionarioSchema);