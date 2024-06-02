'use client'
import { useRouter } from 'next/navigation'
import { FiRefreshCcw } from 'react-icons/fi'

const ButtonRefresh = () => {
  const router = useRouter()
  return (
    <button
      onClick={() => router.refresh()}
      className="bg-green-500 px-4 py-1 rounded"
    >
      <FiRefreshCcw size={30} color="#fff" />
    </button>
  )
}

export default ButtonRefresh
