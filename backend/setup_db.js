const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
    try {
        console.log('🔌 Conectando a MySQL...');
        // Conexión inicial sin especificar base de datos para poder crearla
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root', // Usuario por defecto de XAMPP
            password: '', // Contraseña por defecto de XAMPP suele estar vacía
            port: process.env.DB_PORT || 3306,
        });

        const dbName = process.env.DB_NAME || 'skillbridge';

        console.log(`🛠️  Creando base de datos '${dbName}' si no existe...`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        console.log(`✅ Base de datos '${dbName}' lista.`);

        // Usar la base de datos
        await connection.query(`USE \`${dbName}\``);

        console.log('📜 Leyendo archivo schema.sql...');
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        // Separar las queries por punto y coma (básico)
        const queries = schema.split(';').filter(q => q.trim() !== '');

        console.log('🏗️  Creando tablas...');
        for (let query of queries) {
            await connection.query(query);
        }
        console.log('✅ Tablas creadadas con éxito.');

        await connection.end();
        console.log('🎉 Setup de la base de datos completado.');
        
    } catch (error) {
        console.error('❌ Error configurando la base de datos:', error);
    }
}

setupDatabase();
