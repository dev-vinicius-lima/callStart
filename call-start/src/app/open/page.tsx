'use client'
import Input from '@/components/Input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FiSearch, FiX } from 'react-icons/fi'
import { useState } from 'react'
import FormTicket from './components/FormTicket'
import { api } from '@/lib/api'

const schema = z.object({
  email: z
    .string()
    .email('Digite o email do cliente para localizar.')
    .min(1, 'O campo email é obrigatório'),
})
export interface CustomerDataInfoProps {
  id: string
  name: string
}

type FormData = z.infer<typeof schema>
const OpenTicket = () => {
  const [customer, setCustomer] = useState<CustomerDataInfoProps | null>(null)
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  // limpar o cliente selecionado
  const handleClearCustomer = () => {
    setCustomer(null)
    setValue('email', '')
  }

  const handleSearchCustomer = async (data: FormData) => {
    const response = await api.get('/api/customer', {
      params: {
        email: data.email,
      },
    })

    // verificar se o cliente existe no sistema
    if (response.data === null) {
      setError('email', {
        type: 'custom',
        message: 'Cliente não encontrado!',
      })
      return
    }

    // definir o cliente selecionado para abrir o chamado
    setCustomer({
      id: response.data.id,
      name: response.data.name,
    })
  }
  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <h2 className="font-bold text-3xl text-center mt-24">Abrir chamado</h2>
      <main className="flex flex-col mt-4 mb-2">
        {customer ? (
          <div className="py-6 px-4 rounded border-2 flex items-center justify-between">
            <p className="text-lg">
              <strong>Cliente selecionado:</strong> {customer.name}
            </p>
            <button className=" h-11 px-2 flex items-center justify-center rounded">
              <FiX size={30} color="#ff2929" onClick={handleClearCustomer} />
            </button>
          </div>
        ) : (
          <form
            className="bg-slate-200 py-6 px-2 rounded border-2"
            onSubmit={handleSubmit(handleSearchCustomer)}
          >
            <div className="flex flex-col gap-3">
              <Input
                name="email"
                placeholder="Digite o email do cliente..."
                type="text"
                error={errors.email?.message}
                register={register}
              />

              <button
                type="submit"
                className="bg-blue-500 flex flex-row gap-3 px-2 h-11 items-center justify-center text-white font-bold rounded hover:bg-blue-600"
              >
                Procurar Cliente <FiSearch size={24} color="white" />
              </button>
            </div>
          </form>
        )}
        {/* verificar se o cliente existe no sistema e mostrar o formulário */}
        {customer !== null && <FormTicket customer={customer} />}
      </main>
    </div>
  )
}

export default OpenTicket
