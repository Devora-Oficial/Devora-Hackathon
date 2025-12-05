import React, { useState } from 'react';
import {
  User2,
  Shield,
  Bell,
  Palette,
  FileSearch,
  Lock,
  Save,
  Mail,
  Phone,
  Check,
  Moon,
  Sun
} from 'lucide-react';

import NavbarManage from '../../components/NavbarManage';

/* -----------------------------------------
   MENU LATERAL
------------------------------------------ */
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

/* -----------------------------------------
   ADMIN INFO (MODO DE EXIBIÇÃO)
------------------------------------------ */
function AdminInfoSection({ adminData }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl font-bold mb-2">Informações do Administrador</h2>
        <p className="text-gray-400">Visualização dos dados cadastrados do administrador</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
        <h3 className="text-white font-semibold text-lg">Dados do Administrador</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="text-gray-400 text-sm mb-1 block">Nome Completo</label>
            <span className="text-white font-medium">{adminData.name}</span>
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-400 text-sm mb-1">
              <Mail className="w-4 h-4" />
              Email
            </label>
            <span className="text-white">{adminData.email}</span>
          </div>

        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------
   PERMISSIONS EDIT SECTION
------------------------------------------ */
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

/* -----------------------------------------
   APARÊNCIA (EDITÁVEL)
------------------------------------------ */
function AppearanceSection({ theme, setTheme }) {
  const colorOptions = [
    { id: 'purple', name: 'Roxo', color: '#7c3aed' },
    { id: 'blue', name: 'Azul', color: '#1d4ed8' },
    { id: 'green', name: 'Verde', color: '#10b981' },
  ];

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-white text-2xl font-bold mb-2">Aparência</h2>
        <p className="text-gray-400">Personalize a aparência do sistema</p>
      </div>

      <div className="bg-[#0f0d1a] rounded-2xl border border-white/5 p-6">
        <h3 className="text-white font-semibold mb-4">Modo de Exibição</h3>

        <div className="grid grid-cols-2 gap-6">

          <button
            onClick={() => setTheme({ ...theme, mode: 'dark' })}
            className={`p-6 rounded-xl border-2 transition-all ${
              theme.mode === 'dark'
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <Moon className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
            <p className="text-white text-center font-medium">Modo Escuro</p>
          </button>

          <button
            onClick={() => setTheme({ ...theme, mode: 'light' })}
            className={`p-6 rounded-xl border-2 transition-all ${
              theme.mode === 'light'
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <Sun className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <p className="text-white text-center font-medium">Modo Claro</p>
          </button>

        </div>
      </div>

      <div className="bg-[#0f0d1a] rounded-2xl border border-white/5 p-6">
        <h3 className="text-white font-semibold mb-4">Cor Tema</h3>

        <div className="grid grid-cols-3 gap-6">
          {colorOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => setTheme({ ...theme, color: opt.id })}
              className={`p-6 rounded-xl border transition-all ${
                theme.color === opt.id
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div
                className="w-8 h-8 rounded-full mx-auto mb-3"
                style={{ backgroundColor: opt.color }}
              ></div>
              <p className="text-white text-center text-sm">{opt.name}</p>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

/* -----------------------------------------
   TELA EM DESENVOLVIMENTO (GENÉRICA)
------------------------------------------ */
function ComingSoon({ icon: Icon, title }) {
  return (
    <div className="bg-[#0f0d1a] border border-white/5 p-12 rounded-2xl text-center">
      <Icon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 className="text-white text-xl mb-2">{title}</h3>
      <p className="text-gray-400">Função em desenvolvimento</p>
    </div>
  );
}

/* -----------------------------------------
   MAIN COMPONENT
------------------------------------------ */
export default function ConfiguracoesAdmin() {
  const [activeSection, setActiveSection] = useState('adminInfo');

  const [adminData] = useState({
    name: 'Administrador Master',
    email: 'admin@sistema.com',
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
  });

  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  const TELA_EDITAVEL = activeSection === 'permissions' || activeSection === 'appearance';

  return (
    <div className="min-h-screen bg-[#08060f] pt-28 md:pt-16">
      <NavbarManage userType="admin" />

      <main className="max-w-[1600px] mx-auto p-8">
        <div className="flex gap-8">

          <SettingsMenu activeSection={activeSection} setActiveSection={setActiveSection} />

          <div className="flex-1">
            
            {activeSection === 'adminInfo' && <AdminInfoSection adminData={adminData} />}

            {activeSection === 'permissions' && (
              <PermissionsSection permissions={permissions} setPermissions={setPermissions} />
            )}

            {activeSection === 'appearance' && (
              <AppearanceSection theme={theme} setTheme={setTheme} />
            )}

            {activeSection === 'notifications' && (
              <ComingSoon icon={Bell} title="Notificações" />
            )}

            {activeSection === 'security' && (
              <ComingSoon icon={Lock} title="Segurança Avançada" />
            )}

            {activeSection === 'audit' && (
              <ComingSoon icon={FileSearch} title="Auditoria e Logs" />
            )}

            {/* BOTÃO SALVAR APARECE SOMENTE EM TELAS EDITÁVEIS */}
            {TELA_EDITAVEL && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition shadow-lg shadow-indigo-900/40 flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Salvar Alterações
                </button>
              </div>
            )}

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