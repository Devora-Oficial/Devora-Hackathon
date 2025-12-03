import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Calendar, 
  Settings,
  LogOut,
  Moon,
  Sun,
  Palette,
  Save,
  Bell,
  Shield,
  CreditCard,
  Clock,
  Globe,
  Mail,
  Phone,
  MapPin,
  Upload,
  Check,
  X
} from 'lucide-react';

// Navbar Component
function Navbar({ currentUser }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'clients', label: 'Clientes', icon: '👥' },
    { id: 'services', label: 'Serviços', icon: '✂️' },
    { id: 'appointments', label: 'Agendamentos', icon: '📅' },
    { id: 'settings', label: 'Configurações', icon: '⚙️', active: true },
  ];

  return (
    <nav className="bg-[#0f0d1a] border-b border-white/5 px-8 py-4">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-semibold text-xl">
            Service<span className="text-indigo-400">Gate</span>
          </span>
        </div>

        <div className="flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                item.active
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-white/20 hover:scale-110 transition"></button>
            <button className="w-8 h-8 rounded-full bg-red-500 hover:scale-110 transition"></button>
            <button className="w-8 h-8 rounded-full bg-green-500 hover:scale-110 transition"></button>
            <button className="w-8 h-8 rounded-full bg-cyan-500 hover:scale-110 transition"></button>
            <button className="w-8 h-8 rounded-full bg-yellow-500 hover:scale-110 transition"></button>
          </div>

          <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition">
            <Moon className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/5 transition cursor-pointer">
            <div className="text-right">
              <div className="text-white text-sm font-medium">{currentUser.name}</div>
              <div className="text-gray-400 text-xs">{currentUser.business}</div>
            </div>
            <LogOut className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </nav>
  );
}

