declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            POSTGRES_DB: string
            JWT_SECRET: string
            EXPIRES_IN: string



        }
    }
}

export default {
    PORT: process.env[PORT],
    POSTGRES_DB: process.env.POSTGRES_DB,
    JWT_SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: process.env.EXPIRES_IN,
};
