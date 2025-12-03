import { DataTable } from "../../components/DataTable";

  const appointments = [
    { id: 1, customer: 'Carlos Silva', service: 'Corte + Barba', date: '01/12/2024', time: '10:00', status: 'Agendado' },
    { id: 2, customer: 'Ana Paula Santos', service: 'Corte Masculino', date: '01/12/2024', time: '11:00', status: 'Agendado' },
    { id: 3, customer: 'Roberto Oliveira', service: 'Barba Completa', date: '01/12/2024', time: '14:00', status: 'Concluído' },
    { id: 4, customer: 'Fernanda Costa', service: 'Pigmentação', date: '02/12/2024', time: '09:00', status: 'Agendado' },
    { id: 5, customer: 'Lucas Mendes', service: 'Corte Masculino', date: '30/11/2024', time: '16:00', status: 'Cancelado' },
  ];

  const columns = [
    { key: 'customer', header: 'Cliente' },
    { key: 'service', header: 'Serviço' },
    { key: 'date', header: 'Data' },
    { key: 'time', header: 'Horário' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
          {item.status}
        </span>
      )
    },
  ];

const Agendamentos = () => {
  return (
    <div className="bg-[#07060a] text-white font-sans antialiased">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold tracking-tight">Agendamentos</h1>
          <p className="mt-1 text-muted-foreground">Gerencie os agendamentos da sua empresa</p>
        </div>
        <DataTable
          data={appointments}
          columns={columns}
          title="Lista de Agendamentos"
          searchPlaceholder="Buscar agendamento..."
          onAdd={() => console.log('Adicionar')}
          onEdit={(customer) => console.log('Editar', customer)}
          onDelete={(customer) => console.log('Deletar', customer)}
          onView={(customer) => console.log('Ver', customer)}
          addLabel="Novo Agendamento"
          itemsPerPage={10}
        />
      </main>
    </div>
  )
}

export default Agendamentos