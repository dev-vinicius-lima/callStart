'use client'
import Input from '@/components/Input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { api } from '@/lib/api'
import { CustomerDataInfoProps } from '../../page'

const schema = z.object({
  name: z.string().min(1, 'O nome do chamado é obrigatório'),
  description: z.string().min(1, 'Descreva um pouco sobre seu problema...'),
})

type FormDataProps = z.infer<typeof schema>

interface FormTicketProps {
  customer: CustomerDataInfoProps
}
const FormTicket = ({ customer }: FormTicketProps) => {
  const {
    register,
    handleSubmit,
    // setValue,
    setValue,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(schema),
  })

  const handleRegisterTicket = async (data: FormDataProps) => {
    const { name, description } = data
    const response = await api.post('/api/ticket', {
      name,
      description,
      customerId: customer.id,
    })

    if (response.status === 201) {
      alert('Chamado criado com sucesso!')
    }
    setValue('name', '')
    setValue('description', '')
  }
  return (
    <form
      className="bg-slate-200 mt-6 py-6 px-4 rounded border-2"
      onSubmit={handleSubmit(handleRegisterTicket)}
    >
      <label className="mb-1 font-medium text-lg">Nome do chamado</label>
      <Input
        register={register}
        type="text"
        placeholder="Nome do chamado"
        name="name"
        error={errors.name?.message}
      />
      <div>
        <label className="mt-4 mb-1 font-medium text-lg">
          Descreva o problema
        </label>
        <textarea
          className="w-full border-2 rounded-md h-24 resize-none mb-2 px-2"
          placeholder="Descreva seu problema..."
          id="description"
          {...register('description')}
        ></textarea>
        {errors.description?.message && (
          <p className="text-red-500 mt-0">{errors.description?.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="mt-2 w-full h-11 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Cadastrar
      </button>
    </form>
  )
}

export default FormTicket
