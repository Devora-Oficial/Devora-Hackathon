// components/DataTable/DataTable.jsx
import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

// Importa os componentes de UI e utilitários
import { cn } from '../../utils/cn'; 
import Button from '../ui/Button'; 
import Input from '../ui/Input'; 
// Label e Modal não são necessários DENTRO da DataTable

/**
 * UTILS INTERNOS
 */
const getValue = (item, key) => {
  if (typeof key === 'string' && key.includes('.')) {
    return key.split('.').reduce((obj, k) => obj?.[k], item);
  }
  return item[key];
};

/**
 * COMPONENTE DATATABLE
 */
export function DataTable({
  data,
  columns,
  title,
  searchPlaceholder = 'Buscar...',
  onAdd,
  onEdit,
  onDelete,
  onView,
  addLabel = 'Adicionar',
  itemsPerPage = 5,
  className,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Lógica de Filtragem, Paginação, etc. (mantida intacta)
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className={cn('bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden flex flex-col', className)}>
      {/* Header da Tabela com Busca e Botão Adicionar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full sm:w-64"
            />
          </div>
          
          {onAdd && (
            <Button onClick={onAdd} className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              {addLabel}
            </Button>
          )}
        </div>
      </div>

      {/* Corpo da Tabela com Dados */}
      {/* ... Código omitido para brevidade, mas o restante é igual ao original ... */}
      <div className="overflow-x-auto flex-1 min-h-[300px]">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-600 font-medium">
            <tr>
              {columns.map((column, idx) => (
                <th key={idx} className={cn('px-6 py-4', column.className)}>
                  {column.header}
                </th>
              ))}
              {(onView || onEdit || onDelete) && (
                <th className="px-6 py-4 text-right">Ações</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center gap-2">
                    <Search className="h-8 w-8 text-slate-300" />
                    <p>Nenhum registro encontrado</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                  {columns.map((column, idx) => (
                    <td key={idx} className={cn('px-6 py-4 text-slate-600', column.className)}>
                      {column.render ? column.render(item) : getValue(item, column.key)}
                    </td>
                  ))}
                  {(onView || onEdit || onDelete) && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {onView && (
                          <Button variant="ghost" size="icon" onClick={() => onView(item)} title="Visualizar">
                            <Eye className="h-4 w-4 text-slate-500" />
                          </Button>
                        )}
                        {onEdit && (
                          <Button variant="ghost" size="icon" onClick={() => onEdit(item)} title="Editar">
                            <Edit className="h-4 w-4 text-blue-600" />
                          </Button>
                        )}
                        {onDelete && (
                          <Button variant="ghost" size="icon" onClick={() => onDelete(item)} title="Excluir">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


      {/* Paginação */}
      {totalPages > 0 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <p className="text-xs text-slate-500">
            {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} de {filteredData.length}
          </p>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8 bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-slate-600 min-w-[3rem] text-center">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === totalPages}
              className="h-8 w-8 bg-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}