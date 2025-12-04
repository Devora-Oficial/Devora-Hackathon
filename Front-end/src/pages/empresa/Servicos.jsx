import { useState, useEffect } from "react";
import { DataTable } from "../../components/DataTable";
import { X } from "lucide-react";
import NavbarManage from "../../components/NavbarManage";
import { motion } from "framer-motion";

// --- Funções Auxiliares de Formatação ---
const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const parseCurrency = (strValue) => {
  // Remove R$, espaços e converte vírgula para ponto
  if (typeof strValue === 'number') return strValue;
  return parseFloat(strValue.replace(/[^\d,]/g, '').replace(',', '.'));
};

// Componente Modal
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

const Servicos = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    valor: '',
    duracao_minutos: '',
    ativo: 1 // 1 para Ativo, 0 para Inativo
  });

  // URL Base da API (ajuste conforme sua porta)
  const API_URL = "http://localhost:3000"; 

  // Função para pegar headers com Token
  const getHeaders = () => {
    const token = localStorage.getItem("authToken"); // Assumindo que o token está salvo aqui
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  };

  // --- CARREGAR DADOS (READ) ---
  async function fetchServices() {
    const token = localStorage.getItem('authToken'); // Ou como você armazena o token
    
    if (!token) {
        // Redireciona imediatamente se não houver token
        throw new Error("Acesso não autorizado. Por favor, faça login novamente."); 
    }

    try {
        const response = await fetch('http://localhost:3000/servicos', {
            method: 'GET',
            headers: {
                // 🔑 O CAMPO CRÍTICO: Incluir o token no formato "Bearer <token>"
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401 || response.status === 403) {
            // Lógica para limpar o token e redirecionar para login
            localStorage.removeItem('authToken');
            // 🛑 Lança o erro que você está vendo no console
            throw new Error("Acesso não autorizado. Por favor, faça login novamente."); 
        }

        if (!response.ok) {
            throw new Error(`Erro de rede: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erro:", error.message);
        throw error;
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  // Resetar formulário
  const resetForm = () => {
    setFormData({
      nome: '',
      descricao: '',
      valor: '',
      duracao_minutos: '',
      ativo: 1
    });
  };

  const handleAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    // Preencher form com dados do serviço selecionado
    setFormData({
      nome: service.name,
      descricao: service.description,
      valor: service.rawPrice,
      duracao_minutos: service.rawDuration,
      ativo: service.status === 'Ativo' ? 1 : 0
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (service) => {
    setSelectedService(service);
    setIsDeleteModalOpen(true);
  };

  // --- CRIAR SERVIÇO (CREATE) ---
  const handleSaveNew = async () => {
    if (!formData.nome || !formData.valor) {
      alert('Preencha os campos obrigatórios!');
      return;
    }

    try {
      const payload = {
        nome: formData.nome,
        descricao: formData.descricao,
        valor: parseCurrency(formData.valor),
        duracao_minutos: parseInt(formData.duracao_minutos) || 30,
        ativo: parseInt(formData.ativo)
      };

      const response = await fetch(`${API_URL}/servicos`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Erro ao criar");

      await fetchServices(); // Recarrega a lista
      setIsAddModalOpen(false);
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar serviço.");
    }
  };

  // --- ATUALIZAR SERVIÇO (UPDATE) ---
  const handleSaveEdit = async () => {
    try {
      const payload = {
        nome: formData.nome,
        descricao: formData.descricao,
        valor: parseCurrency(formData.valor),
        duracao_minutos: parseInt(formData.duracao_minutos),
        ativo: parseInt(formData.ativo)
      };

      const response = await fetch(`${API_URL}/servicos/${selectedService.id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Erro ao atualizar");

      await fetchServices();
      setIsEditModalOpen(false);
      setSelectedService(null);
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar serviço.");
    }
  };

  // --- DELETAR SERVIÇO (DELETE) ---
  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/servicos/${selectedService.id}`, {
        method: "DELETE",
        headers: getHeaders()
      });

      if (!response.ok) throw new Error("Erro ao deletar");

      await fetchServices();
      setIsDeleteModalOpen(false);
      setSelectedService(null);
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir serviço.");
    }
  };

  // ... (Resto do código de estilos e colunas permanece igual)
  const getStatusStyles = (status) => {
    const styles = {
      'Ativo': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'Inativo': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    };
    return styles[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
  };

  const columns = [
    { 
      key: 'name', 
      header: 'Serviço',
      render: (item) => (
        <div className="flex items-center gap-3">
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{item.description}</div>
          </div>
        </div>
      )
    },
    { key: 'price', header: 'Preço' },
    { key: 'duration', header: 'Duração' },
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
            <h1 className="text-3xl font-bold tracking-tight">Serviços</h1>
            <p className="mt-1 text-gray-400">Gerencie os serviços oferecidos pela sua empresa</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
          >
            {/* Adicionado Feedback de Loading */}
            {isLoading ? (
              <div className="text-center text-white py-10">Carregando serviços...</div>
            ) : (
              <DataTable
                data={services}
                columns={columns}
                title="Lista de Serviços"
                searchPlaceholder="Buscar serviço..."
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                addLabel="Novo Serviço"
                itemsPerPage={10}
              />
            )}
          </motion.div>
        </main>
      </div>

      {/* --- MODAL DE ADICIONAR (Atualizado os names dos inputs para bater com formData) --- */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Novo Serviço"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome do Serviço
            </label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Ex: Corte Masculino"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descrição
            </label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
              placeholder="Descreva o serviço"
              rows="3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Preço
              </label>
              <input
                type="number" // Mudado para number
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="Ex: 45.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Duração (minutos)
              </label>
              <input
                type="number" // Mudado para number
                value={formData.duracao_minutos}
                onChange={(e) => setFormData({ ...formData, duracao_minutos: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="30"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={formData.ativo}
              onChange={(e) => setFormData({ ...formData, ativo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="1">Ativo</option>
              <option value="0">Inativo</option>
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

      {/* --- MODAL DE EDITAR (Campos iguais ao de adicionar) --- */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Serviço"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome do Serviço
            </label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descrição
            </label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
              rows="3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Preço
              </label>
              <input
                type="number"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Duração (minutos)
              </label>
              <input
                type="number"
                value={formData.duracao_minutos}
                onChange={(e) => setFormData({ ...formData, duracao_minutos: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={formData.ativo}
              onChange={(e) => setFormData({ ...formData, ativo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="1">Ativo</option>
              <option value="0">Inativo</option>
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

      {/* --- MODAL DE DELETAR (Mantido) --- */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar Exclusão"
      >
        <p className="text-gray-600 dark:text-gray-400">
          Tem certeza que deseja excluir o serviço <strong className="text-gray-900 dark:text-white">{selectedService?.name}</strong>?
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

export default Servicos;