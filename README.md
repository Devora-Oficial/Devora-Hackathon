# **README PRINCIPAL (Organizado e Pronto para Uso)**

# **Devora - toki**

Aplicação web para gerenciamento de serviços

---

## **📡 Status do Projeto**

| Categoria          | Status                                                                  |
| ------------------ | ----------------------------------------------------------------------- |
| 🔧 Desenvolvimento | ![Dev](https://img.shields.io/badge/status-em%20desenvolvimento-yellow) |
| 🚀 Produção        | ![Prod](https://img.shields.io/badge/versão-0.1.0-blue)                 |
| 🧪 Testes          | ![Tests](https://img.shields.io/badge/testes-parciais-orange)           |

---

# **📊 Tecnologias Utilizadas**

## **Gráfico de Pizza – Proporção das Tecnologias**

```mermaid
pie title Uso das Tecnologias
    "React" : 40
    "JavaScript" : 25
    "TailwindCSS" : 15
    "Node.js" : 15
```

# **📦 Arquitetura do Sistema**

Este bloco revela o fluxo operacional e o modelo interno — a “máquina invisível” operando por trás da interface.

## **🧭 Diagrama de Fluxo – Autenticação**

```mermaid
flowchart TD
    A[Login] --> B{Credenciais válidas?}
    B -->|Sim| C[Gerar Token]
    B -->|Não| D[Erro de Autenticação]
    C --> E[Redirecionar para Dashboard]
```

## **🧱 Diagrama de Classes – Estrutura Lógica**

```mermaid
classDiagram
    class Usuario {
        string nome
        string email
        login()
    }

    class Auth {
        gerarToken()
        validarToken()
    }

    Usuario --> Auth
```

# **🗓 Cronograma – Gantt**

O cronograma mostra o tempo como estrutura — o projeto é um processo, não um estado.

```mermaid
gantt
    title Cronograma do Projeto (3 dias)
    dateFormat  YYYY-MM-DD

    %% Dia 1
    section Front-end
    Componentes       :a1, 2025-01-01, 1d

    %% Dia 2
    Estilização       :a1, 2025-01-01 , 2025-01-03

    %% Dia 3
    section Back-end
    API               :b1, 2025-01-03, 1d
    Autenticação      :b2, 2025-01-03, 1d
```

---

# **🛠 Stack Detalhada**

### **Front-end**

- ⚛️ React
- 🟨 JavaScript
- 🎨 TailwindCSS

### **Back-end**

- 🟩 Node.js
- 🚏 Express

---

# **👤 Responsável**

[@GuilhermeNantes](https://github.com/GuilhermeNantes)

---

# **🤝 Contribuindo**

Contribuições são sempre bem-vindas!

- Consulte [`CONTRIBUTING.md`](CONTRIBUTING.md)
- Siga [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md)

---

# **🛠 Instalação**

```bash
git clone <url-do-repositorio>
cd nome-do-projeto
cd front-end
npm install
npm run dev
```

---

# **📸 Screenshots**

![Tela Inicial](./assets/home.png)

---

# **📄 Licença**

MIT
bé
Quer adicionar mais camadas ao README?
