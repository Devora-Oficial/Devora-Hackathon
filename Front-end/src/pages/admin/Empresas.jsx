import { useState, useEffect, useCallback } from "react"; // Adicionar useEffect e useCallback
import { DataTable } from "../../components/DataTable";
import { X, Building2 } from "lucide-react";
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

const Empresas = () => {
  // Alterar/Remover quando for puxado do banco

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    cep: '',
    status: 'Ativo'
  });

  // Resetar formulário
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      cep: '',
      status: 'Ativo'
    });
  };

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/empresas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      // 1. Tente ler o corpo da resposta UMA ÚNICA VEZ
      // É importante ler o corpo antes de verificar se a resposta está OK,
      // pois precisaremos dela para o erro ou para os dados.
      const responseBody = await response.json(); 

      if (!response.ok) {
        // Se não estiver OK, o responseBody contém os dados do erro
        // responseBody é agora o objeto de erro JSON (errorData)
        throw new Error(responseBody.error || `Erro ao carregar empresas: ${response.status}`);
      }
      
      // 2. Se a resposta estiver OK, o responseBody é o objeto de dados (data)
      const data = responseBody; 
      
      // Mapear dados do backend para o formato usado no frontend (ajustar 'ativo' para 'status')
      const formattedData = data.map(company => ({
        id: company.id,
        name: company.nome,
        email: company.email,
        password: '', 
        phone: company.telefone,
        cep: company.cep,
        status: company.ativo === 1 ? 'Ativo' : 'Inativo', 
      }));

      setCompanies(formattedData);
    } catch (err) {
      console.error("Erro ao buscar empresas:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // Abrir modal de adicionar
  const handleAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  // Abrir modal de editar
  const handleEdit = (company) => {
    setSelectedCompany(company);
    setFormData({
      name: company.name,
      email: company.email,
      password: company.password,
      phone: company.phone,
      cep: company.cep,
      status: company.status
    });
    setIsEditModalOpen(true);
  };

  // Abrir modal de deletar
  const handleDelete = (company) => {
    setSelectedCompany(company);
    setIsDeleteModalOpen(true);
  };

  // Salvar nova empresa
  const handleSaveNew = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.phone || !formData.cep) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }
    
    // Mapear dados do formulário para o formato esperado pelo backend
    const apiData = {
      nome: formData.name,
      email: formData.email,
      senha: formData.password,
      telefone: formData.phone,
      cep: formData.cep
    };
    
    try {
      const response = await fetch('http://localhost:3000/empresas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro ao criar empresa: ${response.status}`);
      }

      // Se a criação for bem-sucedida, feche o modal, resete o formulário e recarregue a lista
      setIsAddModalOpen(false);
      resetForm();
      await fetchCompanies(); // Recarrega a lista
    } catch (err) {
      alert(`Falha ao salvar a nova empresa: ${err.message}`);
    }
  };

  // Salvar edição
  const handleSaveEdit = async () => {
    if (!selectedCompany || !formData.name || !formData.email || !formData.phone || !formData.cep) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você não está autenticado. Por favor, faça login novamente.');
        return;
    }
    
    // Mapear dados do formulário para o formato esperado pelo backend
    const apiData = {
      nome: formData.name,
      email: formData.email,
      // A senha só deve ser enviada se for alterada, mas o modelo está esperando.
      // Se não quiser alterar a senha, remova o campo 'password' do 'formData' e não o envie
      // ou envie a senha atual (se for seguro). Aqui estamos enviando o valor do estado.
      senha: formData.password, 
      telefone: formData.phone,
      cep: formData.cep,
      ativo: formData.status === 'Ativo' ? 1 : 0 // Converte Status para o formato do DB
    };
    
    try {
      // Rota de atualização: PUT /empresas/:id
      const response = await fetch(`http://localhost:3000/empresas/${selectedCompany.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro ao atualizar empresa: ${response.status}`);
      }

      // Se a edição for bem-sucedida, feche o modal, resete o formulário e recarregue a lista
      setIsEditModalOpen(false);
      setSelectedCompany(null);
      resetForm();
      await fetchCompanies(); // Recarrega a lista
    } catch (err) {
      alert(`Falha ao salvar alterações: ${err.message}`);
    }
  };

  // Confirmar deleção
  const handleConfirmDelete = async () => {
    if (!selectedCompany) return;

    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você não está autenticado. Por favor, faça login como admin.');
        return;
    }
    
    try {
      // Rota de deleção: DELETE /empresas/:id
      const response = await fetch(`http://localhost:3000/empresas/${selectedCompany.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro ao excluir empresa: ${response.status}`);
      }

      // Se a exclusão for bem-sucedida, feche o modal, anule a seleção e recarregue a lista
      setIsDeleteModalOpen(false);
      setSelectedCompany(null);
      await fetchCompanies(); // Recarrega a lista
    } catch (err) {
      alert(`Falha ao excluir a empresa: ${err.message}`);
    }
  };

  // Função para retornar as classes CSS baseadas no status
  const getStatusStyles = (status) => {
    const styles = {
      'Ativo': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'Inativo': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    };
    return styles[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
  };

  // Definição da estrutura da table da página (Empresas)
  const columns = [
    { 
      key: 'name', 
      header: 'Empresa',
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
            <Building2 className="h-5 w-5 text-yellow-500" />
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{item.email}</div>
          </div>
        </div>
      )
    },
    { key: 'phone', header: 'Telefone' },
    { key: 'cep', header: 'CEP' },
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
            <h1 className="text-3xl font-bold tracking-tight">Empresas</h1>
            <p className="mt-1 text-gray-400">Gerencie todas as empresas cadastradas na plataforma</p>
          </motion.div>

          {/* Adicionar lógica de carregamento e erro */}
          {loading && (
            <div className="text-center py-10 text-gray-400">
                Carregando empresas...
            </div>
          )}

          {error && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">Erro ao carregar:</span> {error}
            </div>
          )}

          {/* Mostrar tabela apenas se não estiver carregando e não houver erro grave */}
          {!loading && !error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
            >
              <DataTable
                data={companies}
                columns={columns}
                title="Lista de Empresas"
                searchPlaceholder="Buscar empresa..."
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                addLabel="Nova Empresa"
                itemsPerPage={10}
              />
            </motion.div>
          )}
        </main>
      </div>

      {/* Modal de Adicionar */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Nova Empresa"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome da Empresa *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Ex: Barbearia Premium"
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
              placeholder="contato@empresa.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Senha *
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder=""
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
              placeholder="(11) 99999-9999"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              CEP *
            </label>
            <input
              type="text"
              value={formData.cep}
              onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="00000-000"
            />
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
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
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

      {/* Modal de Editar */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Empresa"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome da Empresa *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Ex: Barbearia Premium"
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
              placeholder="contato@empresa.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Senha *
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder=""
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
              placeholder="(11) 99999-9999"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              CEP *
            </label>
            <input
              type="text"
              value={formData.cep}
              onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="00000-000"
            />
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
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
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

      {/* Modal de Deletar */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar Exclusão"
      >
        <p className="text-gray-600 dark:text-gray-400">
          Tem certeza que deseja excluir a empresa <strong className="text-gray-900 dark:text-white">{selectedCompany?.name}</strong>?
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          Esta ação não pode ser desfeita e todos os dados relacionados serão perdidos.
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

export default Empresas;