import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, Search, Star, Building2, MapPin, Calendar, Clock, X, CheckCircle } from 'lucide-react';

const MentorsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [bookingStatus, setBookingStatus] = useState('idle');
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/mentors', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setMentors(data);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  const filteredMentors = mentors.filter(mentor => 
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleBooking = () => {
    setBookingStatus('confirming');
    setTimeout(() => {
      setBookingStatus('success');
      setTimeout(() => {
        setSelectedMentor(null);
        setBookingStatus('idle');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 font-sans text-slate-300">
      {/* Header */}
      <header className="h-20 border-b border-slate-800/50 flex items-center justify-between px-8 bg-slate-950/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center">
            <span className="text-white font-bold text-xl">←</span>
          </div>
          <h1 className="text-2xl font-semibold text-white">Volver al Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          
          {/* Hero Section */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Encuentra a tu Mentor Ideal</h2>
            <p className="text-lg text-slate-400">Programa sesiones 1-a-1 con expertos de la industria que trabajan en las empresas que admiras.</p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500" />
            <input 
              type="text" 
              placeholder="Busca por nombre, habilidad, tecnología..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/60 border border-slate-700 rounded-2xl py-4 pl-14 pr-6 text-white text-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors shadow-xl"
            />
          </div>

          {/* Mentors Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {filteredMentors.map(mentor => (
              <motion.div 
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card overflow-hidden group hover:border-primary-500/50 transition-colors flex flex-col"
              >
                <div className="p-6 flex flex-col items-center text-center border-b border-slate-800">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-800 mb-4 group-hover:border-primary-500/30 transition-colors">
                    <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{mentor.name}</h3>
                  <p className="text-primary-400 font-medium text-sm mb-2">{mentor.role}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                    <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {mentor.company}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {mentor.location}</span>
                  </div>

                  <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-white font-bold">{mentor.rating}</span>
                    <span className="text-slate-500 text-xs">({mentor.reviews} reseñas)</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {mentor.skills.map((skill, i) => (
                      <span key={i} className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-2xl font-bold text-white">${mentor.rate}</span>
                      <span className="text-slate-500 text-sm">/hora</span>
                    </div>
                    <button 
                      onClick={() => setSelectedMentor(mentor)}
                      className="btn-primary py-2 px-4 rounded-lg font-medium shadow-lg shadow-primary-500/20"
                    >
                      Agendar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          )}

        </div>
      </main>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedMentor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => bookingStatus === 'idle' && setSelectedMentor(null)}
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="relative w-full max-w-lg glass-card overflow-hidden shadow-2xl z-10 bg-slate-900 border border-slate-700"
            >
              {bookingStatus === 'success' ? (
                <div className="p-12 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">¡Reserva Confirmada!</h3>
                  <p className="text-slate-400">Te hemos enviado un correo con los detalles de la sesión y el enlace a la videollamada.</p>
                </div>
              ) : (
                <>
                  <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
                    <h3 className="text-xl font-bold text-white">Agendar Mentoría</h3>
                    <button onClick={() => setSelectedMentor(null)} className="text-slate-400 hover:text-white transition-colors">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-8">
                      <img src={selectedMentor.image} alt={selectedMentor.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary-500" />
                      <div>
                        <h4 className="text-lg font-bold text-white">{selectedMentor.name}</h4>
                        <p className="text-slate-400 text-sm">{selectedMentor.role} en {selectedMentor.company}</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Fecha y Hora Preferida</label>
                        <div className="flex gap-4">
                          <div className="relative flex-1">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <select className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white appearance-none">
                              <option>Mañana, 10:00 AM</option>
                              <option>Mañana, 04:00 PM</option>
                              <option>Jueves, 11:00 AM</option>
                            </select>
                          </div>
                          <div className="relative w-32">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <select className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white appearance-none">
                              <option>1 Hora</option>
                              <option>2 Horas</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">¿Qué quieres tratar en la sesión?</label>
                        <textarea 
                          rows="3" 
                          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary-500"
                          placeholder="Ej: Necesito ayuda preparando una entrevista técnica para React..."
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-800 pt-6">
                      <div>
                        <p className="text-sm text-slate-400">Total a pagar</p>
                        <p className="text-2xl font-bold text-white">${selectedMentor.rate}.00</p>
                      </div>
                      <button 
                        onClick={handleBooking}
                        disabled={bookingStatus === 'confirming'}
                        className="btn-primary py-3 px-8 rounded-lg font-bold flex items-center justify-center min-w-[160px]"
                      >
                        {bookingStatus === 'confirming' ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : 'Confirmar y Pagar'}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MentorsPage;
