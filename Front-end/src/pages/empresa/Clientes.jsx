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

const Clientes = () => {
  const [clients, setClients] = useState([
    { id: 1, name: 'Carlos Silva', email: 'carlos@email.com', phone: '(11) 98888-1111', observations: 'Cliente VIP', registeredAt: '19/01/2024' },
    { id: 2, name: 'Ana Paula Santos', email: 'ana@email.com', phone: '(11) 98888-2222', observations: '-', registeredAt: '14/02/2024' },
    { id: 3, name: 'Roberto Oliveira', email: 'roberto@email.com', phone: '(11) 98888-3333', observations: 'Prefere horários matutinos', registeredAt: '09/03/2024' },
    { id: 4, name: 'Fernanda Costa', email: 'fernanda@email.com', phone: '(11) 98888-4444', observations: '-', registeredAt: '04/04/2024' },
    { id: 5, name: 'Lucas Mendes', email: 'lucas@email.com', phone: '(11) 98888-5555', observations: '-', registeredAt: '19/04/2024' },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    observations: '',
    registeredAt: ''
  });

  // Resetar formulário
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      observations: '',
      registeredAt: ''
    });
  };

  // Abrir modal de adicionar
  const handleAdd = () => {
    resetForm();
    // Define data atual automaticamente
    const today = new Date().toLocaleDateString('pt-BR');
    setFormData({ ...formData, registeredAt: today });
    setIsAddModalOpen(true);
  };

  // Abrir modal de editar
  const handleEdit = (client) => {
    setSelectedClient(client);
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      observations: client.observations,
      registeredAt: client.registeredAt
    });
    setIsEditModalOpen(true);
  };

  // Abrir modal de deletar
  const handleDelete = (client) => {
    setSelectedClient(client);
    setIsDeleteModalOpen(true);
  };

  // Salvar novo cliente
  const handleSaveNew = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }
    
    const newClient = {
      id: clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1,
      ...formData
    };
    setClients([...clients, newClient]);
    setIsAddModalOpen(false);
    resetForm();
  };

  // Salvar edição
  const handleSaveEdit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }
    
    setClients(clients.map(client => 
      client.id === selectedClient.id 
        ? { ...client, ...formData }
        : client
    ));
    setIsEditModalOpen(false);
    setSelectedClient(null);
    resetForm();
  };

  // Confirmar deleção
  const handleConfirmDelete = () => {
    setClients(clients.filter(client => client.id !== selectedClient.id));
    setIsDeleteModalOpen(false);
    setSelectedClient(null);
  };

  // Função para pegar inicial do nome
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  // Função para gerar cor aleatória para o avatar
  const getAvatarColor = (name) => {
    const colors = [
      'bg-yellow-500',
      'bg-blue-500',
      'bg-red-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500'
    ];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  const columns = [
    { 
      key: 'name', 
      header: 'Cliente',
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-full ${getAvatarColor(item.name)} flex items-center justify-center text-white font-semibold`}>
            {getInitial(item.name)}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{item.email}</div>
          </div>
        </div>
      )
    },
    { key: 'phone', header: 'Telefone' },
    { key: 'observations', header: 'Observações' },
    { key: 'registeredAt', header: 'Cadastrado em' },
  ];

  return (
    <>
      <div className="bg-[#07060a] text-white font-sans antialiased min-h-screen pt-16">
        <NavbarManage/>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
            <p className="mt-1 text-gray-400">Gerencie os clientes da sua empresa</p>
          </div>

          <DataTable
            data={clients}
            columns={columns}
            title="Lista de Clientes"
            searchPlaceholder="Buscar cliente..."
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            addLabel="Novo Cliente"
            itemsPerPage={10}
          />
        </main>
      </div>

      {/* Modal de Adicionar */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Novo Cliente"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome Completo *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Ex: Carlos Silva"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              E-mail *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="cliente@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Telefone *
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="(11) 98888-8888"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Observações
            </label>
            <textarea
              value={formData.observations}
              onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
              placeholder="Adicione observações sobre o cliente..."
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Data de Cadastro
            </label>
            <input
              type="text"
              value={formData.registeredAt}
              onChange={(e) => setFormData({ ...formData, registeredAt: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="DD/MM/YYYY"
            />
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

      {/* Modal de Editar */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Cliente"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome Completo *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Ex: Carlos Silva"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              E-mail *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="cliente@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Telefone *
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="(11) 98888-8888"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Observações
            </label>
            <textarea
              value={formData.observations}
              onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
              placeholder="Adicione observações sobre o cliente..."
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Data de Cadastro
            </label>
            <input
              type="text"
              value={formData.registeredAt}
              onChange={(e) => setFormData({ ...formData, registeredAt: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="DD/MM/YYYY"
            />
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

      {/* Modal de Deletar */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar Exclusão"
      >
        <p className="text-gray-600 dark:text-gray-400">
          Tem certeza que deseja excluir o cliente <strong className="text-gray-900 dark:text-white">{selectedClient?.name}</strong>?
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          Esta ação não pode ser desfeita e todo o histórico do cliente será perdido.
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

export default Clientes;