// Settings Menu Component
function SettingsMenu({ activeSection, setActiveSection }) {
  const sections = [
    { id: 'company', label: 'Informações da Empresa', icon: Building2 },
    { id: 'appearance', label: 'Aparência', icon: Palette },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'hours', label: 'Horário de Funcionamento', icon: Clock },
    { id: 'payment', label: 'Pagamentos', icon: CreditCard },
    { id: 'security', label: 'Segurança', icon: Shield },
  ];

  return (
    <div className="w-64 bg-[#0f0d1a] border border-white/5 rounded-2xl p-4">
      <div className="space-y-1">
        {sections.map(section => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeSection === section.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{section.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Company Info Section
function CompanyInfoSection({ companyData, setCompanyData }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl font-bold mb-2">Informações da Empresa</h2>
        <p className="text-gray-400">Gerencie os dados básicos da sua empresa</p>
      </div>

      {/* Logo Upload */}
      <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-indigo-400" />
          Logo da Empresa
        </h3>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 flex items-center justify-center text-4xl">
            {companyData.logo}
          </div>
          <div>
            <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition">
              Alterar Logo
            </button>
            <p className="text-gray-400 text-xs mt-2">PNG, JPG ou SVG. Tamanho máximo 2MB.</p>
          </div>
        </div>
      </div>

      {/* Company Details */}
      <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Dados da Empresa</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Nome da Empresa</label>
            <input
              type="text"
              value={companyData.name}
              onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Tipo de Negócio</label>
            <select
              value={companyData.type}
              onChange={(e) => setCompanyData({...companyData, type: e.target.value})}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition"
            >
              <option value="barbearia">Barbearia</option>
              <option value="clinica">Clínica</option>
              <option value="academia">Academia</option>
              <option value="estetica">Estética</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </label>
            <input
              type="email"
              value={companyData.email}
              onChange={(e) => setCompanyData({...companyData, email: e.target.value})}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Telefone
            </label>
            <input
              type="tel"
              value={companyData.phone}
              onChange={(e) => setCompanyData({...companyData, phone: e.target.value})}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-400 text-sm mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Endereço Completo
            </label>
            <input
              type="text"
              value={companyData.address}
              onChange={(e) => setCompanyData({...companyData, address: e.target.value})}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">CNPJ</label>
            <input
              type="text"
              value={companyData.cnpj}
              onChange={(e) => setCompanyData({...companyData, cnpj: e.target.value})}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
              placeholder="00.000.000/0000-00"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Website
            </label>
            <input
              type="url"
              value={companyData.website}
              onChange={(e) => setCompanyData({...companyData, website: e.target.value})}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
              placeholder="https://..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Appearance Section
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

// Notifications Section
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

// Hours Section
function HoursSection({ hours, setHours }) {
  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl font-bold mb-2">Horário de Funcionamento</h2>
        <p className="text-gray-400">Defina os horários de abertura e fechamento</p>
      </div>

      <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
        <div className="space-y-4">
          {days.map((day, i) => (
            <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
              <div className="w-32">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white/10 bg-white/5"
                    checked={hours[i]?.active}
                    onChange={(e) => {
                      const newHours = [...hours];
                      newHours[i] = {...newHours[i], active: e.target.checked};
                      setHours(newHours);
                    }}
                  />
                  <span className="text-white font-medium">{day}</span>
                </label>
              </div>
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="time"
                  value={hours[i]?.open || '09:00'}
                  disabled={!hours[i]?.active}
                  onChange={(e) => {
                    const newHours = [...hours];
                    newHours[i] = {...newHours[i], open: e.target.value};
                    setHours(newHours);
                  }}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-indigo-500 transition"
                />
                <span className="text-gray-400">até</span>
                <input
                  type="time"
                  value={hours[i]?.close || '18:00'}
                  disabled={!hours[i]?.active}
                  onChange={(e) => {
                    const newHours = [...hours];
                    newHours[i] = {...newHours[i], close: e.target.value};
                    setHours(newHours);
                  }}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Settings Component
export default function CompanySettings() {
  const currentUser = {
    name: "João Silva",
    business: "Barbearia Premium"
  };

  const [activeSection, setActiveSection] = useState('company');
  const [companyData, setCompanyData] = useState({
    logo: '💈',
    name: 'Barbearia Premium',
    type: 'barbearia',
    email: 'contato@barbeariapremiun.com',
    phone: '(11) 98765-4321',
    address: 'Rua das Flores, 123 - Centro',
    cnpj: '12.345.678/0001-90',
    website: 'https://barbeariapremiun.com'
  });

  const [theme, setTheme] = useState({
    mode: 'dark',
    color: 'purple',
    fontSize: 14
  });

  const [notifications, setNotifications] = useState({
    newAppointment: true,
    appointmentReminder: true,
    cancelAppointment: true,
    newClient: true,
    payment: true,
    reports: false
  });

  const [hours, setHours] = useState([
    { active: true, open: '09:00', close: '18:00' },
    { active: true, open: '09:00', close: '18:00' },
    { active: true, open: '09:00', close: '18:00' },
    { active: true, open: '09:00', close: '18:00' },
    { active: true, open: '09:00', close: '18:00' },
    { active: true, open: '09:00', close: '16:00' },
    { active: false, open: '09:00', close: '18:00' }
  ]);

  const [showSaveNotification, setShowSaveNotification] = useState(false);

  const handleSave = () => {
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#08060f]">
      <Navbar currentUser={currentUser} />
      
      <main className="max-w-[1600px] mx-auto p-8">
        <div className="flex gap-8">
          <SettingsMenu activeSection={activeSection} setActiveSection={setActiveSection} />
          
          <div className="flex-1">
            {activeSection === 'company' && (
              <CompanyInfoSection companyData={companyData} setCompanyData={setCompanyData} />
            )}
            {activeSection === 'appearance' && (
              <AppearanceSection theme={theme} setTheme={setTheme} />
            )}
            {activeSection === 'notifications' && (
              <NotificationsSection notifications={notifications} setNotifications={setNotifications} />
            )}
            {activeSection === 'hours' && (
              <HoursSection hours={hours} setHours={setHours} />
            )}
            {activeSection === 'payment' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-white text-2xl font-bold mb-2">Pagamentos</h2>
                  <p className="text-gray-400">Configure métodos de pagamento e integrações</p>
                </div>
                <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-12 text-center">
                  <CreditCard className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-white text-xl font-semibold mb-2">Em breve</h3>
                  <p className="text-gray-400">Funcionalidade de pagamentos em desenvolvimento</p>
                </div>
              </div>
            )}
            {activeSection === 'security' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-white text-2xl font-bold mb-2">Segurança</h2>
                  <p className="text-gray-400">Gerencie a segurança da sua conta</p>
                </div>
                <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-12 text-center">
                  <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-white text-xl font-semibold mb-2">Em breve</h3>
                  <p className="text-gray-400">Configurações de segurança em desenvolvimento</p>
                </div>
              </div>
            )}

            {/* Save Button */}
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

      {/* Save Notification */}
      {showSaveNotification && (
        <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-up">
          <Check className="w-5 h-5" />
          <span className="font-medium">Alterações salvas com sucesso!</span>
        </div>
      )}
    </div>
  );
}