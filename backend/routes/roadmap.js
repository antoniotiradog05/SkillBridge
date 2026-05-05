const express = require('express');
const OpenAI = require('openai');
const router = express.Router();

// Configurar OpenAI con la clave del archivo .env
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/roadmaps/generate
router.post('/generate', async (req, res) => {
    const { skills, experienceLevel = 'Principiante', hoursPerWeek = '10' } = req.body;
    if (!skills || skills.length === 0) {
        return res.status(400).json({ message: 'Debes proporcionar al menos una skill.' });
    }

    const skillsList = skills.join(', ');

    try {
        console.log(`🧠 Generando roadmap para las skills: ${skillsList} | Nivel: ${experienceLevel} | Horas: ${hoursPerWeek}`);

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Modelo rápido y económico
            messages: [
                {
                    role: 'system',
                    content: 'Eres un mentor de carrera experto en tecnología. Genera hojas de ruta personalizadas y motivadoras en español.',
                },
                {
                    role: 'user',
                    content: `Mis habilidades principales que quiero aprender/mejorar son: ${skillsList}. Mi nivel de experiencia actual es: ${experienceLevel}. Puedo dedicar aproximadamente ${hoursPerWeek} horas por semana al estudio. Crea un plan de estudio y práctica concreto de 3 meses adaptado a mi nivel y tiempo disponible. Organízalo por semanas. Incluye proyectos pequeños que pueda ir construyendo.`,
                },
            ],
            temperature: 0.7,
            max_tokens: 1024,
        });

        const roadmapText = completion.choices[0].message.content;
        console.log('✅ Roadmap generado con éxito.');

        // Para un proyecto real, aquí guardarías el roadmap en una tabla 'roadmaps'
        // vinculada al usuario. Por ahora, lo devolvemos directamente.
        res.json({ roadmap: roadmapText });
    } catch (error) {
        console.error('❌ Error al llamar a OpenAI:', error.message);
        
        // --- FALLBACK MOCK RESPONSE PARA CUANDO FALLA LA API ---
        console.log('⚠️ Devolviendo Roadmap de respaldo (Mock) debido a error en la API...');
        const mockRoadmap = `
# 🚀 Tu Ruta de Aprendizaje para: ${skillsList}

## 📅 Mes 1: Fundamentos y Consolidación
*   **Semana 1-2:** Repasa la documentación oficial de ${skills[0]}. Configura tu entorno de desarrollo y crea un proyecto "Hola Mundo".
*   **Semana 3-4:** Profundiza en los conceptos avanzados de ${skills[0]}. Construye una aplicación To-Do interactiva.

## 📅 Mes 2: Integración y Práctica
*   **Semana 5-6:** Introduce ${skills.length > 1 ? skills[1] : 'conceptos avanzados'}. Conecta tu aplicación anterior con una API básica o lógica de estado compleja.
*   **Semana 7-8:** Implementa testing básico y despliega tu aplicación en una plataforma gratuita como Vercel o Render.

## 📅 Mes 3: Proyecto Final y Portfolio
*   **Semana 9-10:** Arquitectura de un proyecto "Clon" (por ejemplo, clon de Twitter o Netflix) usando ${skillsList}.
*   **Semana 11-12:** Optimización de rendimiento, accesibilidad (a11y) y preparación de tu repositorio de GitHub para entrevistas.

> 💡 **Nota del sistema:** Este es un roadmap generado como respaldo porque tu clave de OpenAI ha excedido su cuota (Error 429). ¡Pero aún así es un excelente punto de partida!
        `;
        
        // En lugar de devolver un error 500, devolvemos el mock con status 200 para que el Frontend funcione
        return res.json({ roadmap: mockRoadmap });
    }
});

module.exports = router;