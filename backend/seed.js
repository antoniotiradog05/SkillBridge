const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MOCK_MENTORS = [
  { username: 'sarah_lopez', email: 'sarah@example.com', name: 'Sarah López', role: 'Senior Frontend Engineer', company: 'Google', location: 'Remoto / ES', rate: 45, bio: 'Especialista en React y Performance' },
  { username: 'david_kim', email: 'david@example.com', name: 'David Kim', role: 'Staff Software Engineer', company: 'Meta', location: 'Remoto / US', rate: 60, bio: 'Experto en System Design y Node.js' },
  { username: 'elena_garcia', email: 'elena@example.com', name: 'Elena García', role: 'UX/UI Lead', company: 'Amazon', location: 'Remoto / ES', rate: 40, bio: 'Diseñadora especializada en Figma' },
  { username: 'alex_rivera', email: 'alex@example.com', name: 'Alex Rivera', role: 'Full Stack Developer', company: 'Spotify', location: 'Remoto / MX', rate: 35, bio: 'Desarrollador Vue.js y Python' },
];

async function seedDatabase() {
    try {
        console.log('🔌 Conectando a MySQL para Seed...');
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'skillbridge',
            port: process.env.DB_PORT || 3306,
        });

        console.log('🌱 Insertando mentores falsos...');
        const hashedPassword = await bcrypt.hash('password123', 10);

        for (const mentor of MOCK_MENTORS) {
            // Check if user exists
            const [existing] = await connection.query('SELECT * FROM users WHERE email = ?', [mentor.email]);
            if (existing.length === 0) {
                // Insert user
                const [userResult] = await connection.query(
                    'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
                    [mentor.username, mentor.email, hashedPassword, 'mentor']
                );
                
                const userId = userResult.insertId;

                // Insert mentor details
                await connection.query(
                    'INSERT INTO mentors (user_id, expertise, company, hourly_rate, bio) VALUES (?, ?, ?, ?, ?)',
                    [userId, mentor.role, mentor.company, mentor.rate, mentor.bio]
                );
            }
        }

        console.log('✅ Base de datos sembrada con éxito.');
        await connection.end();
    } catch (error) {
        console.error('❌ Error sembrando la base de datos:', error);
    }
}

seedDatabase();
