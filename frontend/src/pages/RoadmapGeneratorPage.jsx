import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Sparkles, Code2, Database, Layout, Terminal, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

const skillsCategories = [
  {
    category: 'Frontend',
    icon: Layout,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    skills: ['React', 'Angular', 'Vue.js', 'Tailwind CSS', 'TypeScript']
  },
  {
    category: 'Backend',
    icon: Terminal,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    skills: ['Node.js', 'Python', 'Java', 'Spring Boot', 'C#', 'Go']
  },
  {
    category: 'DevOps & Data',
    icon: Database,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    skills: ['Docker', 'AWS', 'MySQL', 'MongoDB', 'Kubernetes', 'Git']
  }
];

function RoadmapGeneratorPage() {
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [experienceLevel, setExperienceLevel] = useState('Principiante');
    const [hoursPerWeek, setHoursPerWeek] = useState('10');
    const [roadmap, setRoadmap] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState(0);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const toggleSkill = (skill) => {
        setSelectedSkills((prev) =>
            prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
        );
    };

    const loadingMessages = [
      "Analizando tus habilidades seleccionadas...",
      "Consultando la base de conocimientos tecnológicos...",
      "Diseñando una ruta de aprendizaje óptima...",
      "Organizando proyectos y recursos recomendados...",
      "Dando los últimos toques a tu roadmap..."
    ];

    const handleGenerateRoadmap = async () => {
        if (selectedSkills.length === 0) {
            setError('Por favor, selecciona al menos una tecnología para continuar.');
            return;
        }
        setLoading(true);
        setError('');
        setRoadmap('');
        
        // Simular progreso visual de carga
        const interval = setInterval(() => {
          setLoadingStep(prev => (prev < 4 ? prev + 1 : prev));
        }, 1500);

        try {
            const response = await axios.post('http://localhost:5000/api/roadmaps/generate', {
                skills: selectedSkills,
                experienceLevel,
                hoursPerWeek
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            clearInterval(interval);
            setRoadmap(response.data.roadmap);
        } catch (err) {
            clearInterval(interval);
            console.error(err);
            setError('Hubo un error al conectar con el motor de IA. Por favor, intenta de nuevo más tarde.');
        } finally {
            setLoading(false);
            setLoadingStep(0);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-[128px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full mix-blend-screen filter blur-[128px] pointer-events-none"></div>

            <nav className="relative z-50 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <BrainCircuit className="w-8 h-8 text-primary-500" />
                        <span className="text-xl font-bold text-white">SkillBridge IA</span>
                    </div>
                    <button onClick={() => navigate('/dashboard')} className="text-slate-400 hover:text-white transition-colors font-medium">Volver al Panel</button>
                </div>
            </nav>

            <main className="relative z-10 max-w-4xl mx-auto px-6 pt-16 pb-32">
                <AnimatePresence mode="wait">
                    {!roadmap ? (
                        <motion.div 
                            key="selector"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-12"
                        >
                            <div className="text-center space-y-4">
                                <motion.div 
                                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
                                  className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(99,102,241,0.3)]"
                                >
                                  <Sparkles className="w-8 h-8 text-primary-400" />
                                </motion.div>
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                                    Diseña tu Futuro
                                </h1>
                                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                                    Selecciona las tecnologías que deseas dominar. Nuestra IA analizará las tendencias actuales y creará un plan de estudio hiper-personalizado para ti.
                                </p>
                            </div>

                            <div className="space-y-8">
                                {skillsCategories.map((group, idx) => (
                                    <motion.div 
                                      key={group.category}
                                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                                      className="glass-card p-8"
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className={`p-2 rounded-lg ${group.bg} ${group.color}`}>
                                                <group.icon className="w-5 h-5" />
                                            </div>
                                            <h2 className="text-xl font-semibold text-white">{group.category}</h2>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {group.skills.map((skill) => {
                                                const isSelected = selectedSkills.includes(skill);
                                                return (
                                                    <button
                                                        key={skill}
                                                        onClick={() => toggleSkill(skill)}
                                                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                                                            isSelected 
                                                            ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 scale-105 border border-primary-400' 
                                                            : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/50'
                                                        }`}
                                                    >
                                                        {isSelected && <CheckCircle2 className="w-4 h-4" />}
                                                        {skill}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                                {error && (
                                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center">
                                    {error}
                                  </motion.div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                  <div className="glass-card p-6">
                                    <label className="block text-sm font-semibold text-slate-300 mb-3">Nivel de Experiencia Actual</label>
                                    <select 
                                      value={experienceLevel} 
                                      onChange={(e) => setExperienceLevel(e.target.value)}
                                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 appearance-none"
                                    >
                                      <option value="Principiante">Principiante (Desde Cero)</option>
                                      <option value="Intermedio">Intermedio (Tengo bases sólidas)</option>
                                      <option value="Avanzado">Avanzado (Busco especialización)</option>
                                    </select>
                                  </div>
                                  <div className="glass-card p-6">
                                    <label className="block text-sm font-semibold text-slate-300 mb-3">Horas Disponibles por Semana</label>
                                    <select 
                                      value={hoursPerWeek} 
                                      onChange={(e) => setHoursPerWeek(e.target.value)}
                                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 appearance-none"
                                    >
                                      <option value="5">Aprox. 5 horas (1h/día)</option>
                                      <option value="10">Aprox. 10 horas (2h/día)</option>
                                      <option value="20">Aprox. 20 horas (Part-time)</option>
                                      <option value="40">Aprox. 40 horas (Full-time)</option>
                                    </select>
                                  </div>
                                </div>

                            <div className="flex justify-center pt-8 border-t border-slate-800/50">
                                <button
                                    onClick={handleGenerateRoadmap}
                                    disabled={loading}
                                    className={`btn-primary px-8 py-4 text-lg w-full md:w-auto relative overflow-hidden ${loading ? 'cursor-not-allowed opacity-90' : ''}`}
                                >
                                    <div className={`flex items-center justify-center gap-3 transition-opacity ${loading ? 'opacity-0' : 'opacity-100'}`}>
                                        <BrainCircuit className="w-6 h-6" />
                                        Generar Roadmap Mágico
                                    </div>
                                    
                                    {loading && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-primary-600">
                                            <div className="flex flex-col items-center gap-2">
                                              <Loader2 className="w-6 h-6 animate-spin" />
                                              <span className="text-sm font-medium animate-pulse">{loadingMessages[loadingStep]}</span>
                                            </div>
                                        </div>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-8"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                                        <Sparkles className="w-8 h-8 text-yellow-400" /> Tu Ruta de Éxito
                                    </h2>
                                    <p className="text-slate-400">Generado para: {selectedSkills.join(', ')}</p>
                                </div>
                                <button onClick={() => { setRoadmap(''); setSelectedSkills([]); }} className="text-slate-400 hover:text-white flex items-center gap-2 font-medium transition-colors">
                                    Empezar de nuevo <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="glass-card p-8 bg-slate-900/80 border-primary-500/20 shadow-[0_0_50px_rgba(99,102,241,0.1)] relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-500/5 to-transparent pointer-events-none"></div>
                                <div className="prose prose-invert prose-slate max-w-none prose-headings:text-primary-400 prose-a:text-purple-400 relative z-10 whitespace-pre-wrap font-sans text-slate-300 leading-relaxed text-lg">
                                    {roadmap}
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap justify-center gap-4 mt-8 pt-6 border-t border-slate-800/50">
                                <button className="btn-secondary flex items-center gap-2 hover:bg-slate-800 border-slate-700">
                                    <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    Descargar PDF
                                </button>
                                <button className="btn-secondary flex items-center gap-2 hover:bg-slate-800 border-slate-700">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                                    Compartir
                                </button>
                                <button onClick={() => navigate('/dashboard')} className="btn-primary flex items-center gap-2 shadow-lg shadow-primary-500/30">
                                    <CheckCircle2 className="w-5 h-5" /> Ir a mi Panel (Guardado)
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

export default RoadmapGeneratorPage;