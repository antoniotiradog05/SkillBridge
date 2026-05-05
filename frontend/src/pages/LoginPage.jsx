import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrainCircuit, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="w-full max-w-md glass-card p-8 relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/20 text-primary-400 mb-4 cursor-pointer" onClick={() => navigate('/')}>
                        <BrainCircuit className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Bienvenido de nuevo</h1>
                    <p className="text-slate-400">Inicia sesión para continuar tu aprendizaje</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/50 flex items-center gap-3 text-red-400 text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
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
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-medium text-slate-300">Contraseña</label>
                            <a href="#" className="text-xs text-primary-400 hover:text-primary-300">¿Olvidaste tu contraseña?</a>
                        </div>
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

                    <button type="submit" className="w-full btn-primary py-3 flex items-center justify-center gap-2 mt-4">
                        Iniciar Sesión <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <p className="text-center text-sm text-slate-400 mt-6">
                    ¿No tienes cuenta? <Link to="/register" className="text-primary-400 font-medium hover:underline">Regístrate gratis</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default LoginPage;
