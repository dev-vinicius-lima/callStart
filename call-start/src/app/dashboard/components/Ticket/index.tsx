import { ticketProps } from '@/utils/Ticket.type'
import { CustomerProps } from '@/utils/customer.type'
import React from 'react'
import { FiFile, FiTrash2 } from 'react-icons/fi'
interface TicketItemProps {
  ticket: ticketProps
  customer: CustomerProps | null
}
const TicketItem = ({ ticket, customer }: TicketItemProps) => {
  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
        <td className="text-left pl-2 max-sm:max-w-28 ">{ticket?.name}</td>
        <td className="text-left hidden sm:table-cell">
          {ticket.created_at?.toLocaleDateString('pt-BR')}
        </td>
        <td className="text-left">
          <span className="bg-green-500 px-2 py-1 rounded">
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          <button className="mr-2">
            <FiTrash2 size={24} color="#EF4444" />
          </button>
          <button>
            <FiFile size={24} color="#3B82F6" />
          </button>
        </td>
      </tr>
    </>
  )
}

export default TicketItem
