import { Pool } from "pg"

export const pool = new Pool({ connectionString: "postgresql://neondb_owner:npg_B8GQIqPySz5h@ep-ancient-mountain-a87qo1zk-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require" })

export const initDb = async () => {
    await pool.query(`
        CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL CHECK (LENGTH(password) >= 6),
    phone VARCHAR(20) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'customer')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

        
        `)
}