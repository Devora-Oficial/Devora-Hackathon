import { useState, useEffect } from "react";
import { X, Loader2, Save, Trash, Edit, PlusCircle, Search } from "lucide-react";
import { motion } from "framer-motion";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import { getFirestore, doc, getDoc, addDoc, setDoc, updateDoc, deleteDoc, onSnapshot, collection, query, where, getDocs, serverTimestamp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

// --- Placeholder Components para garantir que o código rode (One-File Mandate) ---

const NavbarManage = () => (
    <nav className="fixed top-0 left-0 w-full bg-[#1e1a3f] shadow-lg z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">BarberPro (Gerenciamento)</h1>
            <span className="text-sm text-gray-400 hidden sm:block">Painel de Agendamentos</span>
        </div>
    </nav>
);

const DataTable = ({ data, columns, title, searchPlaceholder, onAdd, onEdit, onDelete, addLabel, itemsPerPage = 10 }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = data.filter(item => 
        Object.values(item).some(value => 
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-gray-700">
            <div className="p-5 flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-semibold text-white">{title}</h2>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-10 pr-4 py-2 bg-gray-700/80 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        />
                    </div>
                    <button
                        onClick={onAdd}
                        className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150 shadow-md whitespace-nowrap"
                    >
                        <PlusCircle className="h-5 w-5 mr-2" />
                        {addLabel}
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700/50">
                        <tr>
                            {columns.map(column => (
                                <th
                                    key={column.key}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                >
                                    {column.header}
                                </th>
                            ))}
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {currentData.length > 0 ? (
                            currentData.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-700/30 transition-colors">
                                    {columns.map(column => (
                                        <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {column.render ? column.render(item) : item[column.key]}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => onEdit(item)}
                                                className="text-yellow-400 hover:text-yellow-300 p-2 rounded-full hover:bg-gray-700 transition"
                                                title="Editar"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => onDelete(item)}
                                                className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-gray-700 transition"
                                                title="Excluir"
                                            >
                                                <Trash className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + 1} className="px-6 py-4 text-center text-gray-400">
                                    Nenhum agendamento encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="p-5 flex justify-end items-center space-x-2 border-t border-gray-700">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-sm rounded-lg bg-gray-600 text-white disabled:opacity-50 hover:bg-gray-500 transition"
                    >
                        Anterior
                    </button>
                    <span className="text-sm text-gray-300">Página {currentPage} de {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-sm rounded-lg bg-gray-600 text-white disabled:opacity-50 hover:bg-gray-500 transition"
                    >
                        Próxima
                    </button>
                </div>
            )}
        </div>
    );
};

// Componente Modal (fora do componente principal)
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-md border border-gray-700"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
};


// --- Componente Principal Agendamentos (com Firebase) ---

const Agendamentos = () => {
    // -------------------------------------------------------------------------
    // 1. FIREBASE & AUTH STATE
    // -------------------------------------------------------------------------
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    // -------------------------------------------------------------------------
    // 2. DATA & CRUD STATE
    // -------------------------------------------------------------------------
    const [appointments, setAppointments] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    
    const [formData, setFormData] = useState({
        customer: '',
        service: '',
        date: '',
        time: '',
        observation: '',
        status: 'Agendado'
    });

    // -------------------------------------------------------------------------
    // 3. FIREBASE INITIALIZATION & AUTHENTICATION
    // -------------------------------------------------------------------------
    useEffect(() => {
        try {
            const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
            const app = initializeApp(firebaseConfig);
            const firestoreDb = getFirestore(app);
            const firebaseAuth = getAuth(app);

            setDb(firestoreDb);
            setAuth(firebaseAuth);

            // Authentication Listener
            const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
                if (user) {
                    setUserId(user.uid);
                    setIsAuthReady(true);
                } else {
                    // Sign in anonymously if no auth token is available (fallback)
                    if (typeof __initial_auth_token !== 'undefined') {
                        await signInWithCustomToken(firebaseAuth, __initial_auth_token);
                    } else {
                        const anonymousUser = await signInAnonymously(firebaseAuth);
                        setUserId(anonymousUser.user.uid);
                    }
                    setIsAuthReady(true);
                }
            });

            return () => unsubscribe();
        } catch (error) {
            console.error("Erro ao inicializar Firebase:", error);
            setErrorMessage("Erro ao inicializar o banco de dados. Verifique a configuração.");
        }
    }, []);

    // -------------------------------------------------------------------------
    // 4. FIRESTORE REALTIME DATA SUBSCRIPTION (onSnapshot)
    // -------------------------------------------------------------------------
    useEffect(() => {
        if (!db || !userId || !isAuthReady) {
            return;
        }

        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        // Collection path for private user data: /artifacts/{appId}/users/{userId}/appointments
        const collectionPath = `artifacts/${appId}/users/${userId}/appointments`;
        const appointmentsCollectionRef = collection(db, collectionPath);
        
        setIsLoadingData(true);
        setErrorMessage(null);

        const unsubscribe = onSnapshot(appointmentsCollectionRef, (snapshot) => {
            try {
                const appointmentsList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                // Sort by date and time (simplistic, assumes MM/DD/YYYY HH:MM)
                appointmentsList.sort((a, b) => {
                    const dateA = new Date(`${a.date.split('/').reverse().join('/')} ${a.time}`);
                    const dateB = new Date(`${b.date.split('/').reverse().join('/')} ${b.time}`);
                    return dateA - dateB;
                });
                
                setAppointments(appointmentsList);
                setIsLoadingData(false);
            } catch (error) {
                console.error("Erro ao carregar agendamentos:", error);
                setErrorMessage("Falha ao carregar dados. Tente recarregar.");
                setIsLoadingData(false);
            }
        });

        return () => unsubscribe();
    }, [db, userId, isAuthReady]); // Dependências cruciais para a query

    // -------------------------------------------------------------------------
    // 5. HELPER FUNCTIONS
    // -------------------------------------------------------------------------

    // Reseta o formulário
    const resetForm = () => {
        setFormData({
            customer: '',
            service: '',
            date: '',
            time: '',
            observation: '',
            status: 'Agendado'
        });
        setErrorMessage(null); // Limpa a mensagem de erro ao resetar
    };

    const notifyError = (msg) => {
        setErrorMessage(msg);
        setTimeout(() => setErrorMessage(null), 5000);
    };

    // Abre modal de adicionar
    const handleAdd = () => {
        resetForm();
        setIsAddModalOpen(true);
    };

    // Abre modal de editar
    const handleEdit = (appointment) => {
        setSelectedAppointment(appointment);
        setFormData({
            customer: appointment.customer,
            service: appointment.service,
            date: appointment.date,
            time: appointment.time,
            observation: appointment.observation,
            status: appointment.status
        });
        setIsEditModalOpen(true);
    };

    // Abre modal de deletar
    const handleDelete = (appointment) => {
        setSelectedAppointment(appointment);
        setIsDeleteModalOpen(true);
    };

    // Salvar novo agendamento (Firestore: addDoc)
    const handleSaveNew = async () => {
        if (!formData.customer || !formData.service || !formData.date || !formData.time) {
            notifyError('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        try {
            const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
            const collectionPath = `artifacts/${appId}/users/${userId}/appointments`;
            await addDoc(collection(db, collectionPath), {
                ...formData,
                createdAt: serverTimestamp(),
            });
            setIsAddModalOpen(false);
            resetForm();
        } catch (error) {
            console.error("Erro ao adicionar agendamento:", error);
            notifyError("Falha ao salvar o novo agendamento. Tente novamente.");
        }
    };

    // Salvar edição (Firestore: updateDoc)
    const handleSaveEdit = async () => {
        if (!formData.customer || !formData.service || !formData.date || !formData.time) {
            notifyError('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        try {
            const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
            const docRef = doc(db, `artifacts/${appId}/users/${userId}/appointments`, selectedAppointment.id);
            await updateDoc(docRef, {
                ...formData,
                updatedAt: serverTimestamp(),
            });
            setIsEditModalOpen(false);
            setSelectedAppointment(null);
            resetForm();
        } catch (error) {
            console.error("Erro ao salvar edição:", error);
            notifyError("Falha ao atualizar o agendamento. Tente novamente.");
        }
    };

    // Confirmar deleção (Firestore: deleteDoc)
    const handleConfirmDelete = async () => {
        if (!selectedAppointment) return;

        try {
            const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
            const docRef = doc(db, `artifacts/${appId}/users/${userId}/appointments`, selectedAppointment.id);
            await deleteDoc(docRef);
            setIsDeleteModalOpen(false);
            setSelectedAppointment(null);
        } catch (error) {
            console.error("Erro ao deletar agendamento:", error);
            notifyError("Falha ao excluir o agendamento. Tente novamente.");
        }
    };

    // Função para retornar as classes CSS baseadas no status
    const getStatusStyles = (status) => {
        const styles = {
            'Concluído': 'bg-green-600/20 text-green-400 border border-green-700',
            'Agendado': 'bg-yellow-600/20 text-yellow-400 border border-yellow-700',
            'Cancelado': 'bg-red-600/20 text-red-400 border border-red-700',
        };
        return styles[status] || 'bg-gray-600/20 text-gray-400 border border-gray-700';
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

    if (!isAuthReady) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#08060f] text-white">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500 mr-2" />
                <p className="text-lg">Autenticando e conectando...</p>
            </div>
        );
    }


    return (
        <>
            <div className="bg-[#08060f] text-white font-sans antialiased min-h-screen pt-28 md:pt-16">
                <NavbarManage/>

                {/* Global Error/Notification Message */}
                {errorMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-lg bg-red-600 text-white shadow-xl max-w-lg w-full text-center"
                    >
                        {errorMessage}
                    </motion.div>
                )}

                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut"}}
                        className="mb-8"
                    >
                        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                            Agendamentos
                        </h1>
                        <p className="mt-2 text-gray-400">Gerencie todos os agendamentos da sua barbearia em tempo real.</p>
                        <p className="mt-1 text-xs text-gray-500">
                            Seu ID de Usuário (para fins de persistência): <span className="font-mono text-gray-300 break-all">{userId}</span>
                        </p>
                    </motion.div>

                    {isLoadingData ? (
                        <div className="flex items-center justify-center p-10 bg-gray-800/50 rounded-xl">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-500 mr-3" />
                            <p className="text-lg text-gray-300">Carregando dados em tempo real...</p>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                        >
                            <DataTable
                                data={appointments}
                                columns={columns}
                                title="Lista de Agendamentos"
                                searchPlaceholder="Buscar cliente, serviço ou status..."
                                onAdd={handleAdd}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                addLabel="Novo Agendamento"
                                itemsPerPage={10}
                            />
                        </motion.div>
                    )}
                </main>
            </div>

            {/* Modais renderizados fora do fluxo principal */}
            {/* Modal Adicionar */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => { setIsAddModalOpen(false); resetForm(); }}
                title="Novo Agendamento"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Cliente</label>
                        <input
                            type="text"
                            value={formData.customer}
                            onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-500"
                            placeholder="Nome do cliente"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Serviço</label>
                        <select
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-500"
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
                            <label className="block text-sm font-medium text-gray-300 mb-1">Data (DD/MM/YYYY)</label>
                            <input
                                type="text" // Usando text para aceitar o formato DD/MM/YYYY
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-500"
                                placeholder="DD/MM/YYYY"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Horário (HH:MM)</label>
                            <input
                                type="text" // Usando text para aceitar o formato HH:MM
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-500"
                                placeholder="HH:MM"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Observação</label>
                        <textarea
                            value={formData.observation}
                            onChange={(e) => setFormData({ ...formData, observation: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-500 resize-none"
                            placeholder="Anote uma observação"
                            rows="3"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-500"
                        >
                            <option value="Agendado">Agendado</option>
                            <option value="Concluído">Concluído</option>
                            <option value="Cancelado">Cancelado</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={() => { setIsAddModalOpen(false); resetForm(); }}
                        className="flex-1 px-4 py-2 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSaveNew}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
                    >
                        <Save className="h-5 w-5 mr-2" /> Salvar Agendamento
                    </button>
                </div>
            </Modal>

            {/* Modal Editar */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => { setIsEditModalOpen(false); setSelectedAppointment(null); resetForm(); }}
                title="Editar Agendamento"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Cliente</label>
                        <input
                            type="text"
                            value={formData.customer}
                            onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-500"
                            placeholder="Nome do cliente"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Serviço</label>
                        <select
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-500"
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
                            <label className="block text-sm font-medium text-gray-300 mb-1">Data (DD/MM/YYYY)</label>
                            <input
                                type="text"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-500"
                                placeholder="DD/MM/YYYY"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Horário (HH:MM)</label>
                            <input
                                type="text"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-500"
                                placeholder="HH:MM"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Observação</label>
                        <textarea
                            value={formData.observation}
                            onChange={(e) => setFormData({ ...formData, observation: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-500 resize-none"
                            placeholder="Anote uma observação"
                            rows="3"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-500"
                        >
                            <option value="Agendado">Agendado</option>
                            <option value="Concluído">Concluído</option>
                            <option value="Cancelado">Cancelado</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={() => { setIsEditModalOpen(false); setSelectedAppointment(null); resetForm(); }}
                        className="flex-1 px-4 py-2 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSaveEdit}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors font-semibold"
                    >
                        <Edit className="h-5 w-5 mr-2" /> Salvar Alterações
                    </button>
                </div>
            </Modal>

            {/* Modal Deletar */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Confirmar Exclusão"
            >
                <p className="text-gray-400">
                    Tem certeza que deseja excluir o agendamento de <strong className="text-white">{selectedAppointment?.customer}</strong>?
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    Esta ação não pode ser desfeita e será removida do banco de dados em tempo real.
                </p>
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={() => setIsDeleteModalOpen(false)}
                        className="flex-1 px-4 py-2 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleConfirmDelete}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-semibold"
                    >
                        <Trash className="h-5 w-5 mr-2" /> Excluir Permanentemente
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default Agendamentos;