import { useState, useEffect } from "react"; // 💡 Importar useEffect
import { DataTable } from "../../components/DataTable";
import { X } from "lucide-react";
import NavbarManage from "../../components/NavbarManage";
import { motion } from "framer-motion";

// Componente Modal (fora do componente principal)
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const Agendamentos = () => {
  // 1. ESTADOS
  const [appointments, setAppointments] = useState([]); // Dados agora vêm da API
  const [servicesList, setServicesList] = useState([]); // Nova lista para o dropdown de serviços
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
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
          // ⚠️ Assumindo que o backend retorna 'cliente_nome' e 'service_name'
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
    // toLocaleDateString('en-CA') com replace ou manipulação manual é mais seguro
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
        cliente_nome: formData.customer, // ⚠️ Ajustar no backend para clientes
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
        cliente_nome: formData.customer, // ⚠️ Ajustar no backend para clientes
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

  // Função para retornar as classes CSS baseadas no status
  const getStatusStyles = (status) => {
    const styles = {
      'Concluído': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'Agendado': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      'Cancelado': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    };
    return styles[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
  };

  const columns = [
    { key: 'customer', header: 'Cliente' },
    { key: 'service', header: 'Serviço' },
    { key: 'date', header: 'Data' },
    { key: 'time', header: 'Horário' },
    { key: 'observation', header: 'Observação' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(item.status)}`}>
          {item.status}
        </span>
      )
    },
  ];

  return (
    <>
      <div className="bg-[#08060f] text-white font-sans antialiased min-h-screen pt-28 md:pt-16">
        <NavbarManage/>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut"}}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold tracking-tight">Agendamentos</h1>
            <p className="mt-1 text-gray-400">Gerencie os agendamentos da sua empresa</p>
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cliente
            </label>
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Serviço
            </label>
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Data
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Horário
              </label>
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Observação
            </label>
            <textarea
              name="observation"
              value={formData.observation}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
              placeholder="Anote uma observação"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
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
          <button
            onClick={handleSaveNew}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cliente
            </label>
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Serviço
            </label>
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Data
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Horário
              </label>
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Observação
            </label>
            <textarea
              name="observation"
              value={formData.observation}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
              placeholder="Anote uma observação"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
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
          <button
            onClick={handleSaveEdit}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Salvar Alterações
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar Exclusão"
      >
        <p className="text-gray-600 dark:text-gray-400">
          Tem certeza que deseja excluir o agendamento de <strong className="text-gray-900 dark:text-white">{selectedAppointment?.customer}</strong>?
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          Esta ação não pode ser desfeita.
        </p>
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmDelete}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Excluir
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Agendamentos;