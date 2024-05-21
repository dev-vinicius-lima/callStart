import Image from 'next/image'
import imagemHero from '@/assets/hero.svg'

export default function Home() {
  return (
    <main className="flex items-center flex-col justify-center min-h-[calc(100vh-100px)] ">
      <h1 className="font-medium text-3xl mb-2 mb:text-5xl">
        Gerencie sua empresa
      </h1>
      <h2 className="font-medium text-2xl mb-8 text-blue-600 md:text-4xl">
        Atendimento, clientes e chamados
      </h2>
      <Image
        src={imagemHero}
        alt="Hero"
        width={600}
        className="max-w-sm md:max-w-xl"
      />
    </main>
  )
}
