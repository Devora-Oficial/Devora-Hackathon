import React, { useState } from 'react';
import {
  Building2,
  Palette,
  Save,
  Bell,
  Shield,
  CreditCard,
  Clock,
  Mail,
  Phone,
  MapPin,
  Moon,
  Sun,
  Check
} from 'lucide-react';

import NavbarManage from '../../components/NavbarManage';

/* -----------------------------------------------------------
   MENU LATERAL
----------------------------------------------------------- */
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
    <div className="w-80 bg-[#0f0d1a] border border-white/5 rounded-2xl p-4">
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

/* -----------------------------------------------------------
   INFORMAÇÕES DA EMPRESA
----------------------------------------------------------- */
function CompanyInfoSection({ companyData }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl font-bold mb-2">Informações da Empresa</h2>
        <p className="text-gray-400">Visualização das informações cadastradas</p>
      </div>

      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
        <div>
          <label className="block text-gray-400 text-sm mb-1">Nome da Empresa</label>
          <span className="text-white font-medium">{companyData.name}</span>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Tipo de Negócio</label>
          <span className="text-white capitalize font-medium">{companyData.type}</span>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </label>
          <span className="text-white">{companyData.email}</span>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Telefone
          </label>
          <span className="text-white">{companyData.phone}</span>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            CEP
          </label>
          <span className="text-white">{companyData.address}</span>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   APARÊNCIA
----------------------------------------------------------- */
function AppearanceSection({ theme, setTheme }) {
  const themes = [
    { id: 'purple', name: 'Roxo', colors: ['#7c3aed'] },
    { id: 'blue', name: 'Azul', colors: ['#1d4ed8'] },
    { id: 'green', name: 'Verde', colors: ['#10b981'] },
    { id: 'red', name: 'Vermelho', colors: ['#dc2626'] },
    { id: 'orange', name: 'Laranja', colors: ['#ea580c'] },
    { id: 'yellow', name: 'Amarelo', colors: ['#f9a603'] },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl font-bold mb-2">Aparência</h2>
        <p className="text-gray-400">Personalize a aparência do sistema</p>
      </div>

      <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Modo de Exibição</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setTheme({ ...theme, mode: 'dark' })}
            className={`p-6 rounded-xl border-2 transition-all ${
              theme.mode === 'dark'
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <Moon className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
            <div className="text-white font-medium">Modo Escuro</div>
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
            <div className="text-white font-medium">Modo Claro</div>
          </button>
        </div>
      </div>

      <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-4 space-y-4">
        <h3 className="text-white font-semibold text-lg">Esquema de Cores</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">
          {themes.map(t => {
            const active = theme.color === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTheme({ ...theme, color: t.id })}
                className={`group relative p-16 rounded-2xl border flex flex-col items-center transition-all ${
                  active
                    ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_10px_rgba(99,102,241,0.25)]'
                    : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <div className="flex gap-2 mb-3">
                  {t.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full shadow-sm ring-1 ring-white/10"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <span className="text-white font-medium text-sm tracking-wide">{t.name}</span>

                {active && <Check className="w-4 h-4 text-indigo-400 absolute top-3 right-3" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   TELA "EM BREVE" GENÉRICA
----------------------------------------------------------- */
function ComingSoon({ icon: Icon, title }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-400">Esta funcionalidade estará disponível em breve</p>
      </div>

      <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-12 text-center">
        <Icon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-white text-xl font-semibold mb-2">Em breve</h3>
        <p className="text-gray-400">Estamos trabalhando nisso!</p>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   MAIN COMPONENT
----------------------------------------------------------- */
export default function CompanySettings() {
  const [activeSection, setActiveSection] = useState('company');

  const [companyData] = useState({
    name: 'Barbearia Premium',
    type: 'barbearia',
    email: 'contato@barbeariapremiun.com',
    phone: '(11) 98765-4321',
    address: '79066-065',
  });

  const [theme, setTheme] = useState({
    mode: 'dark',
    color: 'purple',
  });

  const [showSaveNotification, setShowSaveNotification] = useState(false);

  const handleSave = () => {
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#08060f] pt-28 md:pt-16">
      <NavbarManage />

      <main className="max-w-[1600px] mx-auto p-8">
        <div className="flex gap-8">
          <SettingsMenu activeSection={activeSection} setActiveSection={setActiveSection} />

          <div className="flex-1">
            {activeSection === 'company' && <CompanyInfoSection companyData={companyData} />}
            {activeSection === 'appearance' && <AppearanceSection theme={theme} setTheme={setTheme} />}
            {activeSection === 'notifications' && <ComingSoon icon={Bell} title="Notificações" />}
            {activeSection === 'hours' && <ComingSoon icon={Clock} title="Horário de Funcionamento" />}
            {activeSection === 'payment' && <ComingSoon icon={CreditCard} title="Pagamentos" />}
            {activeSection === 'security' && <ComingSoon icon={Shield} title="Segurança" />}

            {/* Botão aparece SOMENTE na aba Aparência */}
            {activeSection === 'appearance' && (
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

      {showSaveNotification && (
        <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-up">
          <Check className="w-5 h-5" />
          <span className="font-medium">Alterações salvas com sucesso!</span>
        </div>
      )}
    </div>
  );
}
