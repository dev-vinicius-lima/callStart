'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '@/components/Input'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

const schema = z.object({
  name: z.string().min(1, 'O campo nome é obrigatório'),
  email: z
    .string()
    .email('Digite um email Válido!')
    .min(1, 'O campo email é obrigatório'),
  phone: z.string().refine(
    (value) => {
      return (
        /^(?:\(d{2}\)\s?)?\d{9}$/.test(value) ||
        /^\d{2}\s\d{9}$/.test(value) ||
        /^\d{11}$/.test(value)
      )
    },
    {
      message: 'O Número de telefone deve estar (DDD) 99999-9999',
    },
  ),
  address: z.string().optional(),
})

type FormDataProps = z.infer<typeof schema>
const NewCustomerForm = ({ userId }: { userId: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(schema),
  })

  const router = useRouter()

  const handleRegisterCustomer = async (data: FormDataProps) => {
    await api.post('/api/customer', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      userId,
    })
    router.refresh()
    router.replace('/dashboard/customer')
  }
  return (
    <form
      className="flex flex-col mt-6"
      onSubmit={handleSubmit(handleRegisterCustomer)}
    >
      <label className="mb-1 text-lg font-medium">Nome Completo</label>
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome completo"
        error={errors?.name?.message}
        register={register}
      />
      <section className="flex gap-2 my-2 flex-col sm:flex-row">
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Telefone</label>
          <Input
            type="text"
            name="phone"
            placeholder="Exemplo: (DDD) 99999-9999"
            error={errors?.phone?.message}
            register={register}
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Email</label>
          <Input
            type="email"
            name="email"
            placeholder="Digite o email..."
            error={errors?.email?.message}
            register={register}
          />
        </div>
        <label className="mb-1 text-lg font-medium">Endereço</label>
        <Input
          type="text"
          name="address"
          placeholder="Digite o Endereço do cliente."
          error={errors?.address?.message}
          register={register}
        />
      </section>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 duration-200 px-4 py-1 h-11 rounded text-white"
      >
        Cadastrar
      </button>
    </form>
  )
}

export default NewCustomerForm
