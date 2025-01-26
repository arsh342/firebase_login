import AuthForm from '@/components/auth-form'
import { AuthProvider } from '@/contexts/auth-context'

export default function Home() {
  return (
      <AuthProvider>
        <AuthForm />
      </AuthProvider>
  )
}

