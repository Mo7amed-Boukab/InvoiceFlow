'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Building2, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { registerThunk, clearError } from '@/store/slices/authSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const registerSchema = z.object({
    companyName: z.string().min(2, { message: "Le nom de l'entreprise doit contenir au moins 2 caractères" }),
    firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
    lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
    password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, error } = useAppSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            companyName: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    });

    const onSubmit = async (data: RegisterFormValues) => {
        dispatch(clearError());
        
        const { confirmPassword, ...dataToSubmit } = data;

        const resultAction = await dispatch(registerThunk(dataToSubmit));
        if (registerThunk.fulfilled.match(resultAction)) {
            router.push('/dashboard');
        }
    };

    return (
        <div className="w-full h-full flex flex-col justify-center max-w-md mx-auto py-8">
            <div className="text-center mb-10">
                <h2 className="text-2xl font-heading font-black text-[#171b2d] mb-3 tracking-tighter">Cr�er un Compte</h2>
                <p className="text-gray-500 text-[13px] font-medium opacity-80 px-4">Entrez vos informations pour cr�er votre compte</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {error && (
                    <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded text-sm text-center font-medium">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <div className="relative">
                            <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${errors.firstName ? 'text-red-400' : 'text-slate-300'}`} />
                            <input
                                {...register('firstName')}
                                type="text"
                                placeholder="Pr�nom"
                                className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded focus:ring-1 outline-none transition-all font-medium placeholder:text-gray-400 text-[13px] ${
                                    errors.firstName 
                                    ? 'border-red-500 focus:ring-red-500 text-red-900' 
                                    : 'border-gray-300 focus:ring-slate-500 focus:border-none text-slate-800'
                                }`}
                            />
                        </div>
                        {errors.firstName && (
                            <p className="text-[11px] text-red-500 font-bold ml-1">{errors.firstName.message}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <div className="relative">
                            <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${errors.lastName ? 'text-red-400' : 'text-slate-300'}`} />
                            <input
                                {...register('lastName')}
                                type="text"
                                placeholder="Nom"
                                className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded focus:ring-1 outline-none transition-all font-medium placeholder:text-gray-400 text-[13px] ${
                                    errors.lastName 
                                    ? 'border-red-500 focus:ring-red-500 text-red-900' 
                                    : 'border-gray-300 focus:ring-slate-500 focus:border-none text-slate-800'
                                }`}
                            />
                        </div>
                        {errors.lastName && (
                            <p className="text-[11px] text-red-500 font-bold ml-1">{errors.lastName.message}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="relative">
                        <Building2 className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${errors.companyName ? 'text-red-400' : 'text-slate-300'}`} />
                        <input
                            {...register('companyName')}
                            type="text"
                            placeholder="Nom de votre entreprise"
                            className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded focus:ring-1 outline-none transition-all font-medium placeholder:text-gray-400 text-[13px] ${
                                errors.companyName 
                                ? 'border-red-500 focus:ring-red-500 text-red-900' 
                                : 'border-gray-300 focus:ring-slate-500 focus:border-none text-slate-800'
                            }`}
                        />
                    </div>
                    {errors.companyName && (
                        <p className="text-[11px] text-red-500 font-bold mt-1 ml-1">{errors.companyName.message}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <div className="relative">
                        <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${errors.email ? 'text-red-400' : 'text-slate-300'}`} />
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

                <div className="space-y-1">
                    <div className="relative">
                        <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${errors.password ? 'text-red-400' : 'text-slate-300'}`} />
                        <input
                            {...register('password')}
                            type={showPassword ? "text" : "password"}
                            placeholder="Entrez votre mot de passe"
                            className={`w-full pl-10 pr-12 py-2.5 bg-white border rounded focus:ring-1 outline-none transition-all font-medium placeholder:text-gray-400 text-[13px] ${
                                errors.password 
                                ? 'border-red-500 focus:ring-red-500 text-red-900' 
                                : 'border-gray-300 focus:ring-slate-500 focus:border-none text-slate-800'
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

                <div className="space-y-1">
                    <div className="relative">
                        <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${errors.confirmPassword ? 'text-red-400' : 'text-slate-300'}`} />
                        <input
                            {...register('confirmPassword')}
                            type="password"
                            placeholder="Confirmer votre mot de passe"
                            className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded focus:ring-1 outline-none transition-all font-medium placeholder:text-gray-400 text-[13px] ${
                                errors.confirmPassword 
                                ? 'border-red-500 focus:ring-red-500 text-red-900' 
                                : 'border-gray-300 focus:ring-slate-500 focus:border-none text-slate-800'
                            }`}
                        />
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-[11px] text-red-500 font-bold mt-1 ml-1">{errors.confirmPassword.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-6 bg-[#171b2d] hover:bg-black transition-all duration-300 text-white font-semibold rounded-sm text-[13px] tracking-wide mt-4 flex justify-center items-center space-x-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin w-4 h-4" />
                            <span>Inscription en cours...</span>
                        </>
                    ) : (
                        <span>S'inscrire</span>
                    )}
                </button>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
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

                <p className="text-center text-[12px] text-slate-400 font-medium mt-6">
                    Vous avez d�j� un compte ? <Link href="/login" className="text-[#171b2d] hover:underline font-bold ml-1">Se connecter</Link>
                </p>
            </form>
        </div>
    );
}
