'use client'
import { useContext } from 'react'
import { ticketProps } from '@/utils/Ticket.type'
import { CustomerProps } from '@/utils/customer.type'
import { FiCheckSquare, FiFile } from 'react-icons/fi'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { modalContext } from '@/providers/modal'
interface TicketItemProps {
  ticket: ticketProps
  customer: CustomerProps | null
}
const TicketItem = ({ ticket, customer }: TicketItemProps) => {
  const router = useRouter()
  const { handleModalVisible, setDetailTicket } = useContext(modalContext)
  const handleChangeStatus = async () => {
    try {
      const response = await api.patch('/api/ticket', {
        id: ticket.id,
      })
      router.refresh()
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpenModal = () => {
    handleModalVisible()
    setDetailTicket({
      customer,
      ticket,
    })
  }
  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
        <td className="text-left pl-2 max-sm:max-w-28 ">{customer?.name}</td>
        <td className="text-left hidden sm:table-cell">
          {ticket.created_at?.toLocaleDateString('pt-BR')}
        </td>
        <td className="text-left">
          <span className="bg-green-500 px-2 py-1 rounded">
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          <button className="mr-2" onClick={handleChangeStatus}>
            <FiCheckSquare size={24} color="#131313" />
          </button>
          <button onClick={handleOpenModal}>
            <FiFile size={24} color="#3B82F6" />
          </button>
        </td>
      </tr>
    </>
  )
}

export default TicketItem
