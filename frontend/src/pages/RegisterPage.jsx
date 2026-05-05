import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrainCircuit, Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(username, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al registrar usuario');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="w-full max-w-md glass-card p-8 relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/20 text-primary-400 mb-4 cursor-pointer" onClick={() => navigate('/')}>
                        <BrainCircuit className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Únete a SkillBridge</h1>
                    <p className="text-slate-400">Potencia tu carrera tech con IA y Mentores</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/50 flex items-center gap-3 text-red-400 text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Nombre de Usuario</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input 
                                type="text" 
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                                placeholder="AlexDev"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Correo Electrónico</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                                placeholder="tu@email.com"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full btn-primary py-3 flex items-center justify-center gap-2 mt-6">
                        Crear Cuenta <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <p className="text-center text-sm text-slate-400 mt-6">
                    ¿Ya tienes una cuenta? <Link to="/login" className="text-primary-400 font-medium hover:underline">Inicia Sesión</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default RegisterPage;
