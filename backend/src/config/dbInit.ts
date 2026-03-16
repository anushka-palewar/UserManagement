import pool from './database.js';

export const initDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MySQL database');

    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL,
        age INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await connection.query(createUsersTable);
    console.log('Users table checked/created successfully');
    connection.release();
  } catch (error) {
    console.error('Error initializing database:', error);
    // Note: We don't exit here to allow the server to start even if DB is not ready, 
    // though in production you might want to exit.
  }
};
