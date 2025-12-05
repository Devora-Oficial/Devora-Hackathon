const db = require("../database/db");

const validStatus = ["Agendado", "Cancelado", "Concluído"];

const AgendamentoModel = {
  // 1. CORREÇÃO: Usa JOIN para obter o nome do serviço e seleciona cliente_nome
  async listarPorEmpresa(empresa_id) {
    const [rows] = await db.query(
      `SELECT
        a.*,
        s.nome AS service_name,
        a.cliente_nome 
      FROM agendamentos a
      JOIN servicos s ON a.servico_id = s.id
      WHERE a.empresa_id = ? 
      ORDER BY a.data_hora ASC`,
      [empresa_id]
    );
    // Agora o backend retorna 'service_name' e 'cliente_nome' que o frontend espera.
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await db.query("SELECT * FROM agendamentos WHERE id = ?", [id]);
    return rows[0];
  },

  // 2. CORREÇÃO: Inclui 'cliente_nome' no INSERT e remove 'duracao_minutos'
  async criar(dados) {
    const { servico_id, empresa_id, data_hora, status, observacao, cliente_nome } = dados;
    // O campo 'duracao_minutos' foi removido da desestruturação.

    const statusValido = validStatus.includes(status) ? status : "Agendado";

    const [result] = await db.query(
      "INSERT INTO agendamentos (servico_id, empresa_id, data_hora, status, observacao, cliente_nome) VALUES (?, ?, ?, ?, ?, ?)",
      [servico_id, empresa_id, data_hora, statusValido, observacao || null, cliente_nome]
    );
    return result.insertId;
  },

  // 3. CORREÇÃO: Inclui 'cliente_nome' no UPDATE e permite a atualização de servico_id e remove 'duracao_minutos'
  async atualizar(id, dados) {
    // Adiciona cliente_nome e remove duracao_minutos
    const { data_hora, status, observacao, cliente_nome, servico_id } = dados; 
    const statusValido = validStatus.includes(status) ? status : "Agendado";

    let query = "UPDATE agendamentos SET data_hora = ?, status = ?, observacao = ?, cliente_nome = ?";
    const params = [data_hora, statusValido, observacao || null, cliente_nome];
    
    // Se o servico_id for enviado no payload (para mudar o serviço do agendamento)
    if (servico_id) {
        query += ", servico_id = ?";
        params.push(servico_id);
    }
    
    query += " WHERE id = ?";
    params.push(id);


    const [result] = await db.query(query, params);
    return result.affectedRows;
  },

  async deletar(id) {
    const [result] = await db.query("DELETE FROM agendamentos WHERE id = ?", [id]);
    return result.affectedRows;
  }
};

module.exports = AgendamentoModel;
