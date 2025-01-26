'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import {
    User,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    signInWithPopup
} from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'

interface AuthContextType {
    user: User | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<void>
    signUp: (email: string, password: string) => Promise<void>
    signInWithGoogle: () => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const signIn = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password)
    }

    const signUp = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleProvider)
    }

    const signOut = async () => {
        await firebaseSignOut(auth)
    }

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, signOut }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

