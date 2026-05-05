import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { 
  LayoutDashboard, BookOpen, MessageSquare, Target, Settings, LogOut, 
  BrainCircuit, Play, Pause, Award, Calendar, Bell, ChevronRight, 
  Flame, TrendingUp, Clock, BookMarked, Users, CheckCircle2, Star
} from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [roadmaps, setRoadmaps] = useState([]);
  const [loadingRoadmaps, setLoadingRoadmaps] = useState(true);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/roadmaps/my-roadmaps', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setRoadmaps(response.data);
      } catch (error) {
        console.error('Error fetching roadmaps:', error);
      } finally {
        setLoadingRoadmaps(false);
      }
    };
    fetchRoadmaps();
  }, []);

  const upcomingEvents = [
    { id: 1, title: 'Revisión de Código: Proyecto E-commerce', mentor: 'Sarah López', time: 'Hoy, 18:00', type: 'Mentoría 1-a-1' },
    { id: 2, title: 'Workshop: Optimización en React', mentor: 'David Kim', time: 'Mañana, 10:00', type: 'Sesión Grupal' },
  ];

  const recentActivity = [
    { id: 1, action: 'Se unió a SkillBridge', time: 'Recientemente', icon: CheckCircle2, color: 'text-green-400' },
  ];

  return (
    <div className="min-h-screen flex bg-slate-950 font-sans text-slate-300">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800/50 bg-slate-900/30 backdrop-blur-xl flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="h-20 flex items-center px-6 border-b border-slate-800/50 cursor-pointer shrink-0" onClick={() => navigate('/')}>
          <BrainCircuit className="w-8 h-8 text-primary-500 mr-2" />
          <span className="text-xl font-bold text-white tracking-tight">SkillBridge</span>
        </div>
        
        <div className="flex-1 py-8 px-4 space-y-8 overflow-y-auto">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">General</div>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary-500/10 text-primary-400 font-medium">
                <LayoutDashboard className="w-5 h-5" /> Mi Panel
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors font-medium">
                <BookOpen className="w-5 h-5" /> Mis Roadmaps
              </button>
              <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors font-medium">
                <div className="flex items-center gap-3"><MessageSquare className="w-5 h-5" /> Mensajes</div>
                <span className="bg-primary-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">3</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors font-medium">
                <Calendar className="w-5 h-5" /> Calendario
              </button>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Comunidad</div>
            <div className="space-y-1">
              <button onClick={() => navigate('/mentors')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors font-medium">
                <Users className="w-5 h-5" /> Mentores 1-a-1
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors font-medium">
                <Award className="w-5 h-5" /> Leaderboard
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800/50 shrink-0">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors font-medium">
            <Settings className="w-5 h-5" /> Configuración
          </button>
          <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors font-medium mt-1">
            <LogOut className="w-5 h-5" /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="h-20 border-b border-slate-800/50 flex items-center justify-between px-8 bg-slate-950/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-4">
             <h1 className="text-2xl font-semibold text-white">Resumen de Actividad</h1>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-950"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-slate-800 pl-6 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-white">{user?.username || 'Estudiante'}</div>
                <div className="text-xs text-primary-400 font-medium capitalize">{user?.role || 'Estudiante Pro'}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 p-0.5 shadow-lg shadow-orange-500/20">
                <div className="w-full h-full bg-slate-900 rounded-full overflow-hidden flex items-center justify-center">
                  <span className="font-bold text-white uppercase">{user?.username?.charAt(0) || 'U'}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto space-y-8">
            
            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
               <div className="glass-card p-5 border-l-4 border-l-primary-500">
                 <div className="flex justify-between items-start mb-2">
                   <p className="text-sm text-slate-400 font-medium">Horas de Estudio</p>
                   <Clock className="w-4 h-4 text-primary-400" />
                 </div>
                 <h3 className="text-2xl font-bold text-white">42h</h3>
                 <p className="text-xs text-green-400 mt-2 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> +12% esta semana</p>
               </div>
               <div className="glass-card p-5 border-l-4 border-l-orange-500">
                 <div className="flex justify-between items-start mb-2">
                   <p className="text-sm text-slate-400 font-medium">Racha Diaria</p>
                   <Flame className="w-4 h-4 text-orange-400" />
                 </div>
                 <h3 className="text-2xl font-bold text-white">14 días</h3>
                 <p className="text-xs text-orange-400 mt-2">¡Sigue así, estás on fire!</p>
               </div>
               <div className="glass-card p-5 border-l-4 border-l-purple-500">
                 <div className="flex justify-between items-start mb-2">
                   <p className="text-sm text-slate-400 font-medium">Proyectos Entregados</p>
                   <Target className="w-4 h-4 text-purple-400" />
                 </div>
                 <h3 className="text-2xl font-bold text-white">3 / 8</h3>
                 <p className="text-xs text-slate-400 mt-2">Próximo: E-commerce App</p>
               </div>
               <div className="glass-card p-5 border-l-4 border-l-emerald-500">
                 <div className="flex justify-between items-start mb-2">
                   <p className="text-sm text-slate-400 font-medium">Puntos SkillBridge</p>
                   <Award className="w-4 h-4 text-emerald-400" />
                 </div>
                 <h3 className="text-2xl font-bold text-white">1,250</h3>
                 <p className="text-xs text-slate-400 mt-2">Top 5% de tu cohorte</p>
               </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Left Column (Main Focus) */}
              <div className="xl:col-span-2 space-y-8">
                
                {/* Welcome & Next Action Banner */}
                <div className="glass-card p-8 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden border-primary-500/30 shadow-[0_0_40px_rgba(99,102,241,0.1)]">
                  <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary-500/20 to-transparent pointer-events-none"></div>
                  <div className="relative z-10 md:w-3/4">
                    <span className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider mb-4 border border-green-500/20">Tu enfoque actual</span>
                    <h2 className="text-3xl font-bold text-white mb-2 leading-tight">Módulo: Autenticación Avanzada con JWT</h2>
                    <p className="text-slate-400 mb-8 text-lg">Estás en el 65% de tu roadmap de Desarrollo Web Full Stack. Completa este módulo para desbloquear el proyecto final.</p>
                    <div className="flex flex-wrap gap-4">
                      <button onClick={() => navigate('/roadmap-generator')} className="btn-primary flex items-center gap-2 px-8">
                        <Play className="w-4 h-4 fill-current" /> Generar Nuevo Roadmap
                      </button>
                      <button className="btn-secondary flex items-center gap-2 border-slate-700 bg-slate-800/80">
                        <BookMarked className="w-4 h-4" /> Ver Apuntes
                      </button>
                    </div>
                  </div>
                </div>

                {/* Active Roadmaps Detailed */}
                <div>
                  <div className="flex justify-between items-end mb-6">
                    <h3 className="text-xl font-bold text-white">Tus Roadmaps Activos</h3>
                    <button className="text-sm text-primary-400 hover:text-primary-300 font-medium">Ver historial completo →</button>
                  </div>
                  <div className="space-y-4">
                    {loadingRoadmaps ? (
                      <div className="text-center py-8 text-slate-500">Cargando tus roadmaps...</div>
                    ) : roadmaps.length === 0 ? (
                      <div className="text-center py-8 text-slate-500 border border-dashed border-slate-700 rounded-xl">
                        Aún no tienes ningún Roadmap. ¡Genera uno para empezar!
                      </div>
                    ) : (
                      roadmaps.map((roadmap, i) => (
                        <motion.div 
                          key={roadmap.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="glass-card p-6 group hover:bg-slate-800/80 transition-colors"
                        >
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center bg-primary-500/10 text-primary-400">
                              <BookOpen className="w-8 h-8" />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                                <div>
                                  <h4 className="text-xl font-bold text-white mb-1 group-hover:text-primary-400 transition-colors">{roadmap.topic}</h4>
                                  <span className="text-sm text-slate-400 flex items-center gap-1">
                                    <Play className="w-3 h-3 text-green-400 fill-current" />
                                    {roadmap.status} • Creado el: {new Date(roadmap.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="text-right">
                                  <span className="text-3xl font-extrabold text-white">0<span className="text-lg text-slate-500">%</span></span>
                                </div>
                              </div>
                              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden mt-2 border border-slate-800">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: '0%' }}
                                  className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full relative"
                                ></motion.div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
                {/* Recommended Courses Section */}
                <div className="pt-8 border-t border-slate-800/50">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Flame className="w-5 h-5 text-orange-400" /> Sugerencias para ti
                      </h3>
                      <p className="text-slate-400 text-sm mt-1">Basado en tus objetivos de Desarrollo Web y Diseño UI/UX</p>
                    </div>
                    <button className="text-sm text-primary-400 hover:text-primary-300 font-medium">Explorar catálogo →</button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: 'Patrones de Diseño Avanzados en React', author: 'David Kim', rating: '4.9', students: '1.2k', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=300&auto=format&fit=crop' },
                      { title: 'Figma para Desarrolladores: De Cero a Pro', author: 'Ana Silva', rating: '4.8', students: '850', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=300&auto=format&fit=crop' }
                    ].map((course, i) => (
                      <div key={i} className="glass-card overflow-hidden group cursor-pointer flex flex-col">
                        <div className="h-32 relative overflow-hidden">
                          <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                          <div className="absolute bottom-2 left-3 bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white border border-slate-700/50">
                            NUEVO
                          </div>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <h4 className="text-white font-bold mb-1 group-hover:text-primary-400 transition-colors line-clamp-2">{course.title}</h4>
                          <p className="text-xs text-slate-400 mb-3 flex items-center gap-1"><Users className="w-3 h-3"/> Por {course.author}</p>
                          <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-800">
                            <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                              <Star className="w-3 h-3 fill-current" /> {course.rating}
                            </div>
                            <span className="text-xs text-slate-500 font-medium">{course.students} estudiantes</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (Widgets) */}
              <div className="space-y-6">
                
                {/* Weekly Progress Chart */}
                <div className="glass-card p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-emerald-400" /> Progreso Semanal
                    </h3>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">+4.2h</span>
                  </div>
                  
                  <div className="flex items-end justify-between h-32 gap-2 mt-4">
                    {[
                      { day: 'L', height: '40%', active: false },
                      { day: 'M', height: '70%', active: false },
                      { day: 'X', height: '50%', active: false },
                      { day: 'J', height: '90%', active: true },
                      { day: 'V', height: '60%', active: false },
                      { day: 'S', height: '20%', active: false },
                      { day: 'D', height: '10%', active: false },
                    ].map((bar, i) => (
                      <div key={i} className="flex flex-col items-center flex-1 gap-2 group cursor-pointer">
                        <div className="w-full bg-slate-800/50 rounded-t-sm h-full flex items-end relative overflow-hidden">
                          {bar.active && <div className="absolute inset-0 bg-primary-500/20 animate-pulse"></div>}
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: bar.height }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className={`w-full rounded-t-sm transition-colors ${bar.active ? 'bg-primary-500' : 'bg-slate-700 group-hover:bg-primary-400'}`}
                          ></motion.div>
                        </div>
                        <span className={`text-xs font-medium ${bar.active ? 'text-primary-400' : 'text-slate-500'}`}>{bar.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Assistant Widget */}
                <div className="glass-card p-6 border-purple-500/30 bg-gradient-to-b from-slate-900 to-slate-900/50 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                      <BrainCircuit className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">SkillBridge IA</h3>
                      <p className="text-xs text-purple-400 font-medium">Tu copiloto educativo</p>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm mb-6 leading-relaxed">He analizado tu progreso. Pareces tener dudas con <strong className="text-white">Redux Toolkit</strong>. ¿Quieres que generemos un micro-roadmap de repaso rápido?</p>
                  <div className="space-y-3">
                    <button onClick={() => navigate('/roadmap-generator')} className="w-full py-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold transition-colors shadow-lg shadow-purple-500/25">
                      Sí, crear repaso
                    </button>
                    <button onClick={() => navigate('/roadmap-generator')} className="w-full py-3 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 font-medium transition-colors">
                      Crear nuevo roadmap desde cero
                    </button>
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="glass-card p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-400" /> Próximos Eventos
                    </h3>
                    <button className="text-slate-400 hover:text-white"><ChevronRight className="w-5 h-5"/></button>
                  </div>
                  <div className="space-y-4">
                    {upcomingEvents.map((ev) => (
                      <div key={ev.id} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-colors cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${ev.type.includes('1-a-1') ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {ev.type}
                          </span>
                          <span className="text-xs text-slate-400 font-medium flex items-center gap-1"><Clock className="w-3 h-3"/> {ev.time}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1">{ev.title}</h4>
                        <p className="text-xs text-slate-400 flex items-center gap-1"><Users className="w-3 h-3"/> {ev.mentor}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" /> Actividad Reciente
                  </h3>
                  <div className="relative border-l-2 border-slate-800 ml-3 space-y-6">
                    {recentActivity.map((act) => (
                      <div key={act.id} className="relative pl-6">
                        <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-slate-900 border-2 ${act.color.replace('text', 'border')} flex items-center justify-center`}>
                          <div className={`w-2 h-2 rounded-full ${act.color.replace('text', 'bg')}`}></div>
                        </div>
                        <p className="text-sm text-slate-300 font-medium">{act.action}</p>
                        <p className="text-xs text-slate-500 mt-1">{act.time}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
