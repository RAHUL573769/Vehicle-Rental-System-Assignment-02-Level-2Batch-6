declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            POSTGRES_DB: string
            JWT_SECRET: string



        }
    }
}

export default {
    PORT: process.env[PORT],
    POSTGRES_DB: process.env.POSTGRES_DB,
    JWT_SECRET: process.env.JWT_SECRET
};
