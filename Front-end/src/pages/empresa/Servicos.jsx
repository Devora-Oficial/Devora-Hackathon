import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import NavbarManage from "../../components/NavbarManage";
import { motion } from "framer-motion";

// ------------------------------
// Modal
// ------------------------------
const Modal = ({ isOpen, onClose, title, children, isDarkMode }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`w-full max-w-md rounded-lg shadow-lg overflow-hidden transition-colors ${
          isDarkMode ? "bg-[#1a1725] text-white" : "bg-white text-gray-900"
        }`}
      >
        <div
          className={`flex items-center justify-between p-5 border-b ${
            isDarkMode ? "border-white/20" : "border-gray-200"
          }`}
        >
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className={`transition ${
              isDarkMode
                ? "text-gray-300 hover:text-gray-100"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// ------------------------------
// Form
// ------------------------------
const FormServico = ({ formData, setFormData, onSave, onCancel, isDarkMode }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1 text-sm">Serviço</label>
        <input
          type="text"
          value={formData.servico}
          onChange={(e) => setFormData({ ...formData, servico: e.target.value })}
          className={`w-full px-3 py-2 rounded-md border ${
            isDarkMode
              ? "bg-gray-800 border-gray-600 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }`}
          placeholder="Ex: Corte de cabelo"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm">Preço (R$)</label>
        <input
          type="number"
          value={formData.preco}
          onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
          className={`w-full px-3 py-2 rounded-md border ${
            isDarkMode
              ? "bg-gray-800 border-gray-600 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }`}
          placeholder="Ex: 35.90"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm">Duração</label>
        <input
          type="text"
          value={formData.duracao}
          onChange={(e) => setFormData({ ...formData, duracao: e.target.value })}
          className={`w-full px-3 py-2 rounded-md border ${
            isDarkMode
              ? "bg-gray-800 border-gray-600 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }`}
          placeholder="Ex: 30 min"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm">Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className={`w-full px-3 py-2 rounded-md border ${
            isDarkMode
              ? "bg-gray-800 border-gray-600 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        >
          <option>Ativo</option>
          <option>Inativo</option>
        </select>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={onCancel}
          className={`flex-1 px-4 py-2 rounded-md border ${
            isDarkMode ? "border-gray-600 text-gray-300" : "border-gray-300"
          }`}
        >
          Cancelar
        </button>

        <button
          onClick={onSave}
          className="flex-1 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Salvar
        </button>
      </div>
    </div>
  );
};

