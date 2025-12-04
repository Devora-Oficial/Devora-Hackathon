import { useState } from "react";
import { DataTable } from "../../components/DataTable";
import { X } from "lucide-react";
import NavbarManage from "../../components/NavbarManage";

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
  const [appointments, setAppointments] = useState([
    { id: 1, customer: 'Carlos Silva', service: 'Corte + Barba', date: '01/12/2024', time: '10:00', status: 'Agendado' },
    { id: 2, customer: 'Ana Paula Santos', service: 'Corte Masculino', date: '01/12/2024', time: '11:00', status: 'Agendado' },
    { id: 3, customer: 'Roberto Oliveira', service: 'Barba Completa', date: '01/12/2024', time: '14:00', status: 'Concluído' },
    { id: 4, customer: 'Fernanda Costa', service: 'Pigmentação', date: '02/12/2024', time: '09:00', status: 'Agendado' },
    { id: 5, customer: 'Lucas Mendes', service: 'Corte Masculino', date: '30/11/2024', time: '16:00', status: 'Cancelado' },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
  const [formData, setFormData] = useState({
    customer: '',
    service: '',
    date: '',
    time: '',
    status: 'Agendado'
  });

  // Resetar formulário
  const resetForm = () => {
    setFormData({
      customer: '',
      service: '',
      date: '',
      time: '',
      status: 'Agendado'
    });
  };

  // Abrir modal de adicionar
  const handleAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  // Abrir modal de editar
  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setFormData({
      customer: appointment.customer,
      service: appointment.service,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status
    });
    setIsEditModalOpen(true);
  };

  // Abrir modal de deletar
  const handleDelete = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDeleteModalOpen(true);
  };

  // Salvar novo agendamento
  const handleSaveNew = () => {
    if (!formData.customer || !formData.service || !formData.date || !formData.time) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
    
    const newAppointment = {
      id: appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1,
      ...formData
    };
    setAppointments([...appointments, newAppointment]);
    setIsAddModalOpen(false);
    resetForm();
  };

  // Salvar edição
  const handleSaveEdit = () => {
    if (!formData.customer || !formData.service || !formData.date || !formData.time) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
    
    setAppointments(appointments.map(app => 
      app.id === selectedAppointment.id 
        ? { ...app, ...formData }
        : app
    ));
    setIsEditModalOpen(false);
    setSelectedAppointment(null);
    resetForm();
  };

  // Confirmar deleção
  const handleConfirmDelete = () => {
    setAppointments(appointments.filter(app => app.id !== selectedAppointment.id));
    setIsDeleteModalOpen(false);
    setSelectedAppointment(null);
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
      <div className="bg-[#07060a] text-white font-sans antialiased min-h-screen pt-28 md:pt-16">
        <NavbarManage/>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Agendamentos</h1>
            <p className="mt-1 text-gray-400">Gerencie os agendamentos da sua empresa</p>
          </div>

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
        </main>
      </div>

      {/* Modais renderizados fora do fluxo principal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Novo Agendamento"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cliente
            </label>
            <input
              type="text"
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Nome do cliente"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Serviço
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Data
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="DD/MM/YYYY"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Horário
              </label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="HH:MM"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
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
            onClick={() => setIsAddModalOpen(false)}
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
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Agendamento"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cliente
            </label>
            <input
              type="text"
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Nome do cliente"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Serviço
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Data
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="DD/MM/YYYY"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Horário
              </label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="HH:MM"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
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
            onClick={() => setIsEditModalOpen(false)}
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