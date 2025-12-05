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
        className={`w-full max-w-md rounded-lg shadow-xl overflow-hidden transition-colors ${
          isDarkMode ? "bg-[#1a1725] text-white" : "bg-white text-gray-900"
        }`}
      >
        <div
          className={`flex items-center justify-between p-6 border-b ${
            isDarkMode ? "border-white/20" : "border-gray-200"
          }`}
        >
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className={`transition ${
              isDarkMode ? "text-gray-300 hover:text-gray-100" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// ------------------------------
// Linha da tabela (reutilizável)
// ------------------------------
const LinhaAgendamento = ({ appointment, onEdit, onDelete, isDarkMode }) => (
  <tr className={`${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}`}>
    <td className="px-6 py-4 w-1/6 font-medium text-sm">{appointment.customer}</td>
    <td className="px-6 py-4 w-1/6 text-sm">{appointment.service}</td>
    <td className="px-6 py-4 w-1/6 text-sm">{appointment.date}</td>
    <td className="px-6 py-4 w-1/6 text-sm">{appointment.time}</td>
    <td className="px-6 py-4 w-1/4 text-sm">{appointment.observation}</td>

    <td className="px-6 py-4 w-1/6 text-center">
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold w-28 inline-block text-center ${
          appointment.status === "Agendado"
            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
            : appointment.status === "Concluído"
            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
        }`}
      >
        {appointment.status}
      </span>
    </td>

    <td className="px-6 py-4 w-1/12">
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => onEdit(appointment)}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          title="Editar"
        >
          <Edit className="w-4 h-4" />
        </button>

        <button
          onClick={() => onDelete(appointment)}
          className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 transition"
          title="Excluir"
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
export default function Agendamentos() {
  // dark mode (igual ao ListaServicos)
  const [isDarkMode, setIsDarkMode] = useState(
    () => JSON.parse(localStorage.getItem("isDarkMode")) ?? true
  );

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // dados iniciais
  const [appointments, setAppointments] = useState([
    { id: 1, customer: "Carlos Silva", service: "Corte + Barba", date: "01/12/2024", time: "10:00", observation: "Corte de cabelo tradicional masculino", status: "Agendado" },
    { id: 2, customer: "Ana Paula Santos", service: "Corte Masculino", date: "01/12/2024", time: "11:00", observation: "Corte de cabelo tradicional masculino", status: "Agendado" },
    { id: 3, customer: "Roberto Oliveira", service: "Barba Completa", date: "01/12/2024", time: "14:00", observation: "Corte de cabelo tradicional masculino", status: "Concluído" },
    { id: 4, customer: "Fernanda Costa", service: "Pigmentação", date: "02/12/2024", time: "09:00", observation: "Corte de cabelo tradicional masculino", status: "Agendado" },
    { id: 5, customer: "Lucas Mendes", service: "Corte Masculino", date: "30/11/2024", time: "16:00", observation: "Corte de cabelo tradicional masculino", status: "Cancelado" },
  ]);

  // filtros / modais / form
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [formData, setFormData] = useState({
    customer: "",
    service: "",
    date: "",
    time: "",
    observation: "",
    status: "Agendado",
  });

  // filtrados exibidos
  const filteredAppointments = appointments.filter((a) =>
    [a.customer, a.service, a.date, a.time, a.observation]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // funções de CRUD
  const openAdd = () => {
    setFormData({ customer: "", service: "", date: "", time: "", observation: "", status: "Agendado" });
    setIsAddOpen(true);
  };

  const openEdit = (appointment) => {
    setSelected(appointment);
    setFormData({ ...appointment });
    setIsEditOpen(true);
  };

  const openDelete = (appointment) => {
    setSelected(appointment);
    setIsDeleteOpen(true);
  };

  const salvarNovo = () => {
    if (!formData.customer || !formData.service || !formData.date || !formData.time) {
      return alert("Preencha tudo!");
    }
    setAppointments([...appointments, { id: Date.now(), ...formData }]);
    setIsAddOpen(false);
  };

  const salvarEdicao = () => {
    setAppointments(appointments.map((p) => (p.id === selected.id ? formData : p)));
    setIsEditOpen(false);
  };

  const confirmarDelete = () => {
    setAppointments(appointments.filter((p) => p.id !== selected.id));
    setIsDeleteOpen(false);
  };

  return (
    <>
      <div className={`min-h-screen pt-28 md:pt-16 ${isDarkMode ? "bg-[#08060f] text-white" : "bg-gray-50 text-gray-900"}`}>
        <NavbarManage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        <main className="max-w-7xl mx-auto px-4 py-10">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h1 className="text-3xl font-bold">Agendamentos</h1>
            <p className="text-gray-400 mt-1">Gerencie os agendamentos da sua empresa</p>
          </motion.div>

          {/* Busca + botão */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
            <input
              type="text"
              placeholder="Buscar agendamento..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`px-4 py-2 rounded-md border ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
            />

            <button onClick={openAdd} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center gap-2">
              <Plus className="w-4 h-4" /> Novo Agendamento
            </button>
          </div>

          {/* ------------------------------ */}
          {/* Tabela (copiada do Serviços, adaptada) */}
          {/* ------------------------------ */}
          <div className={`overflow-x-auto rounded-lg border ${isDarkMode ? "border-white/10" : "border-gray-200"}`}>
            <table className="w-full">
              <thead className={`${isDarkMode ? "bg-[#1a1725]" : "bg-gray-100"}`}>
                <tr>
                  <th className="px-6 py-3 w-1/6 text-left">Cliente</th>
                  <th className="px-6 py-3 w-1/6 text-left">Serviço</th>
                  <th className="px-6 py-3 w-1/6 text-left">Data</th>
                  <th className="px-6 py-3 w-1/6 text-left">Horário</th>
                  <th className="px-6 py-3 w-1/4 text-left">Observação</th>
                  <th className="px-6 py-3 w-1/6 text-center">Status</th>
                  <th className="px-6 py-3 w-1/12 text-right">Ações</th>
                </tr>
              </thead>

              <tbody>
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-gray-400">
                      Nenhum agendamento encontrado
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <LinhaAgendamento
                      key={appointment.id}
                      appointment={appointment}
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

      {/* ------------------------------ MODALS ------------------------------ */}

      {/* Modal Adicionar */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Novo Agendamento" isDarkMode={isDarkMode}>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Cliente</label>
            <input
              type="text"
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              className={`w-full px-3 py-2 rounded-md border ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
              placeholder="Nome do cliente"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Serviço</label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className={`w-full px-3 py-2 rounded-md border ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
            >
              <option value="">Selecione um serviço</option>
              <option value="Corte Masculino">Corte Masculino</option>
              <option value="Corte + Barba">Corte + Barba</option>
              <option value="Barba Completa">Barba Completa</option>
              <option value="Pigmentação">Pigmentação</option>
              <option value="Platinado">Platinado</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">Data</label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={`w-full px-3 py-2 rounded-md border ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                placeholder="DD/MM/YYYY"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Horário</label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className={`w-full px-3 py-2 rounded-md border ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                placeholder="HH:MM"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm">Observação</label>
            <textarea
              value={formData.observation}
              onChange={(e) => setFormData({ ...formData, observation: e.target.value })}
              className={`w-full px-3 py-2 rounded-md border resize-none ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
              rows="3"
              placeholder="Anote uma observação"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className={`w-full px-3 py-2 rounded-md border ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
            >
              <option value="Agendado">Agendado</option>
              <option value="Concluído">Concluído</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setIsAddOpen(false)}
            className={`flex-1 px-4 py-2 rounded-md border ${isDarkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-700"}`}
          >
            Cancelar
          </button>

          <button onClick={salvarNovo} className="flex-1 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
            Salvar
          </button>
        </div>
      </Modal>

      {/* Modal Editar */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Editar Agendamento" isDarkMode={isDarkMode}>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Cliente</label>
            <input
              type="text"
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              className={`w-full px-3 py-2 rounded-md border ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
              placeholder="Nome do cliente"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Serviço</label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className={`w-full px-3 py-2 rounded-md border ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
            >
              <option value="">Selecione um serviço</option>
              <option value="Corte Masculino">Corte Masculino</option>
              <option value="Corte + Barba">Corte + Barba</option>
              <option value="Barba Completa">Barba Completa</option>
              <option value="Pigmentação">Pigmentação</option>
              <option value="Platinado">Platinado</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">Data</label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={`w-full px-3 py-2 rounded-md border ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                placeholder="DD/MM/YYYY"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Horário</label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className={`w-full px-3 py-2 rounded-md border ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                placeholder="HH:MM"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm">Observação</label>
            <textarea
              value={formData.observation}
              onChange={(e) => setFormData({ ...formData, observation: e.target.value })}
              className={`w-full px-3 py-2 rounded-md border resize-none ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
              rows="3"
              placeholder="Anote uma observação"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className={`w-full px-3 py-2 rounded-md border ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
            >
              <option value="Agendado">Agendado</option>
              <option value="Concluído">Concluído</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setIsEditOpen(false)}
            className={`flex-1 px-4 py-2 rounded-md border ${isDarkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-700"}`}
          >
            Cancelar
          </button>

          <button onClick={salvarEdicao} className="flex-1 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
            Salvar Alterações
          </button>
        </div>
      </Modal>

      {/* Modal Deletar */}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Confirmar Exclusão" isDarkMode={isDarkMode}>
        <p className="text-gray-400">
          Tem certeza que deseja excluir{" "}
          <strong className={isDarkMode ? "text-white" : "text-gray-900"}>{selected?.customer}</strong>?
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setIsDeleteOpen(false)}
            className="flex-1 px-4 py-2 rounded-md border border-gray-600 text-gray-300"
          >
            Cancelar
          </button>

          <button onClick={confirmarDelete} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Excluir
          </button>
        </div>
      </Modal>
    </>
  );
}