// ------------------------------
// Linha da tabela
// ------------------------------
const Linha = ({ item, onEdit, onDelete, isDarkMode }) => (
  <tr className={`${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}`}>
    <td className="px-6 py-4 font-medium w-1/4">{item.servico}</td>
    <td className="px-6 py-4 w-1/6">R$ {Number(item.preco).toFixed(2)}</td>
    <td className="px-6 py-4 w-1/6">{item.duracao}</td>

    <td className="px-6 py-4 w-1/6 text-center">
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold w-24 text-center ${
          item.status === "Ativo"
            ? "bg-green-500/20 text-green-400 border border-green-500/30"
            : "bg-red-500/20 text-red-400 border border-red-500/30"
        }`}
      >
        {item.status}
      </span>
    </td>

    <td className="px-6 py-4 w-1/6">
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => onEdit(item)}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <Edit className="w-4 h-4" />
        </button>

        <button
          onClick={() => onDelete(item)}
          className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 transition"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </td>
  </tr>
);

// ------------------------------
// Página Principal
// ------------------------------
export default function ListaServicos() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => JSON.parse(localStorage.getItem("isDarkMode")) ?? true
  );

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const [servicos, setServicos] = useState([
    { id: 1, servico: "Corte de Cabelo", preco: 25, duracao: "30 min", status: "Ativo" },
    { id: 2, servico: "Escova", preco: 40, duracao: "45 min", status: "Ativo" },
  ]);

  const [search, setSearch] = useState("");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selected, setSelected] = useState(null);

  const [formData, setFormData] = useState({
    servico: "",
    preco: "",
    duracao: "",
    status: "Ativo",
  });

  const filtrados = servicos.filter((p) =>
    p.servico.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setFormData({ servico: "", preco: "", duracao: "", status: "Ativo" });
    setIsAddOpen(true);
  };

  const openEdit = (item) => {
    setSelected(item);
    setFormData(item);
    setIsEditOpen(true);
  };

  const openDelete = (item) => {
    setSelected(item);
    setIsDeleteOpen(true);
  };

  const salvarNovo = () => {
    if (!formData.servico || !formData.preco || !formData.duracao)
      return alert("Preencha tudo!");

    setServicos([...servicos, { id: Date.now(), ...formData }]);
    setIsAddOpen(false);
  };

  const salvarEdicao = () => {
    setServicos(servicos.map((p) => (p.id === selected.id ? formData : p)));
    setIsEditOpen(false);
  };

  const confirmarDelete = () => {
    setServicos(servicos.filter((p) => p.id !== selected.id));
    setIsDeleteOpen(false);
  };

  return (
    <>
      <div
        className={`min-h-screen pt-28 md:pt-16 ${
          isDarkMode ? "bg-[#08060f] text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <NavbarManage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        <main className="max-w-7xl mx-auto px-4 py-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-bold">Serviços</h1>
            <p className="text-gray-400 mt-1">
              Gerencie seus serviços de forma simples
            </p>
          </motion.div>

          {/* Busca + botão */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
            <input
              type="text"
              placeholder="Buscar serviço..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`px-4 py-2 rounded-md border ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />

            <button
              onClick={openAdd}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Novo Serviço
            </button>
          </div>

          {/* Tabela */}
          <div
            className={`overflow-x-auto rounded-lg border ${
              isDarkMode ? "border-white/10" : "border-gray-200"
            }`}
          >
            <table className="w-full">

              {/* 🔥 CABEÇALHO ALINHADO */}
              <thead className={`${isDarkMode ? "bg-[#1a1725]" : "bg-gray-100"}`}>
                <tr>
                  <th className="px-6 py-3 w-1/4 text-left">Serviço</th>
                  <th className="px-6 py-3 w-1/6 text-left">Preço</th>
                  <th className="px-6 py-3 w-1/6 text-left">Duração</th>
                  <th className="px-6 py-3 w-1/6 text-center">Status</th>
                  <th className="px-6 py-3 w-1/6 text-right">Ações</th>
                </tr>
              </thead>

              <tbody>
                {filtrados.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-gray-400">
                      Nenhum serviço encontrado
                    </td>
                  </tr>
                ) : (
                  filtrados.map((item) => (
                    <Linha
                      key={item.id}
                      item={item}
                      onEdit={openEdit}
                      onDelete={openDelete}
                      isDarkMode={isDarkMode}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Modais */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Adicionar Serviço"
        isDarkMode={isDarkMode}
      >
        <FormServico
          formData={formData}
          setFormData={setFormData}
          onSave={salvarNovo}
          onCancel={() => setIsAddOpen(false)}
          isDarkMode={isDarkMode}
        />
      </Modal>

      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Editar Serviço"
        isDarkMode={isDarkMode}
      >
        <FormServico
          formData={formData}
          setFormData={setFormData}
          onSave={salvarEdicao}
          onCancel={() => setIsEditOpen(false)}
          isDarkMode={isDarkMode}
        />
      </Modal>

      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Confirmar Exclusão"
        isDarkMode={isDarkMode}
      >
        <p className="text-gray-400">
          Tem certeza que deseja excluir{" "}
          <strong className="text-white">{selected?.servico}</strong>?
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setIsDeleteOpen(false)}
            className="flex-1 px-4 py-2 rounded-md border border-gray-600 text-gray-300"
          >
            Cancelar
          </button>

          <button
            onClick={confirmarDelete}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Excluir
          </button>
        </div>
      </Modal>
    </>
  );
}
