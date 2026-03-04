'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginThunk, clearError } from '@/store/slices/authSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const loginSchema = z.object({
    email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
    password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    React.useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router]);

    const onSubmit = async (data: LoginFormValues) => {
        dispatch(clearError());
        const resultAction = await dispatch(loginThunk(data));
        if (loginThunk.fulfilled.match(resultAction)) {
            router.push('/dashboard');
        }
    };

    return (
        <div className="w-full h-full flex flex-col justify-center max-w-sm mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-2xl font-heading font-black text-[#171b2d] mb-3 tracking-tighter">Connexion</h2>
                <p className="text-gray-500 text-[13px] font-medium opacity-80">Entrez vos identifiants pour acc�der � votre compte</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {error && (
                    <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded text-sm text-center font-medium">
                        {error}
                    </div>
                )}

                <div className="space-y-1 group">
                    <div className="relative">
                        <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
                        <input
                            {...register('email')}
                            type="email"
                            placeholder="Entrez votre email"
                            className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded focus:ring-1 outline-none transition-all font-medium placeholder:text-gray-400 text-[13px] ${
                                errors.email 
                                ? 'border-red-500 focus:ring-red-500 text-red-900' 
                                : 'border-gray-300 focus:ring-slate-500 focus:border-none text-slate-800'
                            }`}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-[11px] text-red-500 font-bold mt-1 ml-1">{errors.email.message}</p>
                    )}
                </div>

                <div className="space-y-1 group">
                    <div className="relative">
                        <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${errors.password ? 'text-red-400' : 'text-gray-400'}`} />
                        <input
                            {...register('password')}
                            type={showPassword ? "text" : "password"}
                            placeholder="Entrez votre mot de passe"
                            className={`w-full pl-10 pr-12 py-2.5 bg-white border rounded focus:ring-1 outline-none transition-all font-medium placeholder:text-gray-400 text-[13px] ${
                                errors.password 
                                ? 'border-red-500 focus:ring-red-500 text-red-900' 
                                : 'border-gray-200 focus:ring-slate-500 focus:border-none text-slate-900'
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-600 transition-colors"
                        >
                            {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-[11px] text-red-500 font-bold mt-1 ml-1">{errors.password.message}</p>
                    )}
                </div>

                <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="remember"
                            className="w-3.5 h-3.5 border-slate-200 rounded-sm text-[#171b2d] focus:ring-[#171b2d] cursor-pointer"
                        />
                        <label htmlFor="remember" className="text-[12px] text-slate-500 font-medium select-none cursor-pointer">
                            Se souvenir de moi
                        </label>
                    </div>
                    <Link href="/forgot-password" className="text-[11px] text-[#171b2d] hover:underline font-bold opacity-80 italic">
                        Mot de passe oubli� ?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-6 bg-[#171b2d] hover:bg-black transition-all duration-300 text-white font-semibold rounded-sm text-[13px] tracking-wide mt-2 flex items-center justify-center space-x-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Connexion en cours...</span>
                        </>
                    ) : (
                        <span>Se connecter</span>
                    )}
                </button>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] items-center bg-white px-2 w-fit mx-auto">
                        <span className="text-gray-500 font-medium uppercase tracking-widest">ou</span>
                    </div>
                </div>

                <button
                    type="button"
                    className="w-full py-3 px-6 bg-white border border-gray-200 hover:bg-slate-50 text-slate-600 font-medium rounded transition-all flex items-center justify-center space-x-3 text-[13px]"
                >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    <span className="tracking-tight">Se connecter avec Google</span>
                </button>

                <p className="text-center text-[12px] text-gray-500 font-medium mt-6">
                    Vous n'avez pas de compte ? <Link href="/register" className="text-[#171b2d] hover:underline font-bold ml-1">S'inscrire</Link>
                </p>
            </form>
        </div>
    );
}
