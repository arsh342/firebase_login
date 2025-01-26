'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { FirebaseError } from 'firebase/app'

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { signIn, signUp, signInWithGoogle } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            if (isLogin) {
                await signIn(email, password)
            } else {
                await signUp(email, password)
            }
        } catch (err) {
            if (err instanceof FirebaseError) {
                switch (err.code) {
                    case 'auth/invalid-email':
                        setError('Invalid email address format.')
                        break
                    case 'auth/user-disabled':
                        setError('This account has been disabled.')
                        break
                    case 'auth/user-not-found':
                        setError('No account found with this email.')
                        break
                    case 'auth/wrong-password':
                        setError('Incorrect password.')
                        break
                    case 'auth/email-already-in-use':
                        setError('An account already exists with this email.')
                        break
                    case 'auth/operation-not-allowed':
                        setError('Email/password accounts are not enabled. Please contact support.')
                        break
                    case 'auth/weak-password':
                        setError('Password should be at least 6 characters.')
                        break
                    default:
                        setError('Authentication failed. Please try again.')
                }
            } else {
                setError('An unexpected error occurred. Please try again.')
            }
            console.error(err)
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle()
        } catch (err) {
            setError('Google Sign-In failed. Please try again.')
            console.error(err)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-yellow-50 p-4">
            <div className="w-full max-w-md bg-white border-4 border-black rounded-2xl p-8 transform transition-transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex gap-4 mb-8">
                    <button
                        type="button"
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-2 text-lg font-bold rounded-full border-4 border-black transition-all
              ${!isLogin ? 'bg-blue-400 -translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-white'}`}
                    >
                        Signup
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-2 text-lg font-bold rounded-full border-4 border-black transition-all
              ${isLogin ? 'bg-blue-400 -translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-white'}`}
                    >
                        Login
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full p-4 text-lg border-4 border-black rounded-full focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full p-4 text-lg border-4 border-black rounded-full focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50"
                            required
                            minLength={6}
                        />
                    </div>
                    {error && (
                        <div className="p-4 bg-red-100 border-4 border-black rounded-xl">
                            <p className="text-red-600 font-bold">{error}</p>
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full py-4 text-xl font-bold bg-green-400 border-4 border-black rounded-full transform transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <div className="mt-6">
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full py-4 text-xl font-bold bg-white border-4 border-black rounded-full transform transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
                    >
                        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                            <path fill="none" d="M1 1h22v22H1z" />
                        </svg>
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

