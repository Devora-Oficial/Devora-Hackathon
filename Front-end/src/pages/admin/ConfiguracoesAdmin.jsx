import React, { useState } from 'react';
import {
  User2,
  Users,
  Shield,
  Settings,
  Bell,
  Palette,
  Activity,
  FileSearch,
  Lock,
  Save,
  Upload,
  Mail,
  Phone,
  Check,
} from 'lucide-react';
import NavbarManage from '../../components/NavbarManage';

// Settings Menu
function SettingsMenu({ activeSection, setActiveSection }) {
  const sections = [
    { id: 'adminInfo', label: 'Informações do ADM', icon: User2 },
    { id: 'permissions', label: 'Permissões do Sistema', icon: Shield },
    { id: 'appearance', label: 'Aparência', icon: Palette },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'security', label: 'Segurança Avançada', icon: Lock },
    { id: 'audit', label: 'Auditoria e Logs', icon: FileSearch },
  ];

  return (
    <div className="w-80 bg-[#0f0d1a] border border-white/5 rounded-2xl p-4">
      <div className="space-y-1">
        {sections.map(sec => {
          const Icon = sec.icon;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeSection === sec.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{sec.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Admin info section
function AdminInfoSection({ adminData, setAdminData }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl font-bold mb-2">Informações do Administrador</h2>
        <p className="text-gray-400">Gerencie os dados da sua conta administrativa</p>
      </div>

      {/* Profile Pic
      <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-indigo-400" />
          Foto de Perfil
        </h3>

        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-4xl">
            {adminData.avatar}
          </div>

          <div>
            <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition">
              Alterar Foto
            </button>
            <p className="text-gray-400 text-xs mt-2">PNG, JPG — máximo 2MB.</p>
          </div>
        </div>
      </div> */}

      {/* Admin Data */}
      <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Dados do Administrador</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Nome Completo</label>
            <input
              type="text"
              value={adminData.name}
              onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              <Mail className="w-4 h-4" />
              Email
            </label>
            <input
              type="email"
              value={adminData.email}
              onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              <Phone className="w-4 h-4" />
              Telefone
            </label>
            <input
              type="tel"
              value={adminData.phone}
              onChange={(e) => setAdminData({ ...adminData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-2 block">Cargo</label>
            <input
              type="text"
              value={adminData.role}
              onChange={(e) => setAdminData({ ...adminData, role: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Permissions Section
function PermissionsSection({ permissions, setPermissions }) {
  const list = [
    { id: 'manageCompanies', label: 'Gerenciar Empresas' },
    { id: 'manageUsers', label: 'Gerenciar Usuários' },
    { id: 'manageAdmins', label: 'Gerenciar Outros ADMs' },
    { id: 'viewReports', label: 'Visualizar Relatórios do Sistema' },
    { id: 'systemConfig', label: 'Alterar Configurações Globais' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl font-bold mb-2">Permissões do Sistema</h2>
        <p className="text-gray-400">Controle o que este administrador pode acessar</p>
      </div>

      <div className="bg-[#0f0d1a] rounded-2xl border border-white/5 p-6 space-y-4">
        {list.map(p => (
          <div key={p.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
            <div className="text-white font-medium">{p.label}</div>

            <button
              onClick={() => setPermissions({ ...permissions, [p.id]: !permissions[p.id] })}
              className={`relative w-12 h-6 rounded-full transition-all ${
                permissions[p.id] ? 'bg-indigo-600' : 'bg-white/10'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                  permissions[p.id] ? 'left-7' : 'left-1'
                }`}
              ></div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Appearance & Notifications reaproveitados
function AppearanceSection({ theme, setTheme }) {
  const themes = [
    { id: 'dark', name: 'Escuro', colors: ['#8b5cf6', '#6366f1', '#3b82f6'] },
    { id: 'purple', name: 'Roxo', colors: ['#a855f7', '#8b5cf6', '#7c3aed'] },
    { id: 'blue', name: 'Azul', colors: ['#3b82f6', '#2563eb', '#1d4ed8'] },
    { id: 'green', name: 'Verde', colors: ['#10b981', '#059669', '#047857'] },
    { id: 'red', name: 'Vermelho', colors: ['#ef4444', '#dc2626', '#b91c1c'] },
    { id: 'orange', name: 'Laranja', colors: ['#f97316', '#ea580c', '#c2410c'] },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl font-bold mb-2">Aparência</h2>
        <p className="text-gray-400">Personalize a aparência do sistema</p>
      </div>

      {/* Dark/Light Mode */}
      <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Modo de Exibição</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setTheme({...theme, mode: 'dark'})}
            className={`p-6 rounded-xl border-2 transition-all ${
              theme.mode === 'dark'
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <Moon className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
            <div className="text-white font-medium">Modo Escuro</div>
            <div className="text-gray-400 text-xs mt-1">Perfeito para uso noturno</div>
          </button>
          <button
            onClick={() => setTheme({...theme, mode: 'light'})}
            className={`p-6 rounded-xl border-2 transition-all ${
              theme.mode === 'light'
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <Sun className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-white font-medium">Modo Claro</div>
            <div className="text-gray-400 text-xs mt-1">Melhor para ambientes claros</div>
          </button>
        </div>
      </div>

      {/* Color Themes */}
      <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Esquema de Cores</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {themes.map(t => (
            <button
              key={t.id}
              onClick={() => setTheme({...theme, color: t.id})}
              className={`p-4 rounded-xl border-2 transition-all ${
                theme.color === t.id
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex gap-2 mb-3">
                {t.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-lg"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
              <div className="text-white font-medium text-sm">{t.name}</div>
              {theme.color === t.id && (
                <Check className="w-4 h-4 text-indigo-400 mx-auto mt-2" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Tamanho da Fonte</h3>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">Pequeno</span>
          <input
            type="range"
            min="12"
            max="18"
            value={theme.fontSize}
            onChange={(e) => setTheme({...theme, fontSize: e.target.value})}
            className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-gray-400 text-sm">Grande</span>
          <div className="text-white font-medium ml-4">{theme.fontSize}px</div>
        </div>
      </div>
    </div>
  );
}

function NotificationsSection({ notifications, setNotifications }) {
  const notificationOptions = [
    { id: 'newAppointment', label: 'Novos Agendamentos', desc: 'Receba notificação quando houver um novo agendamento' },
    { id: 'appointmentReminder', label: 'Lembrete de Agendamento', desc: 'Lembre os clientes 1 hora antes do horário' },
    { id: 'cancelAppointment', label: 'Cancelamentos', desc: 'Seja notificado quando um agendamento for cancelado' },
    { id: 'newClient', label: 'Novos Clientes', desc: 'Notificação quando um novo cliente se cadastrar' },
    { id: 'payment', label: 'Pagamentos', desc: 'Receba confirmação de pagamentos recebidos' },
    { id: 'reports', label: 'Relatórios Semanais', desc: 'Resumo semanal do desempenho da empresa' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl font-bold mb-2">Notificações</h2>
        <p className="text-gray-400">Configure como você deseja receber notificações</p>
      </div>

      <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
        <div className="space-y-4">
          {notificationOptions.map(option => (
            <div key={option.id} className="flex items-start justify-between py-4 border-b border-white/5 last:border-0">
              <div className="flex-1">
                <div className="text-white font-medium mb-1">{option.label}</div>
                <div className="text-gray-400 text-sm">{option.desc}</div>
              </div>
              <button
                onClick={() => setNotifications({...notifications, [option.id]: !notifications[option.id]})}
                className={`relative w-12 h-6 rounded-full transition-all ${
                  notifications[option.id] ? 'bg-indigo-600' : 'bg-white/10'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    notifications[option.id] ? 'left-7' : 'left-1'
                  }`}
                ></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Canais de Notificação</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 rounded border-white/10 bg-white/5" defaultChecked />
            <span className="text-white">Email</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 rounded border-white/10 bg-white/5" defaultChecked />
            <span className="text-white">SMS</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 rounded border-white/10 bg-white/5" />
            <span className="text-white">WhatsApp</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 rounded border-white/10 bg-white/5" defaultChecked />
            <span className="text-white">Notificações Push</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// Main component
export default function ConfiguracoesAdmin() {
  const [activeSection, setActiveSection] = useState('adminInfo');

  const [adminData, setAdminData] = useState({
    avatar: '🛡️',
    name: 'Administrador Master',
    email: 'admin@sistema.com',
    phone: '(00) 90000-0000',
    role: 'Administrador Geral',
  });

  const [permissions, setPermissions] = useState({
    manageCompanies: true,
    manageUsers: true,
    manageAdmins: true,
    viewReports: true,
    systemConfig: true,
  });

  const [theme, setTheme] = useState({
    mode: 'dark',
    color: 'blue',
    fontSize: 14,
  });

  const [notifications, setNotifications] = useState({
    systemAlerts: true,
    newAdmins: true,
    errorReports: true,
    securityEvents: true,
  });

  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  // Talvez remover quando login estiver funcional
  const tipoConta = 'admin'

  return (
    <div className="min-h-screen bg-[#08060f] pt-28 md:pt-16">
      <NavbarManage userType={tipoConta}/>

      <main className="max-w-[1600px] mx-auto p-8">
        <div className="flex gap-8">
          <SettingsMenu activeSection={activeSection} setActiveSection={setActiveSection} />

          <div className="flex-1">
            {activeSection === 'adminInfo' && (
              <AdminInfoSection adminData={adminData} setAdminData={setAdminData} />
            )}

            {activeSection === 'permissions' && (
              <PermissionsSection permissions={permissions} setPermissions={setPermissions} />
            )}

            {activeSection === 'appearance' && (
              <AppearanceSection theme={theme} setTheme={setTheme} />
            )}

            {activeSection === 'notifications' && (
              <NotificationsSection notifications={notifications} setNotifications={setNotifications} />
            )}

            {activeSection === 'security' && (
              <div className="bg-[#0f0d1a] border border-white/5 p-12 rounded-2xl text-center">
                <Lock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-white text-xl mb-2">Configurações avançadas</h3>
                <p className="text-gray-400">Função em desenvolvimento</p>
              </div>
            )}

            {activeSection === 'audit' && (
              <div className="bg-[#0f0d1a] border border-white/5 p-12 rounded-2xl text-center">
                <FileSearch className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-white text-xl mb-2">Auditoria e Logs</h3>
                <p className="text-gray-400">Histórico do sistema ainda será implementado</p>
              </div>
            )}

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSave}
                className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition shadow-lg shadow-indigo-900/40 flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      </main>

      {showSaved && (
        <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-up">
          <Check className="w-5 h-5" />
          <span className="font-medium">Configurações salvas com sucesso!</span>
        </div>
      )}
    </div>
  );
}