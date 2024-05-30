'use client'
import { ModalTicket } from '@/components/Modal'
import { ticketProps } from '@/utils/Ticket.type'
import { CustomerProps } from '@/utils/customer.type'
import { createContext, ReactNode, useState } from 'react'

interface TicketInfoProps {
  ticket: ticketProps
  customer: CustomerProps | null
}
interface ModalContextDataProps {
  visible: boolean
  handleModalVisible: () => void
  ticket: TicketInfoProps | undefined
  setDetailTicket: (deatil: TicketInfoProps) => void
}

export const modalContext = createContext({} as ModalContextDataProps)
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false)
  const [ticket, setTicket] = useState<TicketInfoProps>()

  const handleModalVisible = () => {
    setVisible(!visible)
  }

  const setDetailTicket = (detail: TicketInfoProps) => {
    setTicket(detail)
  }
  return (
    <modalContext.Provider
      value={{ visible: false, handleModalVisible, ticket, setDetailTicket }}
    >
      {visible && <ModalTicket />}
      {children}
    </modalContext.Provider>
  )
}
