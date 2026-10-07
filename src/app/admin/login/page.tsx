'use client';

import React, { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';

  const [email, setEmail] = useState('amitvishwa1950@gmail.com');
  const [password, setPassword] = useState('Admin@OneStop2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e?: React.SyntheticEvent) => {
    e?.preventDefault?.();
    console.log('[LoginForm] handleSubmit started, email:', email);
    setError(null);
    setIsLoading(true);

    try {
      console.log('[LoginForm] Calling signIn credentials...');
      const res = await signIn('credentials', {
        redirect: false,
        email: email.trim(),
        password,
      });
      console.log('[LoginForm] signIn result:', res);

      if (res?.error) {
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
      } else {
        console.log('[LoginForm] Success, redirecting to:', callbackUrl);
        window.location.href = callbackUrl;
      }
    } catch (err: any) {
      console.error('[LoginForm] Unexpected error:', err);
      setError('An unexpected error occurred. Please check your connection.');
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-charcoal-800 mb-1.5"
        >
          Admin Email Address
        </label>
        <div className="relative rounded-xl shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-400">
            <Mail className="h-5 w-5" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full pl-11 pr-3.5 py-3 border border-cream-400 rounded-xl text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-sm font-medium"
            placeholder="admin@onestop.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-charcoal-800 mb-1.5"
        >
          Password
        </label>
        <div className="relative rounded-xl shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-400">
            <Lock className="h-5 w-5" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full pl-11 pr-11 py-3 border border-cream-400 rounded-xl text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-sm font-medium"
            placeholder="••••••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-charcoal-400 hover:text-charcoal-700"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div>
        <button
          id="admin-login-btn"
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-white font-semibold bg-wood-800 hover:bg-wood-900 active:bg-wood-950 shadow-warm-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wood-700 disabled:opacity-60 disabled:cursor-not-allowed text-base min-h-[48px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Authenticating...
            </>
          ) : (
            <>
              Sign In to CRM
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-wood-800 text-gold-400 shadow-warm-md mb-4 border border-wood-700">
          <ShieldCheck className="w-9 h-9" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-charcoal-900 tracking-tight">
          OneStop Interiors
        </h1>
        <p className="mt-2 text-sm text-charcoal-600 font-medium">
          Contractor Management & CRM Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-warm-lg rounded-2xl border border-cream-300 sm:px-10">
          <Suspense fallback={<div className="py-8 text-center text-charcoal-500 text-sm">Loading login portal...</div>}>
            <LoginForm />
          </Suspense>

          <div className="mt-6 pt-5 border-t border-cream-200 text-center">
            <p className="text-xs text-charcoal-500">
              Protected portal for Shobhnath Vishwakarma & authorized coordinators.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
