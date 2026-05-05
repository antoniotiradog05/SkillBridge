const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middlewares/authMiddleware');

// GET /api/mentors
router.get('/', authMiddleware, async (req, res) => {
    try {
        const query = `
            SELECT m.id, m.expertise as role, m.company, m.hourly_rate as rate, m.bio, u.username as name, u.email 
            FROM mentors m
            JOIN users u ON m.user_id = u.id
        `;
        const [mentors] = await pool.query(query);
        
        // Formatear los mentores para que coincidan con la estructura esperada por el Frontend
        const formattedMentors = mentors.map((m, idx) => ({
            id: m.id,
            name: m.name,
            role: m.role,
            company: m.company,
            location: 'Remoto', // Podríamos añadir esto a la DB luego
            rate: m.rate,
            rating: (4.5 + Math.random() * 0.5).toFixed(1), // Mock rating
            reviews: Math.floor(Math.random() * 100) + 10,
            skills: m.bio.split(' ').slice(0, 3), // Hack temporal para skills
            image: \`https://api.dicebear.com/7.x/avataaars/svg?seed=\${m.name}\`
        }));

        res.json(formattedMentors);
    } catch (error) {
        console.error('❌ Error al obtener mentores:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;
