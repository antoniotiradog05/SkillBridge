# 🚀 SkillBridge

![SkillBridge Banner](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop)

**SkillBridge** es una plataforma educativa de nueva generación que conecta a estudiantes ambiciosos con mentores de primer nivel (Google, Meta, Amazon). Utilizando Inteligencia Artificial, la plataforma diseña **Roadmaps (rutas de aprendizaje) hiper-personalizados** y permite realizar sesiones de Pair Programming en tiempo real.

---

## ✨ Características Principales

*   **🧠 IA Generativa de Roadmaps:** No más tutoriales genéricos. Selecciona las tecnologías que deseas aprender y nuestra IA generará un plan de estudio semanal estructurado paso a paso.
*   **👥 Mentorías 1-a-1:** Conéctate con profesionales de la industria para resolver bloqueos mediante videollamadas y programación en pareja.
*   **📊 Panel de Control Inteligente:** Rastrea tus horas de estudio, racha diaria, progreso en cada ruta activa y recibe recomendaciones de cursos.
*   **🎨 Diseño Premium:** Interfaz construida con principios de *Glassmorphism*, animaciones fluidas con Framer Motion y Tailwind CSS para una experiencia de usuario (UX) de alta gama.

---

## 🛠️ Tecnologías Utilizadas

### Frontend
*   **React 18** (Vite)
*   **Tailwind CSS** (Estilos utilitarios y Glassmorphism)
*   **Framer Motion** (Animaciones y transiciones de páginas)
*   **Lucide React** (Iconografía moderna)
*   **React Router DOM** (Navegación SPA)
*   **Axios** (Peticiones HTTP)

### Backend
*   **Node.js & Express** (Servidor API)
*   **OpenAI SDK** (Motor de Inteligencia Artificial para los Roadmaps)
*   **Helmet & Express Rate Limit** (Seguridad y limitación de peticiones)
*   **Cors & Dotenv** (Middlewares y gestión de entorno)

---

## 🚀 Cómo Empezar (Instalación Local)

Para ejecutar este proyecto en tu máquina local, sigue estos pasos.

### 1. Clonar el Repositorio
\`\`\`bash
git clone https://github.com/antoniotiradog05/SkillBridge.git
cd SkillBridge
\`\`\`

### 2. Instalar Dependencias
El proyecto utiliza un sistema de trabajo simultáneo (concurrently) en la raíz.
\`\`\`bash
# Instala las dependencias en la raíz, frontend y backend
npm run install:all
# (O ve a cada carpeta e instala manualmente con npm install)
\`\`\`

### 3. Configurar Variables de Entorno (IMPORTANTE)
Por motivos de seguridad, el archivo `.env` no se sube al repositorio. Debes crearlo manualmente:
1. Ve a la carpeta `backend/`
2. Crea un archivo llamado `.env`
3. Añade las siguientes variables:
\`\`\`env
PORT=5000
NODE_ENV=development
OPENAI_API_KEY=tu_clave_secreta_de_openai_aqui
JWT_SECRET=tu_secreto_para_tokens
\`\`\`

### 4. Iniciar la Aplicación
Vuelve a la raíz del proyecto (`/SkillBridge`) y ejecuta:
\`\`\`bash
npm start
\`\`\`
Esto iniciará simultáneamente:
*   El **Backend** en `http://localhost:5000`
*   El **Frontend** en `http://localhost:5173`

---

## 📂 Estructura del Proyecto

\`\`\`text
SkillBridge/
├── backend/                  # API Rest (Node/Express)
│   ├── routes/               # Endpoints (ej. roadmap.js para la IA)
│   ├── server.js             # Punto de entrada del backend
│   └── package.json
├── frontend/                 # Aplicación Web (React/Vite)
│   ├── src/
│   │   ├── pages/            # Vistas: HomePage, DashboardPage, RoadmapGeneratorPage
│   │   ├── index.css         # Utilidades globales y Tailwind
│   │   └── App.jsx           # Configuración de Rutas
│   ├── tailwind.config.js    # Diseño e integraciones UI
│   └── package.json
├── package.json              # Orquestador (Concurrently scripts)
└── README.md
\`\`\`

---

## 🛡️ Seguridad y Buenas Prácticas
*   **Protección de API Keys:** La clave de OpenAI se procesa estrictamente del lado del servidor. El frontend jamás tiene acceso a la clave cruda.
*   **Rate Limiting:** El endpoint de generación de Roadmaps está protegido contra abusos y ataques DDoS mediante limitación de IPs.
*   **Fallback Gracioso:** Si la API de OpenAI excede su cuota (Error 429), el sistema devuelve un Roadmap de respaldo pre-calculado, evitando pantallas de error fatales en la interfaz.

---

> Construido para el futuro del aprendizaje interactivo. 🚀
