import { useState, useEffect } from 'react'
import { User, AuthError } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)

      // Handle Google OAuth sign-in and save email account data
      if (event === 'SIGNED_IN' && session?.user) {
        await handleAuthSuccess(session)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleAuthSuccess = async (session: any) => {
    try {
      // Check if this is a Google OAuth sign-in
      const provider = session.user.app_metadata?.provider

      if (provider === 'google') {
        // Extract email from user data
        const email = session.user.email

        if (email && session.provider_token) {
          // Check if email account already exists
          const { data: existingAccount } = await supabase
            .from('email_accounts')
            .select('id')
            .eq('user_id', session.user.id)
            .eq('email', email)
            .single()

          if (!existingAccount) {
            // Save the email account data
            const { error } = await supabase
              .from('email_accounts')
              .insert({
                user_id: session.user.id,
                provider: 'gmail',
                email: email,
                access_token: session.provider_token,
                refresh_token: session.provider_refresh_token,
                token_expiry: session.expires_at
                  ? new Date(session.expires_at * 1000)
                  : new Date(Date.now() + (3600 * 1000)) // Default 1 hour if not provided
              })

            if (error) {
              console.error('Error saving email account:', error)
            } else {
              console.log('Email account saved successfully for:', email)
            }
          } else {
            // Update existing account with new tokens
            const { error } = await supabase
              .from('email_accounts')
              .update({
                access_token: session.provider_token,
                refresh_token: session.provider_refresh_token,
                token_expiry: session.expires_at
                  ? new Date(session.expires_at * 1000)
                  : new Date(Date.now() + (3600 * 1000)),
                is_active: true,
                updated_at: new Date()
              })
              .eq('user_id', session.user.id)
              .eq('email', email)

            if (error) {
              console.error('Error updating email account:', error)
            } else {
              console.log('Email account updated successfully for:', email)
            }
          }
        }
      }
    } catch (error) {
      console.error('Error in handleAuthSuccess:', error)
    }
  }

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}`,
          scopes: [
            'openid',
            'email',
            'profile',
            'https://www.googleapis.com/auth/gmail.readonly',
            'https://www.googleapis.com/auth/gmail.modify',
            'https://www.googleapis.com/auth/gmail.send',
          ].join(' '),
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      })

      if (error) throw error
      
    } catch (error) {
      console.error('Error signing in with Google:', error)
      throw error
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
    } catch (error) {
      console.error('Error signing in with email:', error)
      throw error
    }
  }

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
    } catch (error) {
      console.error('Error signing up with email:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      // Timeout de 5 segundos para el logout remoto
      await Promise.race([
        supabase.auth.signOut(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Logout timeout')), 5000))])
      setUser(null)
    } catch (error) {
      // Si falla el logout remoto, igual limpia el estado local
      setUser(null)
      console.log('Logout completed (with remote logout warning):', error)
    }
  }
  const getEmailAccounts = async () => {
    // Check if user is available before making the query
    if (!user?.id) {
      return []
    }

    try {
      const { data, error } = await supabase
        .from('email_accounts')
        .select('*')
        .eq('user_id', user?.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching email accounts:', error)
      return []
    }
  }

  return {
    user,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    getEmailAccounts,
  }
}