const EmpresaModel = require("./src/models/EmpresaModel");
const AdminModel = require("./src/models/AdminModel");

async function seed() {
  // Criar Admin
  const adminId = await AdminModel.criar({
    nome: "Admin Teste",
    email: "admin@teste.com",
    senha: "123456"
  });
  console.log("Admin criado:", adminId);

  // Criar Empresa
  const empresaId = await EmpresaModel.criar({
    nome: "Empresa Teste",
    email: "empresa@teste.com",
    senha: "123456",
    telefone: "11999999999",
    endereco: "Rua Teste"
  });
  console.log("Empresa criada:", empresaId);
}

seed().then(() => process.exit());
