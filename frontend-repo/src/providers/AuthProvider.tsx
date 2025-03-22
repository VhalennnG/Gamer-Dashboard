'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/config';

// Context type definition
type AuthContextType = {
  user: FirebaseUser | null;
  loading: boolean;
};

// Creating context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

// Hook untuk menggunakan AuthContext
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fungsi untuk memperbarui token di localStorage
  const updateToken = async (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      try {
        // Dapatkan fresh token dari Firebase
        const token = await firebaseUser.getIdToken(true);
        // Simpan token ke localStorage
        localStorage.setItem('authToken', token);
      } catch (error) {
        console.error('Error refreshing token:', error);
        // Jika gagal mendapatkan token baru, redirect ke login
        router.push('/');
      }
    } else {
      // Hapus token jika user tidak ada
      localStorage.removeItem('authToken');
    }
  };

  // Listen untuk perubahan status auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      // Update token setiap kali auth state berubah
      await updateToken(firebaseUser);
      
      setLoading(false);
      
      // Jika tidak ada user dan bukan di halaman login, redirect ke login
      if (!firebaseUser && window.location.pathname !== '/') {
        router.push('/');
      }
    });

    // Bersihkan listener saat unmount
    return () => unsubscribe();
  }, [router]);

  // Set auto refresh token (setiap 50 menit)
  useEffect(() => {
    if (!user) return;

    const refreshInterval = setInterval(async () => {
      try {
        await updateToken(user);
        console.log('Token refreshed');
      } catch (error) {
        console.error('Failed to refresh token:', error);
      }
    }, 50 * 60 * 1000); // 50 menit (Firebase token umumnya valid selama 1 jam)

    return () => clearInterval(refreshInterval);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;