import { useState, useEffect } from "react"; // 💡 Importar useEffect
import { DataTable } from "../../components/DataTable";
import { X } from "lucide-react";
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

const Agendamentos = () => {
  // 1. ESTADOS
  const [appointments, setAppointments] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento

  // filtros / modais / form
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [formData, setFormData] = useState({
    customer: '',
    serviceId: '', // Usar ID do serviço para API
    serviceName: '', // Nome do serviço para controle do formulário
    date: '', // Usar formato YYYY-MM-DD para input type="date"
    time: '', // Usar formato HH:MM para input type="time"
    observation: '',
    status: 'Agendado'
  });

  const API_URL = "http://localhost:3000"; 

  const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  };

  // --- FUNÇÕES DE FETCH ---

  // 💡 Busca a lista de serviços (necessária para o <select> no modal)
  const fetchServicesList = async () => {
    try {
        const response = await fetch(`${API_URL}/servicos`, { headers: getHeaders() });
        if (!response.ok) {
            throw new Error('Falha ao carregar lista de serviços.');
        }
        const data = await response.json();
        // Mapear para usar no dropdown: id, nome
        setServicesList(data.map(s => ({ id: s.id, name: s.nome }))); 
    } catch (error) {
        console.error("Erro ao carregar serviços:", error.message);
    }
  }

  // 💡 Função principal para carregar agendamentos
  const loadAppointments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/agendamentos`, { headers: getHeaders() });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro ao carregar agendamentos: ${response.status}`);
      }

      const data = await response.json();
      
      const formattedData = data.map(item => {
        const dateTime = new Date(item.data_hora);
        const datePart = dateTime.toLocaleDateString('pt-BR');
        const timePart = dateTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        return {
          id: item.id,
          customer: item.cliente_nome || 'Cliente Não Informado', 
          service: item.service_name || 'Serviço ID ' + item.servico_id, 
          serviceId: item.servico_id, 
          date: datePart,
          time: timePart,
          observation: item.observacao,
          status: item.status,
          rawDateTime: item.data_hora // Manter para facilitar a edição
        };
      });

      setAppointments(formattedData);

    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error.message);
      setAppointments([]); 
    } finally {
      setIsLoading(false);
    }
  };

  // 💡 useEffect para carregar dados na montagem
  useEffect(() => {
    fetchServicesList(); 
    loadAppointments(); 
  }, []);

  // --- HANDLERS DE ESTADO E FORMULÁRIO ---

  const resetForm = () => {
    setFormData({
      customer: '',
      serviceId: '',
      serviceName: '',
      date: '',
      time: '',
      observation: '',
      status: 'Agendado'
    });
  };

  // Atualiza o formData no input/select
  const handleFormChange = (e) => {
      const { name, value } = e.target;
      let update = { [name]: value };

      if (name === 'serviceId') {
        const service = servicesList.find(s => s.id.toString() === value);
        update = {
            serviceId: value,
            serviceName: service ? service.name : ''
        };
      }
      
      setFormData(prev => ({ ...prev, ...update }));
  };

  const handleAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    
    // Formata a data/hora para os inputs type="date" (YYYY-MM-DD) e type="time" (HH:MM)
    const rawDate = new Date(appointment.rawDateTime);
    const datePart = rawDate.toISOString().substring(0, 10); // YYYY-MM-DD
    const timePart = rawDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); // HH:MM

    setFormData({
      customer: appointment.customer,
      serviceId: appointment.serviceId.toString(), // Converter para string para o select
      serviceName: appointment.service, 
      date: datePart, 
      time: timePart, 
      observation: appointment.observation,
      status: appointment.status
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDeleteModalOpen(true);
  };

  // --- HANDLERS CRUD API ---

  // Salvar novo agendamento (POST)
  const handleSaveNew = async () => {
    if (!formData.customer || !formData.serviceId || !formData.date || !formData.time) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }
    
    try {
      // 💡 Converte data e hora para o formato DATETIME esperado pela API (ISO 8601)
      const dataHoraISO = `${formData.date}T${formData.time}:00.000Z`;

      const payload = {
        cliente_nome: formData.customer,
        servico_id: parseInt(formData.serviceId),
        data_hora: dataHoraISO,
        observacao: formData.observation,
        status: formData.status
      };

      const response = await fetch(`${API_URL}/agendamentos`, {
        method: "POST",
        headers: getHeaders(), 
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro ao criar agendamento: ${response.status}`);
      }

      await loadAppointments(); // Recarrega os dados (reload na tela)
      setIsAddModalOpen(false);
      resetForm();
    } catch (error) {
      console.error(error);
      alert(`Erro ao salvar agendamento: ${error.message}`);
    }
  };

  // Salvar edição (PUT)
  const handleSaveEdit = async () => {
    if (!selectedAppointment || !formData.customer || !formData.serviceId || !formData.date || !formData.time) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }
    
    try {
      const dataHoraISO = `${formData.date}T${formData.time}:00.000Z`;

      const payload = {
        cliente_nome: formData.customer,
        servico_id: parseInt(formData.serviceId),
        data_hora: dataHoraISO,
        observacao: formData.observation,
        status: formData.status
      };

      const response = await fetch(`${API_URL}/agendamentos/${selectedAppointment.id}`, {
        method: "PUT",
        headers: getHeaders(), 
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro ao atualizar agendamento: ${response.status}`);
      }

      await loadAppointments(); // Recarrega os dados (reload na tela)
      setIsEditModalOpen(false);
      setSelectedAppointment(null);
      resetForm();
    } catch (error) {
      console.error(error);
      alert(`Erro ao atualizar agendamento: ${error.message}`);
    }
  };

  // Confirmar deleção (DELETE)
  const handleConfirmDelete = async () => {
    if (!selectedAppointment) return;
    
    try {
      const response = await fetch(`${API_URL}/agendamentos/${selectedAppointment.id}`, {
        method: "DELETE",
        headers: getHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro ao excluir agendamento: ${response.status}`);
      }

      await loadAppointments(); // Recarrega os dados (reload na tela)
      setIsDeleteModalOpen(false);
      setSelectedAppointment(null);
    } catch (error) {
      console.error(error);
      alert(`Erro ao excluir agendamento: ${error.message}`);
    }
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

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
          >
             {isLoading ? (
              <div className="text-center text-white py-10">Carregando agendamentos...</div>
            ) : (
              <DataTable
                data={appointments}
                columns={columns}
                title="Lista de Agendamentos"
                searchPlaceholder="Buscar agendamento..."
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                addLabel="Novo Agendamento"
                itemsPerPage={10}
              />
            )}
          </motion.div>
        </main>
      </div>

      {/* Modais renderizados fora do fluxo principal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {setIsAddModalOpen(false); resetForm();}}
        title="Novo Agendamento"
      >
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Cliente</label>
            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Nome do cliente"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Serviço</label>
            <select
              name="serviceId"
              value={formData.serviceId}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Selecione um serviço</option>
              {servicesList.map(service => (
                <option key={service.id} value={service.id}>
                    {service.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">Data</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Horário</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm">Observação</label>
            <textarea
              name="observation"
              value={formData.observation}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
              placeholder="Anote uma observação"
              rows="3"
              placeholder="Anote uma observação"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="Agendado">Agendado</option>
              <option value="Concluído">Concluído</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => {setIsAddModalOpen(false); resetForm();}}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancelar
          </button>

          <button onClick={salvarNovo} className="flex-1 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
            Salvar
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {setIsEditModalOpen(false); setSelectedAppointment(null); resetForm();}}
        title="Editar Agendamento"
      >
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Cliente</label>
            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Nome do cliente"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Serviço</label>
            <select
              name="serviceId"
              value={formData.serviceId}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Selecione um serviço</option>
              {servicesList.map(service => (
                <option key={service.id} value={service.id}>
                    {service.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">Data</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Horário</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm">Observação</label>
            <textarea
              name="observation"
              value={formData.observation}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
              placeholder="Anote uma observação"
              rows="3"
              placeholder="Anote uma observação"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="Agendado">Agendado</option>
              <option value="Concluído">Concluído</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => {setIsEditModalOpen(false); setSelectedAppointment(null); resetForm();}}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
