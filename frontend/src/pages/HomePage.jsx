import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, ArrowRight, BrainCircuit, Users, Compass, ChevronRight, Star, 
  CheckCircle2, Zap, Shield, Globe, Award, MessageCircle, PlayCircle
} from 'lucide-react';

const HomePage = () => {
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/skills')
      .then(res => res.json())
      .then(data => setSkills(data))
      .catch(err => console.error('Error fetching skills:', err));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      {/* Background glowing orbs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <BrainCircuit className="w-8 h-8 text-primary-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
              SkillBridge
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#inicio" className="hover:text-primary-400 transition-colors">Inicio</a>
            <a href="#como-funciona" className="hover:text-primary-400 transition-colors">Cómo Funciona</a>
            <a href="#beneficios" className="hover:text-primary-400 transition-colors">Beneficios</a>
            <a href="#mentores" className="hover:text-primary-400 transition-colors">Mentores</a>
            <a href="#precios" className="hover:text-primary-400 transition-colors">Planes</a>
            <button onClick={() => navigate('/dashboard')} className="hover:text-primary-400 transition-colors font-semibold text-white">Panel</button>
          </div>
          <button className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2">
            Empezar Gratis <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32 space-y-40">
        {/* 1. Hero Section */}
        <motion.section 
          id="inicio"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Nueva IA Generativa para Roadmaps v2.0 disponible</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Acelera tu carrera tech. <br className="hidden md:block"/>
            <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent glow-text">
              Sin perder el tiempo.
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            SkillBridge no es solo otra plataforma de cursos. Es tu ecosistema integral donde la Inteligencia Artificial diseña tu ruta perfecta y mentores expertos de empresas Top (Google, Meta, Amazon) te guían en cada paso.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate('/roadmap-generator')} className="btn-primary w-full sm:w-auto text-lg flex items-center justify-center gap-2 group px-8 py-4">
              Generar mi Roadmap con IA
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-secondary w-full sm:w-auto text-lg flex items-center justify-center gap-2 px-8 py-4">
              <PlayCircle className="w-5 h-5" />
              Ver demostración
            </button>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-slate-500">
             <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Sin tarjeta de crédito</span>
             <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Cancelación en 1 clic</span>
             <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Acceso a 50+ tecnologías</span>
          </motion.div>
        </motion.section>

        {/* 2. Stats & Trust Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="bg-slate-900/50 rounded-3xl border border-slate-800/80 p-12 backdrop-blur-md"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Mentores Activos', value: '2,500+', sub: 'Verificados manualmente' },
              { label: 'Rutas Generadas', value: '15,000+', sub: 'Con IA de última generación' },
              { label: 'Tasa de Contratación', value: '94%', sub: 'En los primeros 6 meses' },
              { label: 'Comunidad', value: '50k+', sub: 'Estudiantes activos' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">{stat.value}</div>
                <div className="text-primary-400 font-semibold mb-1">{stat.label}</div>
                <div className="text-slate-500 text-sm">{stat.sub}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 3. How it Works (Steps) */}
        <section id="como-funciona">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Tu camino hacia la maestría</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Un proceso simple de 3 pasos diseñado para maximizar tu retención de conocimiento y acelerar tu inserción laboral.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BrainCircuit, title: '1. Análisis IA', desc: 'Nuestra IA evalúa tu nivel actual y tus objetivos para generar un plan de estudio milimétrico, semana a semana.', color: 'text-purple-400', bg: 'bg-purple-500/10' },
              { icon: Users, title: '2. Mentoría 1-a-1', desc: 'Te conectamos con profesionales senior que trabajan en las tecnologías que estás aprendiendo para resolver bloqueos.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
              { icon: Award, title: '3. Proyectos Reales', desc: 'Construye un portafolio comprobable resolviendo problemas de negocios reales, no solo tutoriales básicos.', color: 'text-emerald-400', bg: 'bg-emerald-500/10' }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="glass-card p-8 text-center relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none"></div>
                <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${step.bg} ${step.color}`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. Feature Highlights */}
        <section id="beneficios" className="space-y-24">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
                <Shield className="w-4 h-4" /> Entorno Seguro
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">Aprende haciendo, sin frustraciones</h2>
              <p className="text-slate-400 text-lg leading-relaxed">Olvídate de quedarte atascado por horas en un error de configuración. Nuestra plataforma integra entornos de código en la nube donde los mentores pueden hacer "pair programming" contigo en tiempo real.</p>
              <ul className="space-y-4">
                {['Entornos de desarrollo preconfigurados', 'Feedback de código asíncrono', 'Sesiones en vivo con baja latencia'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400"><CheckCircle2 className="w-4 h-4" /></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 relative">
               <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-primary-500 rounded-2xl blur-3xl opacity-20"></div>
               <div className="glass-card p-2 relative">
                 <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 font-mono text-sm text-slate-300 h-80 overflow-hidden relative">
                   <div className="text-slate-500 mb-4">// Ejemplo de Pair Programming en vivo</div>
                   <div className="text-pink-400">function <span className="text-blue-400">calcularRuta</span>() {'{'}</div>
                   <div className="pl-4 text-slate-400">const destino = <span className="text-green-400">'Éxito Profesional'</span>;</div>
                   <div className="pl-4 text-purple-400">await <span className="text-blue-400">SkillBridge</span>.conectarMentor();</div>
                   <div className="pl-4 text-slate-400">return destino;</div>
                   <div className="text-pink-400">{'}'}</div>
                   
                   {/* Fake cursor */}
                   <motion.div 
                    animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }}
                    className="absolute bottom-20 left-12 w-3 h-4 bg-primary-400"
                   ></motion.div>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* 5. Dynamic Skills Grid */}
        <section id="mentores">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Especialízate en lo que demanda el mercado</h2>
              <p className="text-slate-400 text-lg">No aprendas tecnologías muertas. Nuestro catálogo se actualiza en tiempo real basándose en más de 100,000 ofertas de trabajo mensuales.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, i) => (
              <motion.div 
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 flex flex-col cursor-pointer group hover:-translate-y-2"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-semibold text-primary-400 uppercase tracking-wider">
                    {skill.category === 'Technology' ? 'Tecnología' : skill.category === 'Business' ? 'Negocios' : skill.category === 'Design' ? 'Diseño' : skill.category}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                    <Star className="w-4 h-4 fill-current" /> 4.9
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">{skill.name}</h3>
                <p className="text-slate-400 flex-grow mb-6 text-sm">Ruta completa desde fundamentos hasta nivel arquitecto. Incluye 4 proyectos reales para tu portafolio.</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(n => (
                         <div key={n} className={`w-8 h-8 rounded-full border-2 border-slate-900 bg-gradient-to-br ${n===1?'from-blue-400 to-indigo-500':n===2?'from-pink-400 to-rose-500':'from-amber-400 to-orange-500'}`}></div>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-slate-300">+{skill.mentors} Mentores</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6. Testimonials Section */}
        <section id="testimonios" className="relative py-20">
          <div className="absolute inset-0 bg-primary-500/5 rounded-3xl -z-10 transform -skew-y-2"></div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Casos de Éxito Reales</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Conoce a estudiantes que transformaron su carrera gracias a las rutas guiadas por IA y nuestros mentores.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'María F.', role: 'Frontend Developer en Globant', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', text: 'Pasé de hacer tutoriales interminables a construir proyectos reales. Mi mentor David fue clave para prepararme para la entrevista técnica.' },
              { name: 'Carlos R.', role: 'Data Scientist en Mercado Libre', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos', text: 'El roadmap generado por la IA de SkillBridge fue exacto. Me ahorró meses de estar perdido sin saber qué estudiar después de Python básico.' },
              { name: 'Ana S.', role: 'UX/UI Designer Freelance', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana', text: 'La comunidad y el pair programming me dieron la confianza que necesitaba. En 4 meses logré mi primer contrato internacional.' }
            ].map((testi, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card p-8 flex flex-col justify-between"
              >
                <div className="mb-6 text-yellow-400 flex gap-1">
                  {[1,2,3,4,5].map(n => <Star key={n} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-slate-300 italic mb-8 flex-grow">"{testi.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-primary-500/50 overflow-hidden">
                     <img src={testi.img} alt={testi.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{testi.name}</h4>
                    <span className="text-primary-400 text-sm">{testi.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 7. FAQ Section */}
        <section id="faq" className="max-w-4xl mx-auto py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Preguntas Frecuentes</h2>
            <p className="text-slate-400 text-lg">Todo lo que necesitas saber antes de empezar tu viaje.</p>
          </div>
          
          <div className="space-y-4">
            {[
              { q: '¿Qué diferencia a SkillBridge de plataformas como Udemy o Coursera?', a: 'SkillBridge no vende cursos grabados genéricos. Generamos un plan de estudio personalizado usando IA y te asignamos mentores reales de la industria para resolver tus dudas específicas en tiempo real mediante Pair Programming.' },
              { q: '¿Necesito conocimientos previos para empezar?', a: 'No. Nuestra IA adaptará tu Roadmap según tu nivel actual, ya sea que estés empezando desde absoluto cero o seas un programador semi-senior buscando especializarse en arquitecturas cloud.' },
              { q: '¿Cómo funcionan las sesiones 1-a-1?', a: 'Dependiendo de tu plan, tienes un número de sesiones privadas al mes. Las agendas directamente en el calendario del mentor, se conectan por videollamada y comparten una terminal o entorno de código para trabajar en tus bloqueos.' },
              { q: '¿Puedo cancelar mi suscripción en cualquier momento?', a: 'Absolutamente. No hay contratos de permanencia. Puedes cancelar tu plan Pro o Élite con un solo clic desde tu panel de configuración y mantendrás el acceso hasta el final de tu ciclo de facturación.' }
            ].map((faq, i) => (
              <div key={i} className="glass-card p-6 border-l-4 border-l-primary-500 text-left">
                <h4 className="text-xl font-bold text-white mb-3 flex items-start gap-3">
                  <MessageCircle className="w-6 h-6 text-primary-400 shrink-0 mt-0.5" /> 
                  {faq.q}
                </h4>
                <p className="text-slate-400 pl-9 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Pricing Section */}
        <section id="precios" className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Inversión en tu futuro</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-16">Sin contratos a largo plazo. Planes transparentes diseñados para cada etapa de tu carrera.</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
            {[
              { title: 'Autodidacta', price: 'Gratis', desc: 'Perfecto para explorar la plataforma y ver roadmaps básicos.', features: ['Generador de Roadmap IA (Básico)', 'Acceso a la comunidad', 'Foros públicos'], btn: 'Crear cuenta gratis', glow: false },
              { title: 'Pro Aprendiz', price: '$29/mes', desc: 'Para quienes están comprometidos a conseguir su primer empleo.', features: ['Roadmaps Avanzados (Ilimitados)', '4 sesiones grupales/mes', 'Revisión de proyectos', 'Certificados verificables'], btn: 'Empezar 7 días gratis', glow: true },
              { title: 'Mentoría Élite', price: '$149/mes', desc: 'Atención personalizada 1-a-1 para un crecimiento explosivo.', features: ['Todo lo del plan Pro', '4 Sesiones 1-a-1 privadas al mes', 'Entrevistas técnicas de prueba', 'Garantía de contratación'], btn: 'Aplicar al programa', glow: false }
            ].map((plan, i) => (
              <div key={i} className={`glass-card p-8 relative flex flex-col ${plan.glow ? 'border-primary-500 transform md:-translate-y-4 shadow-2xl shadow-primary-500/20' : ''}`}>
                {plan.glow && <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-b-lg">MÁS POPULAR</div>}
                <h3 className="text-xl font-bold text-white mb-2 mt-4">{plan.title}</h3>
                <p className="text-slate-400 text-sm mb-6 h-10">{plan.desc}</p>
                <div className="text-4xl font-extrabold text-white mb-6">{plan.price}</div>
                <button className={`w-full py-3 rounded-lg font-semibold mb-8 transition-colors ${plan.glow ? 'bg-primary-500 hover:bg-primary-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}>
                  {plan.btn}
                </button>
                <div className="space-y-4 flex-1">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.glow ? 'text-primary-400' : 'text-slate-500'}`} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 border-b border-slate-800/80 pb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <BrainCircuit className="w-8 h-8 text-primary-500" />
                <span className="text-2xl font-bold text-white">SkillBridge</span>
              </div>
              <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
                Nuestra misión es democratizar la educación tecnológica conectando a los talentos emergentes con los líderes de la industria, usando la IA como catalizador.
              </p>
              <div className="flex gap-4">
                {/* Social placeholders */}
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary-500 transition-colors cursor-pointer"><Globe className="w-5 h-5"/></div>
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary-500 transition-colors cursor-pointer"><MessageCircle className="w-5 h-5"/></div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Plataforma</h4>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#" className="hover:text-primary-400 transition-colors">Generador IA</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Explorar Roadmaps</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Directorio de Mentores</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Historias de Éxito</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Compañía</h4>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#" className="hover:text-primary-400 transition-colors">Sobre Nosotros</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Carreras</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Contacto</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>© 2026 SkillBridge Inc. Todos los derechos reservados.</p>
            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Sistemas Operativos y Normales</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
