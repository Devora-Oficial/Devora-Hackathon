import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import NavbarManage from '../../components/NavbarManage';

// --- Variants gerais ---
const menuItemVariant = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.22 } },
  active: { scale: 1.02, boxShadow: "0 6px 18px rgba(99,102,241,0.12)" }
};

const sectionVariant = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.22 } }
};

const rowVariant = {
  hidden: { opacity: 0, x: -6 },
  show: (i = 0) => ({ opacity: 1, x: 0, transition: { delay: i * 0.06, duration: 0.28 } })
};

const toggleVariant = {
  on: { backgroundColor: "#4f46e5" },
  off: { backgroundColor: "rgba(255,255,255,0.08)" }
};

const saveBtnTap = { scale: 0.98, y: 1 };

// --- Settings Menu ---
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
      <div className="space-y-2">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          const active = activeSection === section.id;
          return (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              animate={active ? "active" : "show"}
              variants={menuItemVariant}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all
                ${active ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{section.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// --- Company Info Section ---
function CompanyInfoSection({ companyData, setCompanyData }) {
  return (
    <motion.div variants={sectionVariant} initial="hidden" animate="show" exit="exit" className="space-y-6">
      <div>
        <h2 className="text-white text-2xl font-bold mb-2">Informações da Empresa</h2>
        <p className="text-gray-400">Gerencie os dados básicos da sua empresa</p>
      </div>

      {/* Logo Upload */}
      <motion.div layout className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-indigo-400" />
          Logo da Empresa
        </h3>

        <div className="flex items-center gap-6">
          <motion.div
            layout
            whileHover={{ scale: 1.03 }}
            className="w-24 h-24 rounded-xl bg-linear-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 flex items-center justify-center text-4xl"
          >
            {companyData.logo}
          </motion.div>

          <div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition"
            >
              Alterar Logo
            </motion.button>
            <p className="text-gray-400 text-xs mt-2">PNG, JPG ou SVG. Tamanho máximo 2MB.</p>
          </div>
        </div>
      </motion.div>

      {/* Company Details */}
      <motion.div layout className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Dados da Empresa</h3>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" layout>
          <motion.div variants={rowVariant} initial="hidden" animate="show">
            <label className="block text-gray-400 text-sm mb-2">Nome da Empresa</label>
            <input
              type="text"
              value={companyData.name}
              onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </motion.div>

          <motion.div variants={rowVariant} initial="hidden" animate="show">
            <label className="block text-gray-400 text-sm mb-2">Tipo de Negócio</label>
            <select
              value={companyData.type}
              onChange={(e) => setCompanyData({ ...companyData, type: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition"
            >
              <option value="barbearia">Barbearia</option>
              <option value="clinica">Clínica</option>
              <option value="academia">Academia</option>
              <option value="estetica">Estética</option>
            </select>
          </motion.div>

          <motion.div variants={rowVariant} initial="hidden" animate="show">
            <label className="block text-gray-400 text-sm mb-2 items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </label>
            <input
              type="email"
              value={companyData.email}
              onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </motion.div>

          <motion.div variants={rowVariant} initial="hidden" animate="show">
            <label className="block text-gray-400 text-sm mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Telefone
            </label>
            <input
              type="tel"
              value={companyData.phone}
              onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </motion.div>

          <motion.div className="md:col-span-2" variants={rowVariant} initial="hidden" animate="show">
            <label className="block text-gray-400 text-sm mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Endereço Completo
            </label>
            <input
              type="text"
              value={companyData.address}
              onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </motion.div>

          <motion.div variants={rowVariant} initial="hidden" animate="show">
            <label className="block text-gray-400 text-sm mb-2">CNPJ</label>
            <input
              type="text"
              value={companyData.cnpj}
              onChange={(e) => setCompanyData({ ...companyData, cnpj: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
              placeholder="00.000.000/0000-00"
            />
          </motion.div>

          <motion.div variants={rowVariant} initial="hidden" animate="show">
            <label className="block text-gray-400 text-sm mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Website
            </label>
            <input
              type="url"
              value={companyData.website}
              onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
              placeholder="https://..."
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// --- Appearance Section ---
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
    <motion.div variants={sectionVariant} initial="hidden" animate="show" exit="exit" className="space-y-6">
      <div>
        <h2 className="text-white text-2xl font-bold mb-2">Aparência</h2>
        <p className="text-gray-400">Personalize a aparência do sistema</p>
      </div>

      {/* Dark/Light Mode */}
      <motion.div layout className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Modo de Exibição</h3>

        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setTheme({ ...theme, mode: 'dark' })}
            className={`p-6 rounded-xl border-2 transition-all ${theme.mode === 'dark' ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 hover:border-white/20'}`}
          >
            <Moon className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
            <div className="text-white font-medium">Modo Escuro</div>
            <div className="text-gray-400 text-xs mt-1">Perfeito para uso noturno</div>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setTheme({ ...theme, mode: 'light' })}
            className={`p-6 rounded-xl border-2 transition-all ${theme.mode === 'light' ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 hover:border-white/20'}`}
          >
            <Sun className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-white font-medium">Modo Claro</div>
            <div className="text-gray-400 text-xs mt-1">Melhor para ambientes claros</div>
          </motion.button>
        </div>
      </motion.div>

      {/* Color Themes */}
      <motion.div layout className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Esquema de Cores</h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {themes.map(t => (
            <motion.button
              key={t.id}
              layout
              whileTap={{ scale: 0.98 }}
              onClick={() => setTheme({ ...theme, color: t.id })}
              className={`p-4 rounded-xl border-2 transition-all ${theme.color === t.id ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 hover:border-white/20'}`}
            >
              <div className="flex gap-2 mb-3">
                {t.colors.map((color, i) => (
                  <div key={i} className="w-8 h-8 rounded-lg" style={{ backgroundColor: color }} />
                ))}
              </div>
              <div className="text-white font-medium text-sm">{t.name}</div>
              {theme.color === t.id && <Check className="w-4 h-4 text-indigo-400 mx-auto mt-2" />}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Font Size */}
      <motion.div layout className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Tamanho da Fonte</h3>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">Pequeno</span>
          <input
            type="range"
            min="12"
            max="18"
            value={theme.fontSize}
            onChange={(e) => setTheme({ ...theme, fontSize: e.target.value })}
            className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-gray-400 text-sm">Grande</span>
          <div className="text-white font-medium ml-4">{theme.fontSize}px</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- Notifications Section ---
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
    <motion.div variants={sectionVariant} initial="hidden" animate="show" exit="exit" className="space-y-6">
      <div>
        <h2 className="text-white text-2xl font-bold mb-2">Notificações</h2>
        <p className="text-gray-400">Configure como você deseja receber notificações</p>
      </div>

      <motion.div layout className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
        <div className="space-y-4">
          {notificationOptions.map((option, i) => (
            <motion.div
              key={option.id}
              custom={i}
              variants={rowVariant}
              initial="hidden"
              animate="show"
              className="flex items-start justify-between py-4 border-b border-white/5 last:border-0"
            >
              <div className="flex-1">
                <div className="text-white font-medium mb-1">{option.label}</div>
                <div className="text-gray-400 text-sm">{option.desc}</div>
              </div>

              <motion.button
                onClick={() => setNotifications({ ...notifications, [option.id]: !notifications[option.id] })}
                layout
                variants={toggleVariant}
                animate={notifications[option.id] ? "on" : "off"}
                className={`relative w-12 h-6 rounded-full transition-all ${notifications[option.id] ? 'bg-indigo-600' : 'bg-white/10'}`}
              >
                <motion.div
                  layout
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full`}
                  style={{ left: notifications[option.id] ? 28 : 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div layout className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Canais de Notificação</h3>
        <motion.div className="space-y-3">
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
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// --- Hours Section ---
function HoursSection({ hours, setHours }) {
  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  return (
    <motion.div variants={sectionVariant} initial="hidden" animate="show" exit="exit" className="space-y-6">
      <div>
        <h2 className="text-white text-2xl font-bold mb-2">Horário de Funcionamento</h2>
        <p className="text-gray-400">Defina os horários de abertura e fechamento</p>
      </div>

      <motion.div layout className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
        <div className="space-y-2">
          {days.map((day, i) => (
            <motion.div
              key={day}
              custom={i}
              variants={rowVariant}
              initial="hidden"
              animate="show"
              className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0"
            >
              <div className="w-32">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white/10 bg-white/5"
                    checked={hours[i]?.active}
                    onChange={(e) => {
                      const newHours = [...hours];
                      newHours[i] = { ...newHours[i], active: e.target.checked };
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
                    newHours[i] = { ...newHours[i], open: e.target.value };
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
                    newHours[i] = { ...newHours[i], close: e.target.value };
                    setHours(newHours);
                  }}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- Main Settings Component (completo) ---
export default function CompanySettings() {
  const currentUser = { name: "João Silva", business: "Barbearia Premium" };

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

  const [theme, setTheme] = useState({ mode: 'dark', color: 'purple', fontSize: 14 });

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
    <div className="min-h-screen bg-[#08060f] pt-28 md:pt-16">
      <NavbarManage />

      <main className="max-w-[1600px] mx-auto p-8">
        <div className="flex gap-8">
          <SettingsMenu activeSection={activeSection} setActiveSection={setActiveSection} />

          <div className="flex-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeSection}
                variants={sectionVariant}
                initial="hidden"
                animate="show"
                exit="exit"
              >
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
                  <motion.div variants={sectionVariant} initial="hidden" animate="show" exit="exit" className="space-y-6">
                    <div>
                      <h2 className="text-white text-2xl font-bold mb-2">Pagamentos</h2>
                      <p className="text-gray-400">Configure métodos de pagamento e integrações</p>
                    </div>
                    <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-12 text-center">
                      <CreditCard className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-white text-xl font-semibold mb-2">Em breve</h3>
                      <p className="text-gray-400">Funcionalidade de pagamentos em desenvolvimento</p>
                    </div>
                  </motion.div>
                )}
                {activeSection === 'security' && (
                  <motion.div variants={sectionVariant} initial="hidden" animate="show" exit="exit" className="space-y-6">
                    <div>
                      <h2 className="text-white text-2xl font-bold mb-2">Segurança</h2>
                      <p className="text-gray-400">Gerencie a segurança da sua conta</p>
                    </div>
                    <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-12 text-center">
                      <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-white text-xl font-semibold mb-2">Em breve</h3>
                      <p className="text-gray-400">Configurações de segurança em desenvolvimento</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <motion.button
                whileTap={saveBtnTap}
                onClick={handleSave}
                className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition shadow-lg shadow-indigo-900/40 flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Salvar Alterações
              </motion.button>
            </div>
          </div>
        </div>
      </main>

      {/* Save Notification (Animated) */}
      <AnimatePresence>
        {showSaveNotification && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3"
          >
            <Check className="w-5 h-5" />
            <span className="font-medium">Alterações salvas com sucesso!</span>
            <motion.button
              onClick={() => setShowSaveNotification(false)}
              whileTap={{ scale: 0.95 }}
              className="ml-4 opacity-80 hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